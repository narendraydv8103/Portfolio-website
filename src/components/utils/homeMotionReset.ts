// Ported from kavish3D-Portofolio (MIT, (c) Rajesh Chityal)
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSmoother, setSmoother } from "./scrollSmoother";

gsap.registerPlugin(ScrollTrigger);

export const resetHomeMotionState = () => {
  const selectors = [
    ".character-model",
    ".landing-container",
    ".about-me",
    ".about-section",
    ".what-box-in",
    ".whatIDO",
    ".character-rim",
  ];

  selectors.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "transform,x,y,opacity,pointerEvents" });
    }
  });

  ScrollTrigger.clearScrollMemory();
};

export const destroyHomeScroll = () => {
  getSmoother()?.kill();
  setSmoother(undefined);
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  resetHomeMotionState();
};
