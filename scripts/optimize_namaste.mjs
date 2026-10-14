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

  const testConfig = async (name, arm, fore, hand, thumbTuck = 0.28) => {
    const res = await page.evaluate(({ arm, fore, hand, thumbTuck }) => {
      const char = window.__character;
      const THREE = window.THREE;
      if (!char || !THREE) return null;

      const upperArmL = char.getObjectByName("upper_armL");
      const upperArmR = char.getObjectByName("upper_armR");
      const forearmL = char.getObjectByName("forearmL");
      const forearmR = char.getObjectByName("forearmR");
      const handL = char.getObjectByName("handL");
      const handR = char.getObjectByName("handR");

      const eArmL = new THREE.Euler(...arm, 'XYZ');
      const qArmL = new THREE.Quaternion().setFromEuler(eArmL);
      upperArmL.quaternion.copy(qArmL);
      upperArmR.quaternion.copy(new THREE.Quaternion(qArmL.x, -qArmL.y, -qArmL.z, qArmL.w));

      const eForeL = new THREE.Euler(...fore, 'XYZ');
      const qForeL = new THREE.Quaternion().setFromEuler(eForeL);
      forearmL.quaternion.copy(qForeL);
      forearmR.quaternion.copy(new THREE.Quaternion(qForeL.x, -qForeL.y, -qForeL.z, qForeL.w));

      const eHandL = new THREE.Euler(...hand, 'XYZ');
      const qHandL = new THREE.Quaternion().setFromEuler(eHandL);
      handL.quaternion.copy(qHandL);
      handR.quaternion.copy(new THREE.Quaternion(qHandL.x, -qHandL.y, -qHandL.z, qHandL.w));

      // Reset all fingers to straight alignment
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
          bL.quaternion.set(0, 0, 0, 1);
          bR.quaternion.set(0, 0, 0, 1);
        }
      });

      if (thumbTuck !== 0) {
        const thL = char.getObjectByName("thumb01L");
        const thR = char.getObjectByName("thumb01R");
        if (thL && thR) {
          const eThL = new THREE.Euler(0.18, thumbTuck, -0.08, 'XYZ');
          const qThL = new THREE.Quaternion().setFromEuler(eThL);
          thL.quaternion.copy(qThL);
          thR.quaternion.copy(new THREE.Quaternion(qThL.x, -qThL.y, -qThL.z, qThL.w));
        }
      }

      char.updateMatrixWorld(true);

      const v = new THREE.Vector3();
      const getPos = (n) => {
        const o = char.getObjectByName(n);
        if (!o) return [0,0,0];
        o.getWorldPosition(v);
        return [parseFloat(v.x.toFixed(3)), parseFloat(v.y.toFixed(3)), parseFloat(v.z.toFixed(3))];
      };

      return {
        wristL: getPos("handL"),
        wristR: getPos("handR"),
        tipL: getPos("f_middle03L"),
        tipR: getPos("f_middle03R"),
        qArmL: [parseFloat(qArmL.x.toFixed(4)), parseFloat(qArmL.y.toFixed(4)), parseFloat(qArmL.z.toFixed(4)), parseFloat(qArmL.w.toFixed(4))],
        qForeL: [parseFloat(qForeL.x.toFixed(4)), parseFloat(qForeL.y.toFixed(4)), parseFloat(qForeL.z.toFixed(4)), parseFloat(qForeL.w.toFixed(4))],
        qHandL: [parseFloat(qHandL.x.toFixed(4)), parseFloat(qHandL.y.toFixed(4)), parseFloat(qHandL.z.toFixed(4)), parseFloat(qHandL.w.toFixed(4))],
      };
    }, { arm, fore, hand, thumbTuck });

    await page.waitForTimeout(80);
    const p = path.join(outDir, `${name}.png`);
    await page.screenshot({ path: p });
    console.log(`[${name}]:`, res);
    return res;
  };

  // c4 baseline was:
  // arm: [-0.36, 0.66, -0.92]
  // fore: [-1.90, 0.142, -1.08]
  // hand: [1.52, -0.55, -2.92]

  // Bring wrists slightly closer by tuning fore[2] and hand[2]
  await testConfig("f1_wrists_closer",
    [-0.37, 0.68, -0.95],
    [-1.92, 0.13, -1.14],
    [1.54, -0.56, -2.98],
    0.30
  );

  await testConfig("f2_wrists_perfect",
    [-0.36, 0.69, -0.96],
    [-1.93, 0.12, -1.16],
    [1.53, -0.55, -3.00],
    0.30
  );

  await testConfig("f3_slight_lower",
    [-0.35, 0.68, -0.95],
    [-1.88, 0.12, -1.14],
    [1.50, -0.54, -2.98],
    0.30
  );

  await browser.close();
}

run().catch(console.error);
