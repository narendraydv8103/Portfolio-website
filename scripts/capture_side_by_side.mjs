import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("scratch_frames/side_by_side");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const vh = 925;
const offsets = [
  { name: "0.0vh", y: 0 },
  { name: "0.3vh", y: Math.round(0.3 * vh) },
  { name: "0.6vh", y: Math.round(0.6 * vh) },
  { name: "1.0vh", y: Math.round(1.0 * vh) },
  { name: "1.5vh", y: Math.round(1.5 * vh) },
  { name: "2.0vh", y: Math.round(2.0 * vh) },
  { name: "2.5vh", y: Math.round(2.5 * vh) },
  { name: "3.0vh", y: Math.round(3.0 * vh) },
  { name: "3.5vh", y: Math.round(3.5 * vh) },
];

async function captureApp(port, prefix) {
  console.log(`\n=== Capturing app on port ${port} (${prefix}) ===`);
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });

  page.on("console", (msg) => {
    if (msg.text().includes("[Scene]") || msg.text().includes("error")) {
      console.log(`[${prefix} log] ${msg.text()}`);
    }
  });

  await page.goto(`http://localhost:${port}/`);
  // Wait for loader to finish and lights/animations to settle
  await page.waitForTimeout(7000);

  for (const step of offsets) {
    console.log(`Scrolling ${prefix} to ${step.name} (y=${step.y})...`);
    await page.evaluate((targetY) => {
      // Try GSAP ScrollSmoother first
      try {
        if (window.ScrollSmoother && window.ScrollSmoother.get()) {
          window.ScrollSmoother.get().scrollTo(targetY, false);
          return;
        }
      } catch (e) {}
      window.scrollTo(0, targetY);
    }, step.y);

    await page.waitForTimeout(2500);

    const shotPath = path.join(outDir, `${prefix}_${step.name}.png`);
    await page.screenshot({ path: shotPath });
    console.log(`Saved ${shotPath}`);
  }

  await browser.close();
}

async function main() {
  await captureApp(5174, "ref");
  await captureApp(5173, "mine");
  console.log("Finished capturing individual frames.");
}

main().catch(console.error);
