import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:5173/");
  await page.waitForTimeout(2000);

  // Check Hero ABOUT ME button exists
  const heroBtn = await page.$(".hero-right-container .about-circle-btn");
  console.log("Hero ABOUT ME button exists:", !!heroBtn);

  // Scroll to About section
  await page.evaluate(() => {
    const smoother = window.__smoother;
    if (smoother) smoother.scrollTo(3400, false);
    else window.scrollTo(0, 3400);
  });
  await page.waitForTimeout(1500);

  // Check About section ABOUT ME button
  const aboutBtn = await page.$("#about .about-circle-btn");
  console.log("About section ABOUT ME button exists:", !!aboutBtn);

  await page.screenshot({ path: "scratch_frames/verify_about_button_removed.png" });
  await browser.close();
  console.log("Check complete.");
}

run().catch(console.error);
