import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "shell", args: ["--no-sandbox"],
});
for (const url of process.argv.slice(2)) {
  const p = await browser.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  const errs = [];
  const four04 = [];
  p.on("pageerror", e => errs.push(e.message.split("\n")[0].slice(0, 130)));
  p.on("console", m => m.type() === "error" && errs.push("console: " + m.text().slice(0, 130)));
  p.on("response", r => { if (r.status() === 404) four04.push(r.url().replace(/^https?:\/\/[^/]+/, "")); });
  await p.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise(r => setTimeout(r, 2500));
  console.log("\n===", url);
  const uniq = [...new Set(errs)];
  console.log(uniq.length ? uniq.join("\n") : "no errors");
  if (four04.length) console.log("404s:", [...new Set(four04)].join(", "));
  await p.close();
}
await browser.close();
