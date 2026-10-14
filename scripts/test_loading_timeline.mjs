import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });
  const start = Date.now();
  page.on("console", (msg) => {
    console.log(`[+${Date.now() - start}ms] ${msg.text()}`);
  });
  page.on("pageerror", (err) => {
    console.log(`[+${Date.now() - start}ms] PAGE ERROR: ${err.message}\n${err.stack}`);
  });
  await page.goto("http://localhost:5173");
  await page.waitForTimeout(14000);
  await page.screenshot({ path: "scratch_test_timeline_long.png" });
  console.log("Saved scratch_test_timeline_long.png");
  await browser.close();
}

main().catch(console.error);
