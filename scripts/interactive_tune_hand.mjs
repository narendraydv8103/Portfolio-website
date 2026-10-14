import { chromium } from 'playwright';

async function tune() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 888 } });
  await page.goto('http://localhost:5173/?progress=0.8');
  await page.waitForSelector('.character-container canvas', { state: 'attached', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Evaluate hand orientations
  const best = await page.evaluate(() => {
    const char = window.__character;
    const handL = char.getObjectByName('hand.L') || char.getObjectByName('handL');
    const handR = char.getObjectByName('hand.R') || char.getObjectByName('handR');
    
    // In char space, check world direction of handL vs handR palm normal
    const vDown = new window.THREE.Vector3(0, -1, 0); // world down
    const vForward = new window.THREE.Vector3(0, 0, 1); // forward to monitor

    // Let's get handL palm normal in world
    const palmNormalL = new window.THREE.Vector3(0, 0, -1).applyQuaternion(handL.getWorldQuaternion(new window.THREE.Quaternion()));
    
    return {
      handL_quat: [handL.quaternion.x, handL.quaternion.y, handL.quaternion.z, handL.quaternion.w],
      palmNormalL: [palmNormalL.x, palmNormalL.y, palmNormalL.z]
    };
  });

  console.log('Hand L info:', best);
  await browser.close();
}

tune();
