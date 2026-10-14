import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const vidPath = path.resolve("new refrence/Recording 2026-10-10 233911.mp4");
const outDir = path.resolve("scratch_frames/ref_hero");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function extract() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  // Create an HTML page that plays the video
  const fileUrl = "file:///" + vidPath.replace(/\\/g, "/");
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0;background:#000;">
        <video id="v" src="${fileUrl}" controls style="width:100%;height:100%;object-fit:contain;"></video>
      </body>
    </html>
  `);

  await page.waitForFunction(() => {
    const v = document.getElementById("v");
    return v && v.readyState >= 1;
  });

  const duration = await page.evaluate(() => document.getElementById("v").duration);
  console.log("Video duration:", duration);

  const step = 0.5; // Every 0.5s
  let frameIdx = 0;
  for (let t = 0; t <= duration; t += step) {
    await page.evaluate((time) => {
      const v = document.getElementById("v");
      v.currentTime = time;
    }, t);
    await page.waitForTimeout(150);
    const framePath = path.join(outDir, `frame_${String(frameIdx).padStart(3, "0")}.png`);
    await page.screenshot({ path: framePath });
    console.log(`Saved frame ${frameIdx} at t=${t.toFixed(1)}s`);
    frameIdx++;
    if (frameIdx > 40) break; // Limit to reasonable number
  }

  await browser.close();
  console.log("Extraction complete!");
}

extract().catch(console.error);
