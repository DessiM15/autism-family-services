import puppeteer from "puppeteer-core";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const base = "http://localhost:3001";

async function visit(lang, path = "/", cookie) {
  // A fresh browser per case, so no cookie leaks between them.
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "shell", args: ["--no-sandbox"] });
  const p = await browser.newPage();
  await p.setExtraHTTPHeaders({ "Accept-Language": lang });
  if (cookie) {
    await browser.setCookie({ name: "afs_locale", value: cookie, domain: "localhost", path: "/" });
  }
  await p.goto(base + path, { waitUntil: "domcontentloaded", timeout: 40000 });
  const url = p.url();
  await browser.close();
  return url;
}

console.log("es browser, no cookie      →", await visit("es-MX,es;q=0.9"));
console.log("en browser, no cookie      →", await visit("en-US,en;q=0.9"));
console.log("fr browser, no cookie      →", await visit("fr-FR,fr;q=0.9"), "(falls back to en)");
console.log("en browser, cookie=es      →", await visit("en-US,en;q=0.9", "/", "es"), "(explicit choice wins)");
console.log("es browser, direct /en     →", await visit("es-MX,es;q=0.9", "/en"), "(URL wins)");
console.log("es browser, legacy /team-4 →", await visit("es-MX,es;q=0.9", "/team-4"));
