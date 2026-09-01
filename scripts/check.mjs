import puppeteer from "puppeteer-core";
import fs from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const base = process.env.BASE || "http://localhost:3001";
const out = process.env.OUT || "/tmp/checks";
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

async function page(path, { calm = false, lang } = {}) {
  const p = await browser.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  if (lang) await p.setExtraHTTPHeaders({ "Accept-Language": lang });
  if (calm) {
    await p.evaluateOnNewDocument(() => {
      localStorage.setItem("afs-calm-mode", "true");
    });
  }
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  const res = await p.goto(base + path, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));
  return { p, errs, status: res?.status(), url: p.url() };
}

// 1. Spanish auto-detect from Accept-Language
{
  const { p, url } = await page("/", { lang: "es-MX,es;q=0.9" });
  console.log("auto-detect es →", url);
  await p.close();
}
// 2. English auto-detect
{
  const { p, url } = await page("/", { lang: "en-US,en;q=0.9" });
  console.log("auto-detect en →", url);
  await p.close();
}
// 3. Legacy Wix redirect
{
  const { p, url } = await page("/team-4", { lang: "en-US" });
  console.log("legacy /team-4 →", url);
  await p.close();
}
// 4. Spanish page render
{
  const { p, errs } = await page("/es");
  const h1 = await p.$eval("h1", (el) => el.textContent.trim().slice(0, 90));
  const lang = await p.$eval("html", (el) => el.lang);
  console.log(`es page: lang=${lang} h1="${h1}"`);
  await p.screenshot({ path: `${out}/es-home.png` });
  if (errs.length) console.log("  errors:", [...new Set(errs)].slice(0, 3));
  await p.close();
}
// 5. Calm Mode
{
  const { p, errs } = await page("/en", { calm: true });
  const calm = await p.$eval("html", (el) => el.dataset.calm);
  const heroH = await p.$eval("main section", (el) => el.getBoundingClientRect().height);
  console.log(`calm mode: data-calm=${calm}, hero height=${Math.round(heroH)}px (still hero if < 1200)`);
  await p.screenshot({ path: `${out}/calm-home.png` });
  if (errs.length) console.log("  errors:", [...new Set(errs)].slice(0, 3));
  await p.close();
}
// 6. Mega menu
{
  const { p } = await page("/en");
  await p.hover('a[href="/en/services"]');
  await new Promise((r) => setTimeout(r, 700));
  await p.screenshot({ path: `${out}/megamenu.png` });
  await p.close();
}
// 7. Chatbot round trip
{
  const { p, errs } = await page("/en");
  await p.click('button[aria-label="Chat with us"]');
  await new Promise((r) => setTimeout(r, 600));
  await p.type("textarea", "How much does ABA therapy cost?");
  await p.keyboard.press("Enter");
  await new Promise((r) => setTimeout(r, 3500));
  const bubbles = await p.$$eval('[role="dialog"] .whitespace-pre-wrap', (els) =>
    els.map((e) => e.textContent.trim()),
  );
  console.log("chat reply:", JSON.stringify((bubbles.at(-1) || "").slice(0, 160)));
  await p.screenshot({ path: `${out}/chat.png` });
  if (errs.length) console.log("  errors:", [...new Set(errs)].slice(0, 3));
  await p.close();
}
// 8. Contact form submit
{
  const { p } = await page("/en/contact");
  await p.type('input[name="name"]', "Test Parent");
  await p.type('input[name="phone"]', "409-555-0101");
  await p.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 2000));
  const heading = await p.$eval("form, .surface-card h3", (el) => el.textContent.trim().slice(0, 60)).catch(() => "n/a");
  console.log("contact submit →", heading);
  await p.close();
}

await browser.close();
