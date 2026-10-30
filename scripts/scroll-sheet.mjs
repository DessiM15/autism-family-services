/**
 * Scroll through a page at a given viewport width, capture the viewport at
 * each step (so fixed headers, sticky sections and scroll-driven animations
 * render exactly as a visitor sees them), and stitch the captures into one
 * contact-sheet PNG for review.
 *
 *   node scripts/scroll-sheet.mjs <baseUrl> <outDir> <width> <route> [route...]
 *   COLS=5 STEP=0.85 MAX=24 node scripts/scroll-sheet.mjs http://localhost:3005 /tmp/sheets 375 /en
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [, , base, outDir, widthArg, ...routes] = process.argv;
const width = Number(widthArg);
const COLS = Number(process.env.COLS || (width < 700 ? 6 : width < 1100 ? 4 : 3));
const STEP = Number(process.env.STEP || 0.9);
const MAX = Number(process.env.MAX || 30);
const WAIT = Number(process.env.WAIT || 650);
const HEIGHT = Number(process.env.HEIGHT || (width < 700 ? 760 : width < 1100 ? 1024 : 900));

fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
});

for (const route of routes) {
  const page = await browser.newPage();
  const mobile = width < 700;
  await page.setViewport({ width, height: HEIGHT, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  await page.evaluateOnNewDocument((w) => { window.__WAIT = w; }, WAIT);
  await page.goto(base + route, { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 800));

  const shots = [];
  let y = 0;
  for (let i = 0; i < MAX; i++) {
    const info = await page.evaluate(async (target) => {
      window.scrollTo({ top: target, behavior: "instant" });
      await new Promise((r) => setTimeout(r, Number(window.__WAIT || 650)));
      return { y: window.scrollY, max: document.documentElement.scrollHeight - window.innerHeight };
    }, y);
    const buf = await page.screenshot({ encoding: "base64" });
    shots.push({ y: info.y, buf });
    if (info.y >= info.max - 2) break;
    y = info.y + HEIGHT * STEP;
  }
  await page.close();

  // Stitch into a contact sheet.
  const sheet = await browser.newPage();
  const cellW = width;
  const cellH = HEIGHT;
  const rows = Math.ceil(shots.length / COLS);
  const gap = 12;
  const labelH = 22;
  const sheetW = COLS * (cellW + gap) + gap;
  const sheetH = rows * (cellH + labelH + gap) + gap;
  const html = `<!doctype html><html><body style="margin:0;background:#c7c7c7;font:12px/22px -apple-system,sans-serif;">
  <div style="display:grid;grid-template-columns:repeat(${COLS},${cellW}px);gap:${gap}px;padding:${gap}px;width:${sheetW}px;">
  ${shots
    .map(
      (s, i) =>
        `<div><div style="height:${labelH}px;color:#222;padding-left:4px;">${route} @${width} · shot ${i + 1}/${shots.length} · y=${Math.round(s.y)}</div><img src="data:image/png;base64,${s.buf}" style="display:block;width:${cellW}px;height:${cellH}px;outline:1px solid #888;"></div>`,
    )
    .join("")}
  </div></body></html>`;
  await sheet.setViewport({ width: sheetW, height: Math.min(sheetH, 16000), deviceScaleFactor: 1 });
  await sheet.setContent(html, { waitUntil: "load" });
  const slug = route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "root";
  const file = `${outDir}/${slug}--${width}-sheet.png`;
  await sheet.screenshot({ path: file, fullPage: true });
  await sheet.close();
  console.log(`${route} @${width}: ${shots.length} shots -> ${file} (${sheetW}x${sheetH})`);
}

await browser.close();
