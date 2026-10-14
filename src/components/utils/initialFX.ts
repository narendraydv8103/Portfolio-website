// Ported from kavish3D-Portofolio (MIT, (c) Rajesh Chityal)
import gsap from "gsap";
import { getSmoother } from "./scrollSmoother";

export function initialFX() {
  document.body.style.overflowY = "auto";
  getSmoother()?.paused(false);
  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) {
    mainEl.classList.add("main-active");
  }
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });
}
