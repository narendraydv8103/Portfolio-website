import { chromium } from 'playwright';

async function findR() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 888 } });
  await page.goto('http://localhost:5173/?progress=0.8');
  await page.waitForSelector('.character-container canvas', { state: 'attached', timeout: 30000 });
  await page.waitForTimeout(3000);

  const best = await page.evaluate(() => {
    const char = window.__character;
    const handR = char.getObjectByName('hand.R') || char.getObjectByName('handR');
    const forearmR = char.getObjectByName('forearm.R') || char.getObjectByName('forearmR');
    
    // We want the palm normal in world to point down (y ≈ -1)
    // and fingers in world to point forward (z ≈ +1 or toward monitor)
    let bestScore = -999;
    let bestEuler = [0, 0, 0];
    let bestQuat = [0, 0, 0, 1];

    const testQ = new window.THREE.Quaternion();
    const testEuler = new window.THREE.Euler();

    // Search Euler angles for handR
    for (let rx = -Math.PI; rx <= Math.PI; rx += 0.1) {
      for (let ry = -Math.PI; ry <= Math.PI; ry += 0.1) {
        for (let rz = -Math.PI; rz <= Math.PI; rz += 0.1) {
          testEuler.set(rx, ry, rz);
          testQ.setFromEuler(testEuler);
          
          handR.quaternion.copy(testQ);
          handR.updateMatrixWorld(true);

          const worldQ = handR.getWorldQuaternion(new window.THREE.Quaternion());
          // In handR, palm normal vector in local space
          const palmNormal = new window.THREE.Vector3(0, 0, 1).applyQuaternion(worldQ);
          const fingerDir = new window.THREE.Vector3(0, 1, 0).applyQuaternion(worldQ);

          // We want palmNormal pointing DOWN: palmNormal.y ≈ -1
          // We want fingerDir pointing forward toward monitor (character space forward):
          // Char space forward in world has z ≈ 0.6, x ≈ 0.8
          const score = -palmNormal.y * 3.0 + (fingerDir.z * 1.5 + fingerDir.x * 1.0);
          if (score > bestScore) {
            bestScore = score;
            bestEuler = [rx, ry, rz];
            bestQuat = [testQ.x, testQ.y, testQ.z, testQ.w];
          }
        }
      }
    }

    return { bestEuler, bestQuat, bestScore };
  });

  console.log('Best Right Hand:', best);
  await browser.close();
}

findR();
