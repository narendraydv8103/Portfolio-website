import { chromium } from "playwright";

async function measure() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1904, height: 908 } });
  
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  
  await page.goto("http://127.0.0.1:5173/?progress=0.7", { waitUntil: "networkidle" });
  await page.waitForSelector(".character-container canvas", { timeout: 15000 });
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const data = await page.evaluate(() => {
    // Access Three.js objects through scene if stored or inspect canvas
    return {
      windowY: window.scrollY,
      hasCanvas: !!document.querySelector("canvas"),
    };
  });
  console.log("Measured:", data);
  await browser.close();
}

measure().catch(console.error);
