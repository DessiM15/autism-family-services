import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "shell",
  args: ["--no-sandbox", "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"],
});
const ctx = browser.defaultBrowserContext();
await ctx.overridePermissions("http://localhost:3005", ["microphone"]);
const p = await browser.newPage();
await p.setViewport({ width: 1440, height: 900 });
p.on("pageerror", e => console.log("PAGEERROR:", e.message.slice(0,140)));
p.on("console", m => { if (m.type()==="error") console.log("CONSOLE:", m.text().slice(0,140)); });

await p.goto("http://localhost:3005/en", { waitUntil: "networkidle2" });
await new Promise(r => setTimeout(r, 1200));

console.log("prefers-reduced-motion:", await p.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches));
console.log("data-calm:", await p.evaluate(() => document.documentElement.dataset.calm));
console.log("SpeechRecognition available:", await p.evaluate(() => !!(window.SpeechRecognition || window.webkitSpeechRecognition)));

await p.click('button[aria-label="Chat with us"]');
await new Promise(r => setTimeout(r, 600));
await p.click('button[aria-label="Speak"]');
await new Promise(r => setTimeout(r, 500));
await p.evaluate(() => [...document.querySelectorAll('[role="dialog"] button')]
  .find(b => b.textContent.includes("Turn on the microphone"))?.click());

for (const wait of [1200, 3000, 6000]) {
  await new Promise(r => setTimeout(r, wait));
  const dump = await p.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"]');
    return {
      text: dlg ? dlg.innerText.replace(/\n+/g, " | ").slice(0, 220) : "(no dialog)",
      spansWithHeight: dlg ? dlg.querySelectorAll('span[style*="height"]').length : 0,
    };
  });
  console.log(`\n@${wait}ms bars=${dump.spansWithHeight}\n  ${dump.text}`);
}
await browser.close();
