import puppeteer from "puppeteer-core";
import fs from "node:fs";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const base = "http://localhost:3005";
const out = process.env.OUT || "/tmp/full";
fs.mkdirSync(out, { recursive: true });

const paths = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: CHROME, headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const allErrors = {};
for (const path of paths) {
  const p = await browser.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await p.goto(base + path, { waitUntil: "networkidle2", timeout: 60000 });
  // Walk the page so every scroll-triggered reveal fires before capture.
  await p.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 900));
  const slug = path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "root";
  await p.screenshot({ path: `${out}/${slug}.png`, fullPage: true });
  const filtered = [...new Set(errs)].filter((e) => !e.includes("MIME type"));
  if (filtered.length) allErrors[path] = filtered.slice(0, 3);
  console.log("captured", path);
  await p.close();
}
await browser.close();
if (Object.keys(allErrors).length) console.log("\nERRORS:", JSON.stringify(allErrors, null, 1));
else console.log("\nno page errors");
