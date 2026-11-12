import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StudioWhatICanBuildProps {
  isDesktop?: boolean;
}

export const StudioWhatICanBuild: React.FC<StudioWhatICanBuildProps> = ({ isDesktop = true }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const hoverZoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopContainerRef = useRef<HTMLDivElement | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const checkTimerRef = useRef<number | null>(null);
  const lastPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isHoverDevice = useRef<boolean>(true);

  // Update touch vs hover detection on mount and resize
  useEffect(() => {
    const updateHoverCapability = () => {
      isHoverDevice.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    };
    updateHoverCapability();
    window.addEventListener('resize', updateHoverCapability);
    return () => window.removeEventListener('resize', updateHoverCapability);
  }, []);

  // Track window pointer coordinates to enable elementFromPoint verification after layout shifts
  useEffect(() => {
    const handleWindowPointerMove = (e: PointerEvent) => {
      lastPointerPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
    };
  }, []);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (checkTimerRef.current) clearTimeout(checkTimerRef.current);
    };
  }, []);

  // Re-check which card (if any) is under the cursor after layout transitions
  const checkPointerUnderCursor = useCallback(() => {
    if (!isHoverDevice.current) return;

    // If overlay is hidden or faded out, ensure panels are closed and stop
    if (desktopContainerRef.current) {
      const style = window.getComputedStyle(desktopContainerRef.current);
      if (style.visibility === 'hidden' || parseFloat(style.opacity) < 0.1) {
        setActiveCard(null);
        return;
      }
    }

    const { x, y } = lastPointerPos.current;
    if (x === 0 && y === 0) return;

    const el = document.elementFromPoint(x, y);
    if (!el) return;

    const inZone0 = !!hoverZoneRefs.current[0]?.contains(el);
    const inZone1 = !!hoverZoneRefs.current[1]?.contains(el);

    if (inZone0 && !inZone1) {
      setActiveCard((curr) => (curr !== 0 ? 0 : curr));
    } else if (inZone1 && !inZone0) {
      setActiveCard((curr) => (curr !== 1 ? 1 : curr));
    } else if (!inZone0 && !inZone1) {
      if (!openTimerRef.current) {
        setActiveCard((curr) => (curr !== null ? null : curr));
      }
    }
  }, []);

  const schedulePointerRecheck = useCallback((delay: number) => {
    if (checkTimerRef.current) {
      clearTimeout(checkTimerRef.current);
    }
    checkTimerRef.current = setTimeout(() => {
      checkPointerUnderCursor();
      checkTimerRef.current = null;
    }, delay);
  }, [checkPointerUnderCursor]);

  const handlePointerEnter = (idx: number) => {
    if (!isHoverDevice.current) return;

    // Check if desktop container is visible
    if (desktopContainerRef.current) {
      const style = window.getComputedStyle(desktopContainerRef.current);
      if (style.visibility === 'hidden' || parseFloat(style.opacity) < 0.1) {
        return;
      }
    }

    // Cancel pending close and check timers
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (checkTimerRef.current) {
      clearTimeout(checkTimerRef.current);
      checkTimerRef.current = null;
    }

    // If already active, cancel any pending open timer and keep open
    if (activeCard === idx) {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }
      return;
    }

    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    // Intent delay: ~80ms before opening
    openTimerRef.current = setTimeout(() => {
      setActiveCard(idx);
      openTimerRef.current = null;
      // Re-check after the 240ms layout shift finishes
      schedulePointerRecheck(260);
    }, 80);
  };

  const handlePointerLeave = (idx: number) => {
    if (!isHoverDevice.current) return;

    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    // If this card was active, start close timer (~180ms)
    if (activeCard === idx) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
      closeTimerRef.current = setTimeout(() => {
        setActiveCard(null);
        closeTimerRef.current = null;
        schedulePointerRecheck(260);
      }, 180);
    }
  };

  const handleRowClick = (idx: number) => {
    // Tapping / clicking toggles the card
    setActiveCard((prev) => (prev === idx ? null : idx));
  };

  const handleFocus = (idx: number) => {
    // Keyboard Tab focus opens the card
    setActiveCard(idx);
  };

  const handleBlur = () => {
    // Check if new focused element is outside the cards
    requestAnimationFrame(() => {
      if (activeCard !== null) {
        const zone = hoverZoneRefs.current[activeCard];
        if (zone && !zone.contains(document.activeElement)) {
          setActiveCard(null);
        }
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setActiveCard(null);
    }
  };

  // Close cards if the user scrolls away and the overlay becomes hidden
  useEffect(() => {
    const handleScroll = () => {
      if (desktopContainerRef.current && activeCard !== null) {
        const style = window.getComputedStyle(desktopContainerRef.current);
        if (style.visibility === 'hidden' || parseFloat(style.opacity) < 0.1) {
          setActiveCard(null);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCard]);

  const services = [
    {
      id: 'web-development',
      titleLine1: 'Web',
      titleLine2: 'Development',
      subtitle: 'Modern & scalable web applications',
      description:
        'Modern, responsive websites and web applications built with a focus on usability, performance, and clean design.',
      skillsetTitle: 'Skillset & tools',
      tags: [
        'React & Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Modern UI/UX',
        'Clean Architecture',
        'Performance',
      ],
    },
    {
      id: 'ai-solutions',
      titleLine1: 'AI',
      titleLine2: 'Solutions',
      subtitle: 'Leveraging AI for business impact',
      description:
        'Exploring AI-powered applications and intelligent solutions that turn practical ideas into useful products.',
      skillsetTitle: 'Skillset & tools',
      tags: [
        'LLMs & Agents',
        'Python',
        'AI Workflow Design',
        'API Integration',
        'Prompt Engineering',
      ],
    },
  ];

  const renderCard = (service: (typeof services)[0], idx: number) => {
    const isExpanded = activeCard === idx;

    return (
      <div
        key={service.id}
        className="what-i-do-card relative p-6 sm:p-7 rounded-2xl bg-[#0e0e12]/85 border border-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-md group flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Signature Reference Corner Brackets ┌ ┐ └ ┘ */}
        <span className="absolute top-3 left-3 text-zinc-500 group-hover:text-zinc-300 font-sans text-xs select-none pointer-events-none transition-colors">
          ┌
        </span>
        <span className="absolute top-3 right-3 text-zinc-500 group-hover:text-zinc-300 font-sans text-xs select-none pointer-events-none transition-colors">
          ┐
        </span>
        <span className="absolute bottom-3 left-3 text-zinc-500 group-hover:text-zinc-300 font-sans text-xs select-none pointer-events-none transition-colors">
          └
        </span>
        <span className="absolute bottom-3 right-3 text-zinc-500 group-hover:text-zinc-300 font-sans text-xs select-none pointer-events-none transition-colors">
          ┘
        </span>

        {/* Card Header & Description */}
        <div>
          <h3 className="font-sans font-bold text-xl sm:text-[22px] text-white tracking-[-0.01em] leading-[1.15] mb-1.5">
            {service.titleLine1}
            {service.titleLine2 && (
              <>
                {' '}
                <span className="block sm:inline">{service.titleLine2}</span>
              </>
            )}
          </h3>

          <p className="text-xs sm:text-[13px] font-sans font-medium text-zinc-400 mb-3 tracking-normal normal-case">
            {service.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Expandable Skills / Tools Section (Combined Hover Zone) */}
        <div
          ref={(el) => {
            hoverZoneRefs.current[idx] = el;
          }}
          onPointerEnter={() => handlePointerEnter(idx)}
          onPointerLeave={() => handlePointerLeave(idx)}
          className="mt-4 pt-3 border-t border-white/5"
        >
          {/* Accessible Focusable Button Row */}
          <button
            type="button"
            id={`skillset-trigger-${service.id}`}
            aria-expanded={isExpanded}
            aria-controls={`skillset-panel-${service.id}`}
            onClick={() => handleRowClick(idx)}
            onFocus={() => handleFocus(idx)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full flex items-center justify-between text-left cursor-pointer group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5eead4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e12] rounded-lg py-1 px-1 -mx-1"
          >
            <span className="text-[11px] sm:text-xs font-sans font-medium text-zinc-400 uppercase tracking-[0.07em] group-hover/btn:text-zinc-200 transition-colors">
              {service.skillsetTitle}
            </span>
            <span
              className="skillset-chevron w-7 h-7 rounded-lg border border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.08] items-center justify-center text-zinc-400 hover:text-white transition-all pointer-events-none"
              aria-hidden="true"
            >
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </span>
          </button>

          {/* Smooth Expandable Chips Panel */}
          <div
            id={`skillset-panel-${service.id}`}
            role="region"
            aria-labelledby={`skillset-trigger-${service.id}`}
            className={`skillset-panel-wrapper ${isExpanded ? 'open' : ''}`}
          >
            <div className="skillset-panel-inner">
              <div className="flex flex-wrap gap-1.5 pt-3">
                {service.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-sans font-medium text-zinc-200 tracking-normal normal-case"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isDesktop) {
    return (
      <section
        id="what"
        className="what-i-do-mobile relative py-20 px-6 sm:px-10 flex flex-col justify-center min-h-[90vh]"
      >
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <h2 className="heading-stylish font-display font-black text-5xl sm:text-6xl text-white uppercase tracking-tight leading-[0.95]">
            WHAT
            <br />
            I DO
          </h2>
          <div className="flex flex-col gap-5">
            {services.map((service, idx) => renderCard(service, idx))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={desktopContainerRef}
      className="what-i-do-desktop pointer-events-none fixed inset-0 z-[65] flex items-center justify-between px-6 sm:px-10 lg:px-14 xl:px-16 select-none"
    >
      {/* Left side: Bold Section Heading */}
      <div className="what-i-do-left pointer-events-auto flex flex-col justify-center max-w-[280px] lg:max-w-[340px]">
        <h2 className="what-i-do-heading heading-stylish font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tighter text-white uppercase leading-[0.92]">
          WHAT
          <br />
          I DO
        </h2>
      </div>

      {/* Center space is visually occupied by the seated 3D character */}

      {/* Right side: Two stacked Service Cards */}
      <div className="what-i-do-right pointer-events-auto w-full max-w-[360px] lg:max-w-[400px] xl:max-w-[430px] flex flex-col gap-4">
        {services.map((service, idx) => renderCard(service, idx))}
      </div>
    </div>
  );
};

export default StudioWhatICanBuild;
