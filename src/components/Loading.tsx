import { useCallback, useEffect, useRef, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const greetings = ["Hola", "Bonjour", "नमस्ते", "Ciao", "こんにちは", "Hallo", "Olá", "स्वागतम्"];
const GREETING_INTERVAL = 160;

interface LoadingProps {
  percent: number;
  onLoaded?: () => void;
}

const Loading = ({ percent, onLoaded }: LoadingProps) => {
  const { setIsLoading } = useLoading();
  const [exiting, setExiting] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const exitStartedRef = useRef(false);
  const greetingsDoneRef = useRef(false);
  const percentRef = useRef(percent);

  const startExit = useCallback(() => {
    if (exitStartedRef.current) return;
    exitStartedRef.current = true;
    setExiting(true);

    import("./utils/initialFX").then((module) => {
      module.initialFX();
    });

    window.setTimeout(() => {
      setIsLoading(false);
      onLoaded?.();
    }, 900);
  }, [setIsLoading, onLoaded]);

  // Keep the latest percent in a ref so other effects can read it without re-running.
  useEffect(() => {
    percentRef.current = percent;
    // Once the greeting cycle has already finished, exit as soon as loading completes.
    if (greetingsDoneRef.current && percent >= 100) {
      startExit();
    }
  }, [percent, startExit]);

  // Safety timeout — never let the preloader hang forever.
  useEffect(() => {
    const safetyStart = window.setTimeout(startExit, 7000);
    return () => window.clearTimeout(safetyStart);
  }, [startExit]);

  // Cycle greetings; once the cycle finishes, exit only if loading has also completed.
  useEffect(() => {
    if (exitStartedRef.current) return;
    if (greetingIndex < greetings.length - 1) {
      const t = window.setTimeout(() => setGreetingIndex((i) => i + 1), GREETING_INTERVAL);
      return () => window.clearTimeout(t);
    }
    // Last greeting reached — mark greetings as done.
    const t = window.setTimeout(() => {
      greetingsDoneRef.current = true;
      if (percentRef.current >= 100) {
        startExit();
      }
    }, GREETING_INTERVAL);
    return () => window.clearTimeout(t);
  }, [greetingIndex, startExit]);

  return (
    <div className={`loading-screen${exiting ? " loading-screen-exit" : ""}`}>
      {/*
        Exact curved SVG curtain as the reference video.
        The path fills 0→100vh with a bezier that dips to 120vh at the center.
        On exit the whole div slides to translateY(-120%), making the curved
        bottom edge sweep upward across the viewport before disappearing.
      */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 120"
        preserveAspectRatio="none"
        className="loading-screen-svg"
        aria-hidden="true"
      >
        <path d="M0 0 L100 0 L100 100 Q50 120 0 100 Z" fill="#111111" />
      </svg>

      <div className="loading-screen-text">
        <span className="loading-screen-dot">•</span>
        <span key={greetingIndex} className="loading-screen-word">{greetings[greetingIndex]}</span>
      </div>
    </div>
  );
};

export default Loading;
