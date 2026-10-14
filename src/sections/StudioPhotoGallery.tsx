import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PhotoItem {
  src: string;
  alt: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  { src: '/images/gallery/IMG20251110064436.jpg', alt: 'Mountain peak scenic overlook' },
  { src: '/images/gallery/IMG_20260118_232048.jpg', alt: 'Ambient cafe profile portrait' },
  { src: '/images/gallery/IMG20251110072448.jpg', alt: 'Forested mountain valley view' },
  { src: '/images/gallery/IMG_20260902_161059.jpg', alt: 'Architectural staircase portrait' },
  { src: '/images/gallery/IMG_20251111_024648.jpg', alt: 'Historic fort hilltop view' },
  { src: '/images/gallery/IMG_20260118_232929.jpg', alt: 'Warm cafe portrait with pampas' },
  { src: '/images/gallery/IMG_20260912_184523.jpg', alt: 'Misty mountains and river stones' },
  { src: '/images/gallery/IMG20251110081816.jpg', alt: 'Scenic mountain ridge trail' },
  { src: '/images/gallery/IMG_1777.jpg', alt: 'Campus architectural portrait' },
  { src: '/images/gallery/IMG_20251210_183907_1.jpg', alt: 'Evening cityscape skyline' },
  { src: '/images/gallery/IMG_20251210_202627.jpg', alt: 'Night ambient street atmosphere' },
  { src: '/images/gallery/IMG_20251220_202055.jpg', alt: 'City promenade evening lights' },
  { src: '/images/gallery/IMG_20260324_103743.jpg', alt: 'Daytime outdoor landscape' },
  { src: '/images/gallery/IMG_20260413_133230.jpg', alt: 'Green campus walkway' },
  { src: '/images/gallery/IMG_3622.jpg', alt: 'Casual outdoor portrait' },
  { src: '/images/gallery/IMG_3788.jpeg', alt: 'Warm twilight ambient moment' },
  { src: '/images/gallery/IMG_20260912_185225.jpg', alt: 'Scenic misty winding mountain road' },
  { src: '/images/gallery/IMG_20260118_232200.jpg', alt: 'Full-height indoor architectural portrait' },
];

