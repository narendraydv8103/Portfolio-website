// Ported from kavish3D-Portofolio (MIT, (c) Rajesh Chityal)
import { useEffect, useRef } from "react";
import "./styles/NameMarquee.css";

// Slower on small screens — full speed feels too fast on a narrow viewport.
const getBaseSpeed = () => (window.innerWidth <= 768 ? 0.7 : 1.5);

const NameMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const targetSpeedRef = useRef(-getBaseSpeed());   // negative = right→left (default)
  const currentSpeedRef = useRef(-getBaseSpeed());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let singleW = 0;
    let rafId: number;

    const measure = () => {
      singleW = track.scrollWidth / 4;
    };

    const onResize = () => {
      measure();
      targetSpeedRef.current = Math.sign(targetSpeedRef.current || -1) * getBaseSpeed();
    };

    const step = () => {
      currentSpeedRef.current +=
        (targetSpeedRef.current - currentSpeedRef.current) * 0.06;

      posRef.current += currentSpeedRef.current;

      if (posRef.current >= singleW) posRef.current -= singleW;
      if (posRef.current <= -singleW) posRef.current += singleW;

      track.style.transform = `translateX(${posRef.current}px)`;
      rafId = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        // Scrolling UP — reverse direction
        targetSpeedRef.current = getBaseSpeed();
      } else {
        // Scrolling DOWN — keep / restore default direction
        targetSpeedRef.current = -getBaseSpeed();
      }
      clearTimeout(timerRef.current!);
      timerRef.current = setTimeout(() => {
        targetSpeedRef.current = -getBaseSpeed();
      }, 500);
    };

    const start = () => {
      measure();
      rafId = requestAnimationFrame(step);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerRef.current!);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const text = "Narendra Yadav -   ";

  return (
    <div className="name-marquee">
      <div ref={trackRef} className="marquee-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default NameMarquee;
