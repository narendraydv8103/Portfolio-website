import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("scratch_frames/mouse_test");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);

  // Apply new head and neck rotation in browser
  const testMouseHead = async (label, mouseX, mouseY) => {
    const info = await page.evaluate(({ mouseX, mouseY }) => {
      const char = window.__character;
      const THREE = window.THREE;
      const headBone = char.getObjectByName("spine006");
      const neckBone = char.getObjectByName("spine005");
      const chestBone = char.getObjectByName("spine003");

      const maxYaw = 0.48; // ~27.5 deg
      const targetYaw = mouseX * maxYaw;
      const neckTargetY = targetYaw * 0.30;
      const headTargetY = targetYaw * 0.70;

      const targetPitch = Math.min(Math.max(-mouseY * 0.22, -0.16), 0.26);
      const neckTargetX = targetPitch * 0.35;
      const headTargetX = targetPitch * 0.65;

      neckBone.rotation.y = neckTargetY;
      neckBone.rotation.x = neckTargetX;
      headBone.rotation.y = headTargetY;
      headBone.rotation.x = headTargetX;

      char.updateMatrixWorld(true);

      const v = new THREE.Vector3();
      const getPos = (n) => {
        const o = char.getObjectByName(n);
        if (!o) return [0,0,0];
        o.getWorldPosition(v);
        return [parseFloat(v.x.toFixed(3)), parseFloat(v.y.toFixed(3)), parseFloat(v.z.toFixed(3))];
      };

      return {
        neckRot: [neckBone.rotation.x, neckBone.rotation.y],
        headRot: [headBone.rotation.x, headBone.rotation.y],
        chestPos: getPos("spine003"),
        wristLPos: getPos("handL"),
        wristRPos: getPos("handR"),
      };
    }, { mouseX, mouseY });

    await page.waitForTimeout(100);
    const p = path.join(outDir, `${label}.png`);
    await page.screenshot({ path: p });
    console.log(`[${label}]:`, info);
  };

  await testMouseHead("center", 0, 0);
  await testMouseHead("far_left", -1.0, 0);
  await testMouseHead("far_right", 1.0, 0);
  await testMouseHead("look_up", 0, 1.0);
  await testMouseHead("look_down", 0, -1.0);

  await browser.close();
}

run().catch(console.error);
