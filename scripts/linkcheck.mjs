import puppeteer from "puppeteer-core";
const base = "http://localhost:3005";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "shell", args: ["--no-sandbox"],
});
const p = await browser.newPage();
// Collect every internal link the site renders, across both locales.
const seen = new Set();
for (const path of ["/en", "/es", "/en/services", "/en/team", "/en/about", "/en/contact", "/en/grants", "/en/first-visit", "/en/careers", "/en/gen-xy", "/en/whats-happening", "/en/events", "/en/start-here", "/en/aba", "/en/staff"]) {
  await p.goto(base + path, { waitUntil: "domcontentloaded", timeout: 40000 });
  const hrefs = await p.$$eval("a[href^='/']", els => els.map(e => e.getAttribute("href")));
  hrefs.forEach(h => seen.add(h.split("#")[0]));
}
const targets = [...seen].filter(Boolean).sort();
const bad = [];
for (const t of targets) {
  const res = await p.goto(base + t, { waitUntil: "domcontentloaded", timeout: 30000 });
  const status = res?.status();
  if (status && status >= 400) bad.push(`${status}  ${t}`);
}
console.log(`checked ${targets.length} unique internal links`);
console.log(bad.length ? "BROKEN:\n" + bad.join("\n") : "all internal links resolve");
await browser.close();
