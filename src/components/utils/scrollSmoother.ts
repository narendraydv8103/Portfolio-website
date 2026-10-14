import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let smoother: ScrollSmoother | undefined;

export const setSmoother = (value: ScrollSmoother | undefined) => {
  smoother = value;
  if (typeof window !== "undefined") {
    (window as any).__smoother = value;
    (window as any).ScrollSmoother = ScrollSmoother;
    (window as any).ScrollTrigger = ScrollTrigger;
  }
};

export const getSmoother = () => smoother;
