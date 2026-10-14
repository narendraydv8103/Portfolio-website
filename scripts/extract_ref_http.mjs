import http from "http";
import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const vidPath = path.resolve("new refrence/Recording 2026-10-10 233911.mp4");
const outDir = path.resolve("scratch_frames/ref_hero");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Create simple HTTP server to stream the mp4 video
const server = http.createServer((req, res) => {
  if (req.url === "/video.mp4") {
    const stat = fs.statSync(vidPath);
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(vidPath, { start, end });
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": stat.size,
        "Content-Type": "video/mp4",
      });
      fs.createReadStream(vidPath).pipe(res);
    }
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!DOCTYPE html><html><body style="margin:0;background:#000;"><video id="v" src="/video.mp4" controls autoplay muted style="width:100vw;height:100vh;object-fit:contain;"></video></body></html>`);
  }
});

server.listen(5566, "127.0.0.1", async () => {
  console.log("Server listening on port 5566");
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto("http://127.0.0.1:5566/");
    await page.waitForFunction(() => {
      const v = document.getElementById("v");
      return v && v.readyState >= 2;
    }, { timeout: 15000 });

    const duration = await page.evaluate(() => document.getElementById("v").duration);
    console.log("Video duration:", duration);

    const step = 0.5;
    let frameIdx = 0;
    for (let t = 0; t <= Math.min(duration, 15); t += step) {
      await page.evaluate((time) => {
        const v = document.getElementById("v");
        v.pause();
        v.currentTime = time;
      }, t);
      await page.waitForTimeout(150);
      const framePath = path.join(outDir, `frame_${String(frameIdx).padStart(3, "0")}.png`);
      await page.screenshot({ path: framePath });
      console.log(`Saved frame ${frameIdx} at t=${t.toFixed(1)}s`);
      frameIdx++;
    }

    await browser.close();
    console.log("Extraction done! Total frames:", frameIdx);
  } catch (err) {
    console.error("Error extracting:", err);
  } finally {
    server.close();
  }
});
