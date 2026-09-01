/**
 * Regression test for the site's scroll rules, which are a stated client
 * requirement rather than a nicety:
 *
 *   - going to another page lands at the top
 *   - refreshing lands at the top
 *   - clicking the logo goes to the top, even when already on that page
 *   - explicit anchors still jump to their section
 *
 * Usage: node scripts/scroll-behaviour.mjs [baseUrl]
 */
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const base = process.argv[2] || "http://localhost:3005";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

const results = [];
const check = (name, actual, pass, note = "") =>
  results.push({ name, actual, pass, note });

const y = (p) => p.evaluate(() => Math.round(window.scrollY));
const settle = (ms = 2200) => new Promise((r) => setTimeout(r, ms));
async function wheelTo(p, px) {
  await p.mouse.move(700, 450);
  for (let i = 0; i < px / 120; i++) {
    await p.mouse.wheel({ deltaY: 120 });
    await new Promise((r) => setTimeout(r, 20));
  }
  await settle(1300);
}

const desktop = await browser.newPage();
await desktop.setViewport({ width: 1440, height: 900 });

await desktop.goto(`${base}/en`, { waitUntil: "networkidle2" });
await settle(1200);

// Navigating to another page lands at the top.
await wheelTo(desktop, 4000);
await desktop.click('header nav a[href="/en/contact"]');
await settle();
check("nav link to another page", await y(desktop), (v) => v === 0);

// Refreshing lands at the top.
await wheelTo(desktop, 2000);
await desktop.reload({ waitUntil: "networkidle2" });
await settle();
check("refresh mid-page", await y(desktop), (v) => v === 0);

// A footer link from the very bottom lands at the top.
await desktop.goto(`${base}/en`, { waitUntil: "networkidle2" });
await settle(1000);
await desktop.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await settle(1400);
await desktop.click('footer a[href="/en/grants"]');
await settle();
check("footer link from the bottom", await y(desktop), (v) => v === 0);

// The logo goes to the top even when already on that page.
await desktop.goto(`${base}/en`, { waitUntil: "networkidle2" });
await settle(1000);
await wheelTo(desktop, 4000);
await desktop.click('header a[href="/en"]');
await settle();
check("logo click, already on home", await y(desktop), (v) => v === 0);

// Late-loading images must not shift the page after the reset.
await desktop.goto(`${base}/en/team`, { waitUntil: "domcontentloaded" });
await settle(300);
const early = await y(desktop);
await settle(4000);
check("no shift from late images", `${early} -> ${await y(desktop)}`, () => {
  return early === 0;
});

// An explicit anchor still jumps to its section.
await desktop.goto(`${base}/en/team`, { waitUntil: "networkidle2" });
await settle(1400);
await desktop.click('a[href="#hannah-ford"]');
await settle();
check("in-page anchor still jumps", await y(desktop), (v) => v > 500);

// A cold deep link to an anchor lands on the section.
await desktop.goto(`${base}/en/team#javia-archelle`, { waitUntil: "networkidle2" });
await settle(2500);
check("cold deep link to anchor", await y(desktop), (v) => v > 500);
await desktop.close();

// Mobile drawer navigation lands at the top.
const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await mobile.goto(`${base}/en`, { waitUntil: "networkidle2" });
await settle(1400);
await mobile.evaluate(() => window.scrollTo(0, 3000));
await settle(1200);
await mobile.click('button[aria-label="Open menu"]');
await settle(800);
await mobile.evaluate(() => {
  const dlg = document.querySelector('[role="dialog"]');
  dlg?.querySelector('a[href="/en/contact"]')
    ?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
});
await settle();
check("mobile drawer navigation", await y(mobile), (v) => v === 0);
await mobile.close();

await browser.close();

let failed = 0;
for (const r of results) {
  const ok = typeof r.actual === "number" ? r.pass(r.actual) : r.pass();
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.name.padEnd(32)} ${r.actual}`);
}
console.log(failed ? `\n${failed} failing` : "\nall scroll rules hold");
process.exit(failed ? 1 : 0);
