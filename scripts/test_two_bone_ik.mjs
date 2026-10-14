import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("scratch_frames/test_ik");
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

  const res = await page.evaluate(() => {
    const char = window.__character;
    const THREE = window.THREE;
    if (!char || !THREE) return null;

    // Helper: Analytic Two-Bone IK solver for Rigify bones (bone axis +Y)
    function solveTwoBoneIK(
      upperArm,
      forearm,
      hand,
      targetPos,
      polePos,
      isRight = false
    ) {
      char.updateMatrixWorld(true);

      const rootPos = new THREE.Vector3();
      upperArm.getWorldPosition(rootPos);

      const midPos = new THREE.Vector3();
      forearm.getWorldPosition(midPos);

      const endPos = new THREE.Vector3();
      hand.getWorldPosition(endPos);

      const l1 = rootPos.distanceTo(midPos); // Upper arm length
      const l2 = midPos.distanceTo(endPos);  // Forearm length

      const toTarget = new THREE.Vector3().subVectors(targetPos, rootPos);
      let dist = toTarget.length();
      // Clamp distance
      const maxDist = l1 + l2 - 0.001;
      const minDist = Math.abs(l1 - l2) + 0.001;
      dist = Math.max(minDist, Math.min(maxDist, dist));

      // Law of cosines for elbow interior angle and shoulder angle
      const cosElbow = (l1 * l1 + l2 * l2 - dist * dist) / (2 * l1 * l2);
      const angleElbow = Math.acos(Math.max(-1, Math.min(1, cosElbow)));

      const cosShoulder = (l1 * l1 + dist * dist - l2 * l2) / (2 * l1 * dist);
      const angleShoulder = Math.acos(Math.max(-1, Math.min(1, cosShoulder)));

      const dirTarget = toTarget.clone().normalize();
      const toPole = new THREE.Vector3().subVectors(polePos, rootPos);

      // Normal to plane formed by target and pole
      let planeNormal = new THREE.Vector3().crossVectors(dirTarget, toPole).normalize();
      if (planeNormal.lengthSq() < 0.0001) {
        planeNormal.set(0, 0, 1);
      }

      // Direction perpendicular to dirTarget in the bend plane pointing towards pole
      const bendDir = new THREE.Vector3().crossVectors(planeNormal, dirTarget).normalize();

      // Desired elbow position
      const desiredMid = rootPos.clone()
        .addScaledVector(dirTarget, Math.cos(angleShoulder) * l1)
        .addScaledVector(bendDir, Math.sin(angleShoulder) * l1);

      // Now orient upperArm to point to desiredMid
      // Bone default forward is +Y in parent space
      const parentInvQ = upperArm.parent.getWorldQuaternion(new THREE.Quaternion()).invert();

      // Upper arm world direction: from root to desiredMid
      const desiredUpperDirWorld = new THREE.Vector3().subVectors(desiredMid, rootPos).normalize();
      const desiredUpperDirLocal = desiredUpperDirWorld.clone().applyQuaternion(parentInvQ);

      // In local space, bone points along +Y
      const qUpper = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), desiredUpperDirLocal);
      
      // Twist correction around +Y using plane normal
      const localPlaneNormal = planeNormal.clone().applyQuaternion(parentInvQ);
      // Align bone local Z or X with plane normal
      const refAxis = isRight ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(-1, 0, 0);
      const currentRef = refAxis.clone().applyQuaternion(qUpper);
      // Project currentRef and localPlaneNormal onto plane perpendicular to desiredUpperDirLocal
      const projRef = currentRef.clone().addScaledVector(desiredUpperDirLocal, -currentRef.dot(desiredUpperDirLocal)).normalize();
      const projNorm = localPlaneNormal.clone().addScaledVector(desiredUpperDirLocal, -localPlaneNormal.dot(desiredUpperDirLocal)).normalize();
      const twistQ = new THREE.Quaternion().setFromUnitVectors(projRef, projNorm);
      upperArm.quaternion.copy(twistQ.multiply(qUpper));
      upperArm.updateMatrixWorld(true);

      // Forearm world direction: from desiredMid to targetPos
      const upperWorldQ = upperArm.getWorldQuaternion(new THREE.Quaternion());
      const upperInvQ = upperWorldQ.clone().invert();
      const desiredForeDirWorld = new THREE.Vector3().subVectors(targetPos, desiredMid).normalize();
      const desiredForeDirLocal = desiredForeDirWorld.clone().applyQuaternion(upperInvQ);
      const qFore = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), desiredForeDirLocal);
      forearm.quaternion.copy(qFore);
      forearm.updateMatrixWorld(true);

      return {
        rootPos: [rootPos.x, rootPos.y, rootPos.z],
        desiredMid: [desiredMid.x, desiredMid.y, desiredMid.z],
        reachedHand: [hand.getWorldPosition(new THREE.Vector3()).x, hand.getWorldPosition(new THREE.Vector3()).y, hand.getWorldPosition(new THREE.Vector3()).z]
      };
    }

    const uaL = char.getObjectByName('upper_armL');
    const faL = char.getObjectByName('forearmL');
    const hL = char.getObjectByName('handL');

    const uaR = char.getObjectByName('upper_armR');
    const faR = char.getObjectByName('forearmR');
    const hR = char.getObjectByName('handR');

    // Test standing sides targets:
    const targetL = new THREE.Vector3(1.6, 6.09, 0.3);
    const poleL = new THREE.Vector3(2.2, 7.5, -0.6);

    const targetR = new THREE.Vector3(-1.6, 6.09, 0.3);
    const poleR = new THREE.Vector3(-2.2, 7.5, -0.6);

    const resL = solveTwoBoneIK(uaL, faL, hL, targetL, poleL, false);
    const resR = solveTwoBoneIK(uaR, faR, hR, targetR, poleR, true);

    char.updateMatrixWorld(true);

    return { resL, resR };
  });

  console.log("IK Result:", JSON.stringify(res, null, 2));
  await page.screenshot({ path: path.join(outDir, "test_ik_sides.png") });
  await browser.close();
}

run().catch(console.error);
