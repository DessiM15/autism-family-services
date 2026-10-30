/**
 * Responsive audit: every route x every width.
 * Full-page screenshot + report of elements that overflow the viewport
 * horizontally, horizontal scroll width, and page errors.
 *
 *   node audit.mjs <baseUrl> <outDir> [routes...]
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [, , base = "http://localhost:3005", outDir = "./audit", ...routeArgs] = process.argv;

const ROUTES = routeArgs.length
  ? routeArgs
  : [
      "/en",
      "/en/start-here",
      "/en/services",
      "/en/aba",
      "/en/team",
      "/en/about",
      "/en/first-visit",
      "/en/resources",
      "/en/grants",
      "/en/careers",
      "/en/gen-xy",
      "/en/whats-happening",
      "/en/events",
      "/en/contact",
      "/en/staff",
    ];

const WIDTHS = (process.env.WIDTHS || "320,375,414,768,1024,1280,1440,1920,2560")
  .split(",")
  .map(Number);

fs.mkdirSync(outDir, { recursive: true });

const launch = () =>
  puppeteer.launch({
    executablePath: CHROME,
    headless: "shell",
    args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
    protocolTimeout: 600000,
  });

const report = [];
const save = () => fs.writeFileSync(`${outDir}/report.json`, JSON.stringify(report, null, 1));

// One browser per route: a single long-lived browser ran out of steam
// somewhere past 150 captures and dropped the connection.
let browser = await launch();

for (const route of ROUTES) {
  try {
    await browser.close();
  } catch {}
  browser = await launch();
  for (const width of WIDTHS) {
   try {
    const page = await browser.newPage();
    const mobile = width < 700;
    await page.setViewport({
      width,
      height: mobile ? 800 : 900,
      deviceScaleFactor: 1,
      isMobile: mobile,
      hasTouch: mobile,
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("console", (m) => {
      if (m.type() === "error" && !m.text().includes("MIME type")) errors.push(`console: ${m.text()}`);
    });
    try {
      await page.goto(base + route, { waitUntil: "networkidle2", timeout: 90000 });
    } catch (e) {
      report.push({ route, width, error: `goto failed: ${e.message}` });
      await page.close();
      continue;
    }
    // Walk the page so reveals fire, then return to top.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.6;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 160));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 900));

    const data = await page.evaluate(() => {
      const vw = window.innerWidth;
      const docW = document.documentElement.scrollWidth;
      const out = [];
      const all = document.querySelectorAll("body *");
      const seen = new Set();
      for (const el of all) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        if (cs.position === "fixed") continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        // Overflowing right or left of the viewport by more than 2px.
        const over = r.right - vw;
        const under = -r.left;
        if (over > 2 || under > 2) {
          // Skip descendants of an element already reported (same offending box).
          let p = el.parentElement;
          let dup = false;
          while (p) {
            if (seen.has(p)) {
              const pr = p.getBoundingClientRect();
              if (Math.abs(pr.right - r.right) < 2 && Math.abs(pr.left - r.left) < 2) dup = true;
              break;
            }
            p = p.parentElement;
          }
          if (dup) continue;
          // Skip if an ancestor clips overflow horizontally (intentional carousels etc.)
          let clipped = false;
          p = el.parentElement;
          while (p && p !== document.body) {
            const pcs = getComputedStyle(p);
            if (/(hidden|clip|auto|scroll)/.test(pcs.overflowX)) {
              clipped = true;
              break;
            }
            p = p.parentElement;
          }
          seen.add(el);
          const id = el.id ? `#${el.id}` : "";
          const cls = (el.className && typeof el.className === "string")
            ? "." + el.className.trim().split(/\s+/).slice(0, 4).join(".")
            : "";
          const text = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
          out.push({
            sel: `${el.tagName.toLowerCase()}${id}${cls}`,
            text,
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
            top: Math.round(r.top + window.scrollY),
            clipped,
          });
        }
      }
      return { vw, docW, overflow: out.slice(0, 25), count: out.length };
    });

    const slug = route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "root";
    const file = `${outDir}/${slug}--${width}.png`;
    await page.screenshot({ path: file, fullPage: true });
    report.push({ route, width, file, ...data, errors: [...new Set(errors)].slice(0, 5) });
    const flag = data.docW > data.vw + 1 ? ` HSCROLL docW=${data.docW}` : "";
    const unclipped = data.overflow.filter((o) => !o.clipped).length;
    console.log(`${route.padEnd(22)} ${String(width).padStart(5)}  overflow=${data.count} (unclipped ${unclipped})${flag}`);
    await page.close();
   } catch (e) {
    report.push({ route, width, error: `capture failed: ${String(e).slice(0, 200)}` });
    console.log(`${route.padEnd(22)} ${String(width).padStart(5)}  FAILED ${String(e).slice(0, 80)}`);
    try { await browser.close(); } catch {}
    browser = await launch();
   }
  }
  save();
}

save();
await browser.close();
console.log("\nreport:", `${outDir}/report.json`);