export const StudioPhotoGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Responsive dimensions state
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Geometry calculations
  const isDesktop = viewportWidth >= 1024;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  const cardWidth = isDesktop ? 540 : isTablet ? 380 : 280;
  const cardHeight = isDesktop ? 620 : isTablet ? 480 : 380;
  const cardGap = 20;
  const cardStepPx = cardWidth + cardGap;
  const deltaThetaDeg = isDesktop ? 19 : isTablet ? 22 : 26;
  const radius = cardStepPx / (deltaThetaDeg * (Math.PI / 180));

  // Drag & Inertia state refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startIndexRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Smooth snap animation
  const animateSnapTo = useCallback((targetIndex: number) => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    const startVal = currentIndexRef.current;
    const delta = targetIndex - startVal;
    if (Math.abs(delta) < 0.0005) {
      currentIndexRef.current = targetIndex;
      setCurrentIndex(targetIndex);
      return;
    }

    const startTime = performance.now();
    const duration = 400; // ms

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = startVal + delta * ease;

      currentIndexRef.current = val;
      setCurrentIndex(val);

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(step);
      } else {
        currentIndexRef.current = targetIndex;
        setCurrentIndex(targetIndex);
      }
    };

    rafIdRef.current = requestAnimationFrame(step);
  }, []);

  // Release momentum with friction decay and settle snap
  const startInertiaAndSnap = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    let v = velocityRef.current;
    // Clamp initial velocity
    v = Math.max(-0.018, Math.min(0.018, v));

    const friction = 0.93;
    const stopThreshold = 0.0003;
    let lastStepTime = performance.now();

    const momentumStep = (now: number) => {
      const dt = Math.min(32, now - lastStepTime);
      lastStepTime = now;

      if (Math.abs(v) > stopThreshold) {
        v *= Math.pow(friction, dt / 16.67);
        const nextIndex = currentIndexRef.current + v * dt;
        currentIndexRef.current = nextIndex;
        setCurrentIndex(nextIndex);
        rafIdRef.current = requestAnimationFrame(momentumStep);
      } else {
        // Snap to nearest integer index
        const nearest = Math.round(currentIndexRef.current);
        animateSnapTo(nearest);
      }
    };

    rafIdRef.current = requestAnimationFrame(momentumStep);
  }, [animateSnapTo]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}

    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    startIndexRef.current = currentIndexRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Update local cursor position relative to gallery container
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    if (!isDraggingRef.current) return;

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    const dx = e.clientX - lastXRef.current;

    if (dt > 8) {
      const currentV = (-dx / cardStepPx) / dt;
      velocityRef.current = 0.6 * velocityRef.current + 0.4 * currentV;
      lastXRef.current = e.clientX;
      lastTimeRef.current = now;
    }

    const totalDx = e.clientX - startXRef.current;
    const newIdx = startIndexRef.current - totalDx / cardStepPx;
    currentIndexRef.current = newIdx;
    setCurrentIndex(newIdx);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    startInertiaAndSnap();
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    handlePointerUp(e);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = Math.round(currentIndexRef.current) - 1;
    animateSnapTo(target);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = Math.round(currentIndexRef.current) + 1;
    animateSnapTo(target);
  };

  const totalPhotos = GALLERY_PHOTOS.length;

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 px-4 sm:px-8 overflow-hidden select-none bg-[#08080a]"
      style={{ WebkitUserSelect: 'none' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-sans font-semibold text-xs uppercase tracking-widest text-[#5eead4]">
            05.5 // PERSONAL GALLERY
          </span>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Section Header Editorial */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.05]">
            Life, Lens <span className="font-light text-[#5eead4]">&amp;</span> <br />
            <span>Perspectives</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg font-sans">
            A visual chronicle of quiet moments, mountain trails, and places explored beyond the terminal.
          </p>
        </div>

        {/* 3D Cylindrical Gallery Viewport */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            if (isDraggingRef.current) {
              isDraggingRef.current = false;
              setIsDragging(false);
              startInertiaAndSnap();
            }
          }}
          className={`relative w-full overflow-hidden touch-pan-y ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            height: `${cardHeight + 80}px`,
            perspective: isDesktop ? '1350px' : '1000px',
            perspectiveOrigin: 'center 46%',
          }}
        >
          {/* Cylinder Stage */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {GALLERY_PHOTOS.map((photo, i) => {
              // Calculate modular circular difference so gallery loops smoothly
              const rawDiff = i - currentIndex;
              const wrappedDiff =
                ((rawDiff % totalPhotos) + 1.5 * totalPhotos) % totalPhotos -
                0.5 * totalPhotos;

              // Hide items wrapped to the far backside
              const isVisible = Math.abs(wrappedDiff) <= 3.2;
              if (!isVisible) return null;

              const thetaDeg = wrappedDiff * deltaThetaDeg;
              const thetaRad = thetaDeg * (Math.PI / 180);

              // Concave cylinder geometry:
              // Center card is recessed, side cards curve forward towards the viewer (+Z)
              const xPos = radius * Math.sin(thetaRad);
              const zPos = radius * (1 - Math.cos(thetaRad));
              const rotateY = -thetaDeg;

              return (
                <div
                  key={photo.src}
                  className="absolute left-1/2 top-1/2 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 border border-white/10 transition-shadow duration-300"
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    transform: `translate3d(calc(-50% + ${xPos}px), -50%, ${zPos}px) rotateY(${rotateY}deg)`,
                    transformOrigin: 'center center',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    draggable={false}
                    loading="lazy"
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                  {/* Subtle vignette shadow gradient matching portfolio depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Interactive Floating "DRAG" Cursor Badge (Reference Video Match) */}
          <div
            className={`pointer-events-none hidden md:block absolute top-0 left-0 transition-opacity duration-200 z-30 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
              willChange: 'transform',
            }}
          >
            <div className="relative -top-8 -left-8 w-16 h-16 pointer-events-none">
              {/* Backing offset circle */}
              <div className="absolute top-0 -left-4 w-16 h-16 rounded-full bg-teal-500/20 border border-[#5eead4]/40 backdrop-blur-sm" />
              {/* Main dark circle with DRAG text */}
              <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-zinc-950/95 border border-white/20 shadow-2xl flex items-center justify-center">
                <span className="font-sans font-bold text-[10px] tracking-widest text-[#5eead4] uppercase">
                  DRAG
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Arrow Navigation Controls (Matching Reference Video) */}
        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-zinc-900/80 hover:bg-zinc-800 hover:border-[#5eead4] hover:text-[#5eead4] text-zinc-300 flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#5eead4]/50"
            aria-label="Previous photograph"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-zinc-900/80 hover:bg-zinc-800 hover:border-[#5eead4] hover:text-[#5eead4] text-zinc-300 flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#5eead4]/50"
            aria-label="Next photograph"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
