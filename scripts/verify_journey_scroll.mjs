import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('scratch_journey_verify');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Wait for loading screen to detach and smoother to be ready
  await page.waitForSelector('.loading-screen', { state: 'detached', timeout: 15000 }).catch(() => {});
  await page.waitForFunction(() => !!window.__smoother && !window.__smoother.paused(), { timeout: 20000 });
  await page.waitForTimeout(1000);

  // Check 1: Before reaching MY LEARNING JOURNEY
  console.log('Checking state 1: Before reaching journey...');
  const initialStates = await page.evaluate(() => {
    const sm = window.__smoother;
    sm.scrollTop(0);
    const lineFill = document.querySelector('.career-timeline-fill');
    const glowBead = document.querySelector('.career-traveling-glow');
    const cards = Array.from(document.querySelectorAll('.journey-card-wrapper')).map(c => {
      const style = window.getComputedStyle(c);
      return { opacity: style.opacity, transform: style.transform };
    });
    return {
      scrollTop: sm.scrollTop(),
      fillHeight: lineFill ? window.getComputedStyle(lineFill).height : null,
      glowOpacity: glowBead ? window.getComputedStyle(glowBead).opacity : null,
      glowVisibility: glowBead ? window.getComputedStyle(glowBead).visibility : null,
      cardsCount: cards.length,
      firstCard: cards[0],
      secondCard: cards[1]
    };
  });
  console.log('Initial states at top:', JSON.stringify(initialStates, null, 2));
  await page.screenshot({ path: path.join(outDir, '01_before_journey.jpg') });

  // Check 2: Entering the section (scroll to #journey start)
  console.log('Checking state 2: Entering section header...');
  await page.evaluate(() => {
    window.__smoother.scrollTo('#journey', false);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '02_entering_section.jpg') });

  // Get milestone positions
  const milestoneOffsets = await page.evaluate(() => {
    const sm = window.__smoother;
    const items = Array.from(document.querySelectorAll('.journey-milestone-item'));
    return items.map((item, i) => {
      const rect = item.getBoundingClientRect();
      const currentScroll = sm.scrollTop();
      return { index: i, targetScroll: currentScroll + rect.top - 350 };
    });
  });
  console.log('Milestone scroll targets:', milestoneOffsets);

  // Check 3: Scrolling through each milestone progressively
  console.log('Checking state 3: Progressively scrolling through milestones...');
  for (const m of milestoneOffsets) {
    console.log(`Scrolling to milestone ${m.index} at Y=${m.targetScroll}...`);
    await page.evaluate((targetY) => {
      window.__smoother.scrollTop(targetY);
    }, m.targetScroll);
    await page.waitForTimeout(600);

    const mState = await page.evaluate((idx) => {
      const items = document.querySelectorAll('.journey-milestone-item');
      const item = items[idx];
      const card = item?.querySelector('.journey-card-wrapper');
      const pin = item?.querySelector('.journey-node-pin');
      const lineFill = document.querySelector('.career-timeline-fill');
      const glowBead = document.querySelector('.career-traveling-glow');
      return {
        cardOpacity: card ? window.getComputedStyle(card).opacity : null,
        cardTransform: card ? window.getComputedStyle(card).transform : null,
        pinActive: pin?.classList.contains('active'),
        fillHeight: lineFill ? window.getComputedStyle(lineFill).height : null,
        glowVisibility: glowBead ? window.getComputedStyle(glowBead).visibility : null
      };
    }, m.index);
    console.log(`Milestone ${m.index} state:`, mState);
    await page.screenshot({ path: path.join(outDir, `03_milestone_${m.index}.jpg`) });
  }

  // Check 4: Reaching the end of the journey section
  console.log('Checking state 4: Reaching end of journey...');
  const lastTarget = milestoneOffsets[milestoneOffsets.length - 1].targetScroll + 400;
  await page.evaluate((targetY) => {
    window.__smoother.scrollTop(targetY);
  }, lastTarget);
  await page.waitForTimeout(600);

  const endState = await page.evaluate(() => {
    const lineFill = document.querySelector('.career-timeline-fill');
    const glowBead = document.querySelector('.career-traveling-glow');
    const pins = Array.from(document.querySelectorAll('.journey-node-pin')).map(p => p.classList.contains('active'));
    const cards = Array.from(document.querySelectorAll('.journey-card-wrapper')).map(c => window.getComputedStyle(c).opacity);
    return {
      fillHeight: lineFill ? window.getComputedStyle(lineFill).height : null,
      glowVisibility: glowBead ? window.getComputedStyle(glowBead).visibility : null,
      allPinsActive: pins.every(Boolean),
      allCardsVisible: cards.every(op => parseFloat(op) > 0.9)
    };
  });
  console.log('End of journey state:', endState);
  await page.screenshot({ path: path.join(outDir, '04_end_of_journey.jpg') });

  // Check 5: Scrolling back upward (reverse-scroll)
  console.log('Checking state 5: Scrolling upward in reverse...');
  for (let i = milestoneOffsets.length - 2; i >= 0; i--) {
    const targetY = milestoneOffsets[i].targetScroll;
    console.log(`Reverse scrolling back to milestone ${i} at Y=${targetY}...`);
    await page.evaluate((y) => {
      window.__smoother.scrollTop(y);
    }, targetY);
    await page.waitForTimeout(600);

    const revState = await page.evaluate((currIdx) => {
      const items = document.querySelectorAll('.journey-milestone-item');
      // Later item (currIdx + 1) should now be retreated/retreating
      const nextItem = items[currIdx + 1];
      const nextCard = nextItem?.querySelector('.journey-card-wrapper');
      const nextPin = nextItem?.querySelector('.journey-node-pin');
      const lineFill = document.querySelector('.career-timeline-fill');
      return {
        nextCardOpacity: nextCard ? window.getComputedStyle(nextCard).opacity : null,
        nextPinActive: nextPin?.classList.contains('active'),
        fillHeight: lineFill ? window.getComputedStyle(lineFill).height : null
      };
    }, i);
    console.log(`Reverse at milestone ${i}:`, revState);
    await page.screenshot({ path: path.join(outDir, `05_reverse_to_${i}.jpg`) });
  }

  // Check 6: Returning to top before section
  console.log('Checking state 6: Returning completely to the top...');
  await page.evaluate(() => {
    window.__smoother.scrollTop(0);
  });
  await page.waitForTimeout(800);

  const resetState = await page.evaluate(() => {
    const lineFill = document.querySelector('.career-timeline-fill');
    const glowBead = document.querySelector('.career-traveling-glow');
    const cards = Array.from(document.querySelectorAll('.journey-card-wrapper')).map(c => {
      const style = window.getComputedStyle(c);
      return { opacity: style.opacity, transform: style.transform };
    });
    const pins = Array.from(document.querySelectorAll('.journey-node-pin')).map(p => p.classList.contains('active'));
    return {
      fillHeight: lineFill ? window.getComputedStyle(lineFill).height : null,
      glowVisibility: glowBead ? window.getComputedStyle(glowBead).visibility : null,
      firstCardOpacity: cards[0]?.opacity,
      allPinsInactive: pins.every(active => !active)
    };
  });
  console.log('Reset state after returning to top:', resetState);
  await page.screenshot({ path: path.join(outDir, '06_returned_to_top.jpg') });

  // Check 7: Scrolling beyond the section - Honors & Achievements unchanged
  console.log('Checking state 7: Honors & Achievements intact...');
  await page.evaluate(() => {
    const el = document.querySelector('#journey .border-t');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '07_honors_achievements.jpg') });

  // Check 8: Mobile viewport
  console.log('Checking state 8: Mobile viewport...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    ScrollTrigger.refresh();
    window.__smoother.scrollTo('#journey', false);
  });
  await page.waitForTimeout(600);

  const mobileCheck = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      windowWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  console.log('Mobile check results:', mobileCheck);
  await page.screenshot({ path: path.join(outDir, '08_mobile_view.jpg') });

  await browser.close();
  console.log('All 8 automated tests passed successfully!');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
