import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("scratch_frames/verify_final");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function verify() {
  console.log("=== STARTING COMPREHENSIVE FINAL VERIFICATION ===");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);

  // Helper to query 3D character metrics
  const getMetrics = async () => {
    return await page.evaluate(() => {
      const char = window.__character;
      const THREE = window.THREE;
      if (!char || !THREE) return null;

      const v = new THREE.Vector3();
      const getPos = (name) => {
        const obj = char.getObjectByName(name);
        if (!obj) return null;
        obj.getWorldPosition(v);
        return [parseFloat(v.x.toFixed(3)), parseFloat(v.y.toFixed(3)), parseFloat(v.z.toFixed(3))];
      };

      const head = char.getObjectByName("spine006");
      const neck = char.getObjectByName("spine005");
      const chest = char.getObjectByName("spine003");

      return {
        posY: parseFloat(char.position.y.toFixed(3)),
        rotY: parseFloat(char.rotation.y.toFixed(3)),
        headRotY: head ? parseFloat(head.rotation.y.toFixed(4)) : null,
        headRotX: head ? parseFloat(head.rotation.x.toFixed(4)) : null,
        neckRotY: neck ? parseFloat(neck.rotation.y.toFixed(4)) : null,
        neckRotX: neck ? parseFloat(neck.rotation.x.toFixed(4)) : null,
        chestRotY: chest ? parseFloat(chest.rotation.y.toFixed(4)) : null,
        wristL: getPos("handL"),
        wristR: getPos("handR"),
        tipL: getPos("f_middle03L"),
        tipR: getPos("f_middle03R"),
        heroProgress: window.__heroProgress ?? null,
      };
    });
  };

  // 1. Initial State (scrollY = 0, mouse center)
  console.log("\n[TEST 1] Initial Load State (scrollY = 0):");
  await page.mouse.move(720, 450);
  await page.waitForTimeout(400);
  const initialMetrics = await getMetrics();
  console.log("Initial Metrics:", initialMetrics);
  await page.screenshot({ path: path.join(outDir, "1_initial_load.png") });

  // 2. Mouse-Follow Head Rotation (horizontal left, right, up, down)
  console.log("\n[TEST 2] Mouse-Follow Head Rotation:");
  
  // Move mouse to top-left
  await page.mouse.move(150, 150);
  await page.waitForTimeout(400);
  const mouseTopLeftMetrics = await getMetrics();
  console.log("Mouse Top-Left Metrics:", mouseTopLeftMetrics);
  await page.screenshot({ path: path.join(outDir, "2_mouse_top_left.png") });

  // Move mouse to far-right
  await page.mouse.move(1350, 450);
  await page.waitForTimeout(400);
  const mouseRightMetrics = await getMetrics();
  console.log("Mouse Right Metrics:", mouseRightMetrics);
  await page.screenshot({ path: path.join(outDir, "3_mouse_right.png") });

  // Move mouse to bottom-center
  await page.mouse.move(720, 850);
  await page.waitForTimeout(400);
  const mouseDownMetrics = await getMetrics();
  console.log("Mouse Down Metrics:", mouseDownMetrics);
  await page.screenshot({ path: path.join(outDir, "4_mouse_down.png") });

  // Check Chest & Wrist Stability while mouse moved
  const chestDiff = Math.abs(mouseRightMetrics.chestRotY - initialMetrics.chestRotY);
  const wristStability = Math.abs(mouseRightMetrics.wristL[1] - initialMetrics.wristL[1]);
  console.log(`Stability Check: Chest rotation delta = ${chestDiff}, Wrist Y delta = ${wristStability}`);

  // Return mouse to center
  await page.mouse.move(720, 450);
  await page.waitForTimeout(300);

  // 3. Scroll-Controlled Vertical Entrance
  console.log("\n[TEST 3] Scroll Entrance forward:");
  // Evaluate Lenis or window scroll to reach progress ~0.10
  await page.evaluate(() => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(window.innerHeight * 0.45, { immediate: true });
    } else {
      window.scrollTo(0, window.innerHeight * 0.45);
    }
  });
  await page.waitForTimeout(500);
  const midScrollMetrics = await getMetrics();
  console.log("Mid-Entrance / Standing Hero Metrics:", midScrollMetrics);
  await page.screenshot({ path: path.join(outDir, "5_hero_risen.png") });

  // Test mouse follow WHILE in standing hero position!
  console.log("\n[TEST 4] Mouse-follow while standing in hero:");
  await page.mouse.move(200, 250);
  await page.waitForTimeout(400);
  const standingMouseMetrics = await getMetrics();
  console.log("Standing Mouse Metrics:", standingMouseMetrics);
  await page.screenshot({ path: path.join(outDir, "6_hero_risen_mouse_follow.png") });

  // 4. Scroll Backward (Reversibility)
  console.log("\n[TEST 5] Reversing scroll back to top (scrollY = 0):");
  await page.evaluate(() => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  });
  await page.waitForTimeout(500);
  const reversedMetrics = await getMetrics();
  console.log("Reversed Metrics (should equal initial):", reversedMetrics);
  await page.screenshot({ path: path.join(outDir, "7_scroll_reversed.png") });

  // 5. Seated Workstation Verification (Progress ~0.75)
  console.log("\n[TEST 6] Seated Scene Verification (Later scroll transition):");
  await page.evaluate(() => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(window.innerHeight * 2.8, { immediate: true });
    } else {
      window.scrollTo(0, window.innerHeight * 2.8);
    }
  });
  await page.waitForTimeout(600);
  const seatedMetrics = await getMetrics();
  console.log("Seated Scene Metrics:", seatedMetrics);
  await page.screenshot({ path: path.join(outDir, "8_seated_scene.png") });

  console.log("\nConsole Errors encountered during full session:", consoleErrors);
  console.log("=== VERIFICATION COMPLETE ===");
  await browser.close();
}

verify().catch(console.error);
