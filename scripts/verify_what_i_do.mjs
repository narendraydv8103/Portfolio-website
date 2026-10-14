import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("scratch_frames/verify_what_i_do");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function verify() {
  console.log("=== STARTING WHAT I DO VERIFICATION ===");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);

  // 1. Initial Hero Check (scrollY = 0)
  console.log("\n[TEST 1] Initial Hero Check (scrollY = 0):");
  await page.screenshot({ path: path.join(outDir, "1_hero_scrollY_0.png") });

  const heroDetails = await page.evaluate(() => {
    const heroHeading = document.querySelector(".hero-right-heading")?.textContent?.trim();
    const aboutBtn = document.querySelector(".about-circle-btn")?.textContent?.trim();
    const whatDesktop = document.querySelector(".what-i-do-desktop");
    const whatStyle = whatDesktop ? window.getComputedStyle(whatDesktop) : null;
    return {
      heroHeading,
      aboutBtn,
      whatDesktopVisible: whatStyle ? whatStyle.visibility : null,
      whatDesktopOpacity: whatStyle ? whatStyle.opacity : null,
    };
  });
  console.log("Hero Check Details:", heroDetails);

  // 2. Scroll into WHAT I DO section
  console.log("\n[TEST 2] Scrolling into WHAT I DO / Seated Desk Scene:");
  // In GsapScroll, tl2 starts at center 55% of .studio-lead and ends at bottom top.
  // Window scroll around 1800-2200 px reaches the fully settled desk scene.
  await page.evaluate(() => {
    const smoother = window.__smoother;
    if (smoother) {
      smoother.scrollTo(2100, false);
    } else {
      window.scrollTo(0, 2100);
    }
  });
  await page.waitForTimeout(2500);

  const whatIDoDetails = await page.evaluate(() => {
    const heading = document.querySelector(".what-i-do-heading")?.textContent?.replace(/\s+/g, " ").trim();
    const cards = Array.from(document.querySelectorAll(".what-i-do-card")).map(c => {
      const title = c.querySelector("h3")?.textContent?.replace(/\s+/g, " ").trim();
      const desc = c.querySelector("p.text-zinc-300")?.textContent?.trim();
      return { title, desc };
    });
    const whatDesktop = document.querySelector(".what-i-do-desktop");
    const whatStyle = whatDesktop ? window.getComputedStyle(whatDesktop) : null;
    return {
      heading,
      cards,
      visibility: whatStyle?.visibility,
      opacity: whatStyle?.opacity,
    };
  });
  console.log("WHAT I DO Details at scrollY = 2100:", whatIDoDetails);
  await page.screenshot({ path: path.join(outDir, "2_what_i_do_settled.png") });

  // 3. Test Card Interaction (click expand button)
  console.log("\n[TEST 3] Testing Card Expand buttons:");
  const expandButtons = await page.$$(".what-i-do-card button");
  if (expandButtons.length >= 2) {
    await expandButtons[0].click();
    await expandButtons[1].click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "3_what_i_do_cards_expanded.png") });
    console.log("Clicked both expand buttons successfully!");
  }

  // 4. Scroll further into About section
  console.log("\n[TEST 4] Scrolling into About Section (scrollY = 3400):");
  await page.evaluate(() => {
    const smoother = window.__smoother;
    if (smoother) {
      smoother.scrollTo(3400, false);
    } else {
      window.scrollTo(0, 3400);
    }
  });
  await page.waitForTimeout(2000);

  const aboutDetails = await page.evaluate(() => {
    const aboutSection = document.querySelector("#about");
    const aboutHeading = aboutSection?.querySelector("h2")?.textContent?.trim();
    const whatDesktop = document.querySelector(".what-i-do-desktop");
    const whatStyle = whatDesktop ? window.getComputedStyle(whatDesktop) : null;
    return {
      aboutHeading,
      whatDesktopOpacity: whatStyle?.opacity,
    };
  });
  console.log("About Section Details:", aboutDetails);
  await page.screenshot({ path: path.join(outDir, "4_about_section.png") });

  // 5. Scroll back up to Hero (Reversibility)
  console.log("\n[TEST 5] Reversing scroll to top (scrollY = 0):");
  await page.evaluate(() => {
    const smoother = window.__smoother;
    if (smoother) {
      smoother.scrollTo(0, false);
    } else {
      window.scrollTo(0, 0);
    }
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outDir, "5_hero_reversed.png") });

  console.log("\nConsole errors during entire run:", consoleErrors);
  console.log("=== WHAT I DO VERIFICATION COMPLETE ===");
  await browser.close();
}

verify().catch(console.error);
