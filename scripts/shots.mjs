/**
 * Screenshot helper for design review.
 *   node scripts/shots.mjs <baseUrl> <outDir> <path> [scrollFractions...]
 * e.g. node scripts/shots.mjs http://localhost:3001 /tmp/shots /en 0 0.35 0.7
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [, , base = "http://localhost:3001", outDir = "./shots", path = "/en", ...rest] = process.argv;
const fractions = rest.length ? rest.map(Number) : [0];
const mobile = process.env.MOBILE === "1";

fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
});

const page = await browser.newPage();
await page.setViewport(
  mobile
    ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { width: 1440, height: 900, deviceScaleFactor: 1 },
);

const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text()}`);
});

await page.goto(base + path, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 900));

const slug = (path === "/" ? "root" : path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, ""));

for (const f of fractions) {
  if (f > 0) {
    await page.evaluate((frac) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: max * frac, behavior: "instant" });
    }, f);
    // Let Lenis settle and reveals fire.
    await new Promise((r) => setTimeout(r, 1400));
  }
  const name = `${outDir}/${mobile ? "m-" : ""}${slug}-${String(Math.round(f * 100)).padStart(3, "0")}.png`;
  await page.screenshot({ path: name });
  console.log("wrote", name);
}

if (errors.length) {
  console.log("\n--- PAGE ERRORS ---");
  for (const e of [...new Set(errors)].slice(0, 12)) console.log(e);
}

await browser.close();
