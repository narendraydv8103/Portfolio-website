import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("scratch_frames/test_arms");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);

  const testProg = async (name, progress) => {
    const res = await page.evaluate((p) => {
      const char = window.__character;
      const THREE = window.THREE;
      if (!char || !THREE) return null;

      // Ensure matrix world is current
      char.updateMatrixWorld(true);

      const uaL = char.getObjectByName('upper_armL');
      const faL = char.getObjectByName('forearmL');
      const hL = char.getObjectByName('handL');
      const uaR = char.getObjectByName('upper_armR');
      const faR = char.getObjectByName('forearmR');
      const hR = char.getObjectByName('handR');

      function solveArmTwoBoneIK(upperArm, forearm, hand, targetPosWorld, polePosWorld, isRight = false) {
        const parent = upperArm.parent;
        if (!parent) return;

        const parentInvQ = parent.getWorldQuaternion(new THREE.Quaternion()).invert();
        const rootWorld = upperArm.getWorldPosition(new THREE.Vector3());
        const midWorld = forearm.getWorldPosition(new THREE.Vector3());
        const endWorld = hand.getWorldPosition(new THREE.Vector3());

        const l1 = rootWorld.distanceTo(midWorld);
        const l2 = midWorld.distanceTo(endWorld);

        const toTargetWorld = new THREE.Vector3().subVectors(targetPosWorld, rootWorld);
        let dist = toTargetWorld.length();
        const maxReach = l1 + l2 - 0.002;
        const minReach = Math.abs(l1 - l2) + 0.002;
        dist = Math.max(minReach, Math.min(maxReach, dist));

        const cosElbow = (l1 * l1 + l2 * l2 - dist * dist) / (2 * l1 * l2);
        const cosShoulder = (l1 * l1 + dist * dist - l2 * l2) / (2 * l1 * dist);
        const angleShoulder = Math.acos(Math.max(-1, Math.min(1, cosShoulder)));

        const dirTargetWorld = toTargetWorld.clone().normalize();
        const toPoleWorld = new THREE.Vector3().subVectors(polePosWorld, rootWorld);

        let planeNormWorld = new THREE.Vector3().crossVectors(dirTargetWorld, toPoleWorld).normalize();
        if (planeNormWorld.lengthSq() < 0.001) {
          planeNormWorld.set(0, 0, isRight ? -1 : 1);
        }

        const bendDirWorld = new THREE.Vector3().crossVectors(planeNormWorld, dirTargetWorld).normalize();
        const desiredMidWorld = rootWorld.clone()
          .addScaledVector(dirTargetWorld, Math.cos(angleShoulder) * l1)
          .addScaledVector(bendDirWorld, Math.sin(angleShoulder) * l1);

        const desiredUpperDirLocal = new THREE.Vector3().subVectors(desiredMidWorld, rootWorld)
          .normalize()
          .applyQuaternion(parentInvQ);

        const qUpper = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), desiredUpperDirLocal);
        const localPlaneNorm = planeNormWorld.clone().applyQuaternion(parentInvQ);
        const refAxis = isRight ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(-1, 0, 0);
        const currentRef = refAxis.clone().applyQuaternion(qUpper);
        const projRef = currentRef.clone().addScaledVector(desiredUpperDirLocal, -currentRef.dot(desiredUpperDirLocal)).normalize();
        const projNorm = localPlaneNorm.clone().addScaledVector(desiredUpperDirLocal, -localPlaneNorm.dot(desiredUpperDirLocal)).normalize();
        const twistQ = new THREE.Quaternion().setFromUnitVectors(projRef, projNorm);

        upperArm.quaternion.copy(twistQ.multiply(qUpper));
        upperArm.updateMatrixWorld(true);

        const upperWorldQ = upperArm.getWorldQuaternion(new THREE.Quaternion());
        const upperInvQ = upperWorldQ.clone().invert();
        const desiredForeDirLocal = new THREE.Vector3().subVectors(targetPosWorld, desiredMidWorld)
          .normalize()
          .applyQuaternion(upperInvQ);

        const qFore = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), desiredForeDirLocal);
        forearm.quaternion.copy(qFore);
        forearm.updateMatrixWorld(true);
      }

      // Quaternions
      const qNamasteArmL = new THREE.Quaternion(-0.3031, 0.2173, -0.4813, 0.7933).normalize();
      const qNamasteArmR = new THREE.Quaternion(-0.3031, -0.2173, 0.4813, 0.7933).normalize();
      const qNamasteForearmL = new THREE.Quaternion(-0.7051, -0.4211, -0.3527, 0.4484).normalize();
      const qNamasteForearmR = new THREE.Quaternion(-0.7051, 0.4211, 0.3527, 0.4484).normalize();
      const qNamasteHandL = new THREE.Quaternion(0.2425, 0.6510, -0.7058, -0.1385).normalize();
      const qNamasteHandR = new THREE.Quaternion(0.2425, -0.6510, 0.7058, -0.1385).normalize();

      const qSidesHandL = new THREE.Quaternion(0.12, 0.05, -0.15, 0.98).normalize();
      const qSidesHandR = new THREE.Quaternion(0.12, -0.05, 0.15, 0.98).normalize();

      const qLapHandL = new THREE.Quaternion(0.35, 0.20, -0.05, 0.91).normalize();
      const qLapHandR = new THREE.Quaternion(0.35, -0.20, 0.05, 0.91).normalize();

      const qKeyHandL = new THREE.Quaternion(0.6003, 0.3872, 0.1461, 0.6844).normalize();
      const qKeyHandR = new THREE.Quaternion(0.6003, -0.3872, -0.1461, 0.6844).normalize();

      // Namaste wrist positions in character local space
      const namastePosL = new THREE.Vector3(0.22, 9.57, 1.10);
      const namastePosR = new THREE.Vector3(-0.22, 9.57, 1.10);
      const namastePoleL = new THREE.Vector3(2.0, 8.5, 0.5);
      const namastePoleR = new THREE.Vector3(-2.0, 8.5, 0.5);

      // Sides target (x = ±1.6, y = 6.09, z = 0.3)
      const sidesPosL = new THREE.Vector3(1.6, 6.09, 0.3);
      const sidesPosR = new THREE.Vector3(-1.6, 6.09, 0.3);
      const sidesPoleL = new THREE.Vector3(2.2, 7.5, -0.6);
      const sidesPoleR = new THREE.Vector3(-2.2, 7.5, -0.6);

      // Lap target (x = ±0.95, y = 6.2, z = 1.4)
      const lapPosL = new THREE.Vector3(0.95, 6.2, 1.4);
      const lapPosR = new THREE.Vector3(-0.95, 6.2, 1.4);
      const lapPoleL = new THREE.Vector3(1.8, 5.5, 0.4);
      const lapPoleR = new THREE.Vector3(-1.8, 5.5, 0.4);

      // Keyboard target (left: -0.47, right: +0.63, y = 9.25, z = 2.15)
      const keyPosL = new THREE.Vector3(-0.47, 9.25, 2.15);
      const keyPosR = new THREE.Vector3(0.63, 9.25, 2.15);
      const keyPoleL = new THREE.Vector3(1.8, 8.6, 1.4);
      const keyPoleR = new THREE.Vector3(-1.8, 8.6, 1.4);

      // Helper to convert character-local vector to world vector
      const toWorld = (vLocal) => vLocal.clone().applyMatrix4(char.matrixWorld);

      if (p <= 0.10) {
        // Namaste held
        uaL.quaternion.copy(qNamasteArmL);
        uaR.quaternion.copy(qNamasteArmR);
        faL.quaternion.copy(qNamasteForearmL);
        faR.quaternion.copy(qNamasteForearmR);
        hL.quaternion.copy(qNamasteHandL);
        hR.quaternion.copy(qNamasteHandR);
      } else if (p <= 0.30) {
        // Relaxing from Namaste down to sides
        const t = (p - 0.10) / 0.20;
        const targetL = new THREE.Vector3().lerpVectors(namastePosL, sidesPosL, t);
        const targetR = new THREE.Vector3().lerpVectors(namastePosR, sidesPosR, t);
        const poleL = new THREE.Vector3().lerpVectors(namastePoleL, sidesPoleL, t);
        const poleR = new THREE.Vector3().lerpVectors(namastePoleR, sidesPoleR, t);

        solveArmTwoBoneIK(uaL, faL, hL, toWorld(targetL), toWorld(poleL), false);
        solveArmTwoBoneIK(uaR, faR, hR, toWorld(targetR), toWorld(poleR), true);

        hL.quaternion.copy(qNamasteHandL).slerp(qSidesHandL, t);
        hR.quaternion.copy(qNamasteHandR).slerp(qSidesHandR, t);
      } else if (p <= 0.42) {
        // Relaxed at sides
        solveArmTwoBoneIK(uaL, faL, hL, toWorld(sidesPosL), toWorld(sidesPoleL), false);
        solveArmTwoBoneIK(uaR, faR, hR, toWorld(sidesPosR), toWorld(sidesPoleR), true);
        hL.quaternion.copy(qSidesHandL);
        hR.quaternion.copy(qSidesHandR);
      } else if (p <= 0.65) {
        // Sitting down: interpolate from sides to lap
        const t = (p - 0.42) / (0.65 - 0.42);
        const targetL = new THREE.Vector3().lerpVectors(sidesPosL, lapPosL, t);
        const targetR = new THREE.Vector3().lerpVectors(sidesPosR, lapPosR, t);
        const poleL = new THREE.Vector3().lerpVectors(sidesPoleL, lapPoleL, t);
        const poleR = new THREE.Vector3().lerpVectors(sidesPoleR, lapPoleR, t);

        solveArmTwoBoneIK(uaL, faL, hL, toWorld(targetL), toWorld(poleL), false);
        solveArmTwoBoneIK(uaR, faR, hR, toWorld(targetR), toWorld(poleR), true);

        hL.quaternion.copy(qSidesHandL).slerp(qLapHandL, t);
        hR.quaternion.copy(qSidesHandR).slerp(qLapHandR, t);
      } else if (p <= 0.72) {
        // Reaching to keyboard
        const t = (p - 0.65) / (0.72 - 0.65);
        const targetL = new THREE.Vector3().lerpVectors(lapPosL, keyPosL, t);
        const targetR = new THREE.Vector3().lerpVectors(lapPosR, keyPosR, t);
        const poleL = new THREE.Vector3().lerpVectors(lapPoleL, keyPoleL, t);
        const poleR = new THREE.Vector3().lerpVectors(lapPoleR, keyPoleR, t);

        solveArmTwoBoneIK(uaL, faL, hL, toWorld(targetL), toWorld(poleL), false);
        solveArmTwoBoneIK(uaR, faR, hR, toWorld(targetR), toWorld(poleR), true);

        hL.quaternion.copy(qLapHandL).slerp(qKeyHandL, t);
        hR.quaternion.copy(qLapHandR).slerp(qKeyHandR, t);
      } else {
        // Hands stay ON keyboard keys
        solveArmTwoBoneIK(uaL, faL, hL, toWorld(keyPosL), toWorld(keyPoleL), false);
        solveArmTwoBoneIK(uaR, faR, hR, toWorld(keyPosR), toWorld(keyPoleR), true);
        hL.quaternion.copy(qKeyHandL);
        hR.quaternion.copy(qKeyHandR);
      }

      char.updateMatrixWorld(true);

      const v = new THREE.Vector3();
      return {
        wristL: hL.getWorldPosition(v).toArray(),
      };
    }, progress);

    await page.waitForTimeout(100);
    const p = path.join(outDir, `${name}.png`);
    await page.screenshot({ path: p });
    console.log(`[${name} p=${progress}]:`, res);
  };

  await testProg("p005_namaste", 0.05);
  await testProg("p020_relaxing", 0.20);
  await testProg("p030_sides", 0.30);
  await testProg("p050_sitting_lap", 0.50);
  await testProg("p070_reach_keys", 0.70);
  await testProg("p080_on_keys", 0.80);

  await browser.close();
}

run().catch(console.error);
