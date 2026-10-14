import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });
  await page.goto("http://localhost:5173");

  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 15000 }).catch(() => {});
  await page.waitForFunction(() => !!window.__character && !!window.__smoother, { timeout: 20000 });
  await page.waitForTimeout(3000);

  // Scroll to seated scene (scrollY = 1500)
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, 150);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(2500);

  const report = await page.evaluate(() => {
    const char = window.__character;
    const scene = window.__scene;
    const screenlight = char.getObjectByName("screenlight");
    const pointLight = scene.children.find(c => c.isPointLight);

    return {
      screenlightOpacity: screenlight?.material?.opacity,
      screenlightEmissive: screenlight?.material?.emissive?.getHexString(),
      screenlightEmissiveIntensity: screenlight?.material?.emissiveIntensity,
      pointLightIntensity: pointLight?.intensity,
      pointLightColor: pointLight?.color?.getHexString(),
      wristL: char.getObjectByName("handL")?.position,
      wristR: char.getObjectByName("handR")?.position,
      keyboardPos: char.getObjectByName("Keyboard")?.position,
    };
  });

  console.log("Seated Scene Report:", JSON.stringify(report, null, 2));
  await page.screenshot({ path: "scratch_seated_detail.png" });
  console.log("Saved scratch_seated_detail.png");

  await browser.close();
}

main().catch(console.error);
