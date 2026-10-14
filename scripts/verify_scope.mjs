import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("scratch_frames/verify");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: [
      "--use-gl=swiftshader",
      "--enable-unsafe-swiftshader",
      "--ignore-gpu-blocklist",
    ],
  });

  const page = await browser.newPage({
    viewport: { width: 1892, height: 925 },
  });

  console.log("Navigating to http://localhost:5173/ for intro verification...");
  await page.goto("http://localhost:5173/");

  // Wait for loading screen to detach
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 20000 }).catch(() => {});
  
  // Mid-intro screenshot (~0.5s after loader finishes)
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, "intro_rise_mid.png") });
  console.log("Captured intro_rise_mid.png");

  // Intro finished screenshot (~1.8s after loader finishes)
  await page.waitForTimeout(1300);
  await page.screenshot({ path: path.join(outDir, "intro_ended.png") });
  console.log("Captured intro_ended.png");

  // Progress points to verify
  const progressPoints = [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.65, 0.72, 0.8, 0.88];

  let p0Metrics = null;

  for (const p of progressPoints) {
    const pStr = p.toFixed(2);
    await page.goto(`http://localhost:5173/?progress=${p}`);
    await page.waitForSelector(".loading-screen", { state: "detached", timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(2200); // Allow lighting and GSAP scrub to fully settle

    const filename = `p_${pStr}.png`;
    const filepath = path.join(outDir, filename);
    await page.screenshot({ path: filepath });
    console.log(`Captured ${filename}`);

    if (p === 0) {
      p0Metrics = await page.evaluate(() => {
        const char = window.__character;
        const camera = window.__camera;
        const THREE = window.THREE;
        if (!char || !camera || !THREE) return null;

        char.updateMatrixWorld(true);
        camera.updateMatrixWorld(true);

        const project = (v3) => {
          const v = v3.clone().applyMatrix4(char.matrixWorld).project(camera);
          return {
            x: ((v.x + 1) / 2) * window.innerWidth,
            y: ((-v.y + 1) / 2) * window.innerHeight,
            normX: (v.x + 1) / 2,
            normY: (-v.y + 1) / 2,
          };
        };

        const capTop = project(new THREE.Vector3(0, 14.9, 0));
        const chin = project(new THREE.Vector3(0, 11.9, 0.4));
        const earL = project(new THREE.Vector3(2.32, 13.0, 0));
        const earR = project(new THREE.Vector3(-2.32, 13.0, 0));

        return {
          viewport: { width: window.innerWidth, height: window.innerHeight },
          capTopPercent: capTop.normY * 100,
          chinPercent: chin.normY * 100,
          headHeightPercent: (chin.normY - capTop.normY) * 100,
          earWidthPercent: Math.abs(earL.normX - earR.normX) * 100,
        };
      });
    }
  }

  // Real mouse wheel scroll test
  console.log("Testing real mouse wheel scroll from 0 through hero -> studio...");
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(2000);

  // Wheel down progressively
  for (let i = 0; i < 15; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, "wheel_scroll.png") });
  console.log("Captured wheel_scroll.png");

  console.log("\n================ P = 0 MEASUREMENTS ================");
  console.log(JSON.stringify(p0Metrics, null, 2));

  await browser.close();
}

run().catch(console.error);
