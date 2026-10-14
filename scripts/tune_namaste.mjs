import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("scratch_frames/namaste_tuning");
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

  const testPose = async (label, cfg) => {
    const res = await page.evaluate((c) => {
      const char = window.__character;
      const THREE = window.THREE;
      if (!char || !THREE) return null;

      const upperArmL = char.getObjectByName("upper_armL");
      const upperArmR = char.getObjectByName("upper_armR");
      const forearmL = char.getObjectByName("forearmL");
      const forearmR = char.getObjectByName("forearmR");
      const handL = char.getObjectByName("handL");
      const handR = char.getObjectByName("handR");

      const eArmL = new THREE.Euler(...c.arm, 'XYZ');
      const qArmL = new THREE.Quaternion().setFromEuler(eArmL);
      const qArmR = new THREE.Quaternion(qArmL.x, -qArmL.y, -qArmL.z, qArmL.w);
      upperArmL.quaternion.copy(qArmL);
      upperArmR.quaternion.copy(qArmR);

      const eForeL = new THREE.Euler(...c.fore, 'XYZ');
      const qForeL = new THREE.Quaternion().setFromEuler(eForeL);
      const qForeR = new THREE.Quaternion(qForeL.x, -qForeL.y, -qForeL.z, qForeL.w);
      forearmL.quaternion.copy(qForeL);
      forearmR.quaternion.copy(qForeR);

      const eHandL = new THREE.Euler(...c.hand, 'XYZ');
      const qHandL = new THREE.Quaternion().setFromEuler(eHandL);
      const qHandR = new THREE.Quaternion(qHandL.x, -qHandL.y, -qHandL.z, qHandL.w);
      handL.quaternion.copy(qHandL);
      handR.quaternion.copy(qHandR);

      // Reset all fingers to straight/natural
      const fingerList = [
        'palm01', 'palm02', 'palm03', 'palm04',
        'f_index01', 'f_index02', 'f_index03',
        'f_middle01', 'f_middle02', 'f_middle03',
        'f_ring01', 'f_ring02', 'f_ring03',
        'f_pinky01', 'f_pinky02', 'f_pinky03',
        'thumb01', 'thumb02', 'thumb03'
      ];

      fingerList.forEach(f => {
        const bL = char.getObjectByName(f + 'L');
        const bR = char.getObjectByName(f + 'R');
        if (bL && bR) {
          if (c.fingers && c.fingers[f]) {
            const fo = c.fingers[f];
            const eFL = new THREE.Euler(...fo, 'XYZ');
            const qFL = new THREE.Quaternion().setFromEuler(eFL);
            bL.quaternion.copy(qFL);
            bR.quaternion.copy(new THREE.Quaternion(qFL.x, -qFL.y, -qFL.z, qFL.w));
          } else {
            bL.quaternion.set(0, 0, 0, 1);
            bR.quaternion.set(0, 0, 0, 1);
          }
        }
      });

      char.updateMatrixWorld(true);

      const v = new THREE.Vector3();
      const getPos = (name) => {
        const o = char.getObjectByName(name);
        if (!o) return null;
        o.getWorldPosition(v);
        return [parseFloat(v.x.toFixed(3)), parseFloat(v.y.toFixed(3)), parseFloat(v.z.toFixed(3))];
      };

      return {
        qArmL: [parseFloat(qArmL.x.toFixed(4)), parseFloat(qArmL.y.toFixed(4)), parseFloat(qArmL.z.toFixed(4)), parseFloat(qArmL.w.toFixed(4))],
        qForeL: [parseFloat(qForeL.x.toFixed(4)), parseFloat(qForeL.y.toFixed(4)), parseFloat(qForeL.z.toFixed(4)), parseFloat(qForeL.w.toFixed(4))],
        qHandL: [parseFloat(qHandL.x.toFixed(4)), parseFloat(qHandL.y.toFixed(4)), parseFloat(qHandL.z.toFixed(4)), parseFloat(qHandL.w.toFixed(4))],
        wristL: getPos("handL"),
        wristR: getPos("handR"),
        tipL: getPos("f_middle03L"),
        tipR: getPos("f_middle03R"),
        thumbL: getPos("thumb03L"),
        thumbR: getPos("thumb03R"),
      };
    }, cfg);

    await page.waitForTimeout(80);
    const screenshotPath = path.join(outDir, `${label}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`[${label}]:`, res);
  };

  // We want:
  // 1. Hands at chest level: tips at Y ≈ 10.6 - 10.9 (below chin at Y ≈ 11.5)
  // 2. Wrists symmetrical at X ≈ ±0.06 - ±0.08
  // 3. Fingertips meeting at X ≈ ±0.02 - ±0.04
  // 4. Thumbs gently tucked in, pointing slightly up/inward
  // 5. Forearms sloping gracefully without chicken-wing flaring

  // Variation A: Lower elbow bend, less flaring
  await testPose("var_A", {
    arm: [-0.42, 0.55, -0.68],
    fore: [-1.85, 0.12, -0.95],
    hand: [1.45, -0.45, -2.85],
  });

  // Variation B: More tucked elbow, slightly forward pitch
  await testPose("var_B", {
    arm: [-0.38, 0.48, -0.58],
    fore: [-1.75, 0.15, -0.88],
    hand: [1.38, -0.40, -2.75],
  });

  // Variation C: Fine-tuned chest level
  await testPose("var_C", {
    arm: [-0.40, 0.52, -0.62],
    fore: [-1.80, 0.10, -0.92],
    hand: [1.42, -0.42, -2.80],
  });

  // Variation D: Variation with thumb tuned
  await testPose("var_D", {
    arm: [-0.40, 0.52, -0.62],
    fore: [-1.80, 0.10, -0.92],
    hand: [1.42, -0.42, -2.80],
    fingers: {
      thumb01: [0.15, 0.25, -0.10],
      thumb02: [0.0, -0.15, 0.0],
      f_index01: [0.02, 0.0, 0.04],
      f_pinky01: [-0.02, 0.0, -0.04],
    }
  });

  await browser.close();
}

run().catch(console.error);
