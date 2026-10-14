import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Award, Calendar, Building, CheckCircle, Flame, ExternalLink, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData, type Achievement } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export const StudioJourney: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Achievement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const glowBeadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCertificate(null);
      }
    };
    if (selectedCertificate) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCertificate]);

  useEffect(() => {
    if (!timelineRef.current || !lineFillRef.current) return;

    const mm = gsap.matchMedia();

    // 1. Scroll-controlled glowing timeline fill & traveling light bead (universal)
    mm.add('(min-width: 0px)', () => {
      gsap.fromTo(
        lineFillRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 75%',
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (glowBeadRef.current) {
                gsap.set(glowBeadRef.current, {
                  autoAlpha: self.progress > 0.005 ? 1 : 0,
                });
              }
            },
          },
        }
      );
    });

    // 2. Desktop milestone cards reveal from alternating sides
    mm.add('(min-width: 640px)', () => {
      const milestoneItems = gsap.utils.toArray<HTMLElement>('.journey-milestone-item');
      milestoneItems.forEach((item, idx) => {
        const cardWrapper = item.querySelector('.journey-card-wrapper');
        const pin = item.querySelector('.journey-node-pin');
        if (!cardWrapper) return;

        // Even indices: right side (reveal from +60px)
        // Odd indices: left side (reveal from -60px)
        const isEven = idx % 2 === 0;
        const initialX = isEven ? 60 : -60;

        gsap.fromTo(
          cardWrapper,
          { x: initialX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              end: 'top 58%',
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (pin) {
                  pin.classList.toggle('active', self.progress > 0.2);
                }
              },
            },
          }
        );
      });
    });

    // 3. Mobile milestone cards reveal (smooth slide-in from right without overflow)
    mm.add('(max-width: 639px)', () => {
      const milestoneItems = gsap.utils.toArray<HTMLElement>('.journey-milestone-item');
      milestoneItems.forEach((item) => {
        const cardWrapper = item.querySelector('.journey-card-wrapper');
        const pin = item.querySelector('.journey-node-pin');
        if (!cardWrapper) return;

        gsap.fromTo(
          cardWrapper,
          { x: 35, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              end: 'top 58%',
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (pin) {
                  pin.classList.toggle('active', self.progress > 0.2);
                }
              },
            },
          }
        );
      });
    });

    // Refresh smoother & ScrollTrigger after layout settles to guarantee exact coordinates
    const refreshTimer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).ScrollSmoother) {
        (window as any).ScrollSmoother.get()?.refresh();
      }
      ScrollTrigger.refresh(true);
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="relative py-28 sm:py-36 px-4 sm:px-8 overflow-hidden [perspective:1200px]">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-sans font-semibold text-xs uppercase tracking-widest text-[#5eead4]">
            05 // TIMELINE &amp; JOURNEY
          </span>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Top Section Header (Matching Reference Code Frame) */}
        <div className="flex flex-col items-center text-center space-y-4 mb-24">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.05]">
            My learning <span className="font-light text-[#5eead4]">&amp;</span> <br />
            <span>journey</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg font-sans">
            How disciplined academic problem solving evolved into engineering software architectures and practical AI tools.
          </p>
        </div>

        {/* Central Glowing Laser Timeline */}
        <div ref={timelineRef} className="relative mb-28">
          {/* Base Unfilled Timeline Track (both mobile and desktop) */}
          <div className="career-timeline-track" />

          {/* Progressive Scroll-Controlled Glowing Fill with Traveling Light Bead */}
          <div ref={lineFillRef} className="career-timeline-fill">
            <div ref={glowBeadRef} className="career-traveling-glow" />
          </div>

          <div className="space-y-10 sm:space-y-14">
            {portfolioData.journeyMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`journey-milestone-item relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-12 pl-10 sm:pl-0`}
                >
                  {/* Central Node Pin */}
                  <div className="journey-node-pin absolute left-4 sm:left-1/2 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-[#08080a] border-2 border-white/20 flex items-center justify-center z-10">
                    <div className="journey-node-dot w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  </div>

                  {/* Content Card (Matching Reference Proportions) */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <div className="journey-card-wrapper">
                      <div className="journey-card p-6 sm:p-7 group">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-[#5eead4] transition-colors">
                              {milestone.title}
                            </h3>
                            <span className="text-xs font-sans font-medium text-[#5eead4] opacity-90 block mt-0.5">
                              {milestone.stack}
                            </span>
                          </div>

                          {/* Year Badge */}
                          <span className="text-2xl sm:text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#5eead4] to-[#67e8f9] tracking-tight shrink-0">
                            {milestone.year}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mt-3">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── VERIFIED HONORS & ACHIEVEMENTS SHOWCASE ─── */}
        <div className="pt-16 border-t border-white/10">
          <div className="flex flex-col items-center text-center space-y-3 mb-14">
            <span className="text-xs font-sans font-semibold tracking-widest uppercase text-[#5eead4]">
              VERIFIED RECOGNITION
            </span>
            <h3 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Honors &amp; Achievements
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-sans">
              Authentic collegiate competitions, premier IIT hackathons, and academic honors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {portfolioData.achievements.map((item) => (
              <div
                key={item.id}
                className="journey-card p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        {item.category === 'Academic' ? (
                          <Trophy className="w-4 h-4 text-amber-400" />
                        ) : item.category === 'Hackathon' ? (
                          <Flame className="w-4 h-4 text-pink-400" />
                        ) : (
                          <Award className="w-4 h-4 text-[#5eead4]" />
                        )}
                      </span>
                      <span className="text-xs font-sans font-medium text-zinc-400">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.highlight && (
                        <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-teal-500/15 text-[#5eead4] border border-teal-500/30">
                          {item.highlight}
                        </span>
                      )}
                      <span className="text-xs font-sans font-medium text-zinc-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.year}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-[#5eead4] transition-colors mb-1.5">
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3 font-sans font-medium">
                    <Building className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{item.organizer}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-sans font-medium">
                  <span className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Credential</span>
                  </span>

                  {item.certificateUrl && (
                    <button
                      onClick={() => setSelectedCertificate(item)}
                      className="text-[#5eead4] hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      <span>View Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CERTIFICATE MODAL */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedCertificate(null);
            }
          }}
        >
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#111115] border border-white/15 p-5 sm:p-7 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between gap-3 pr-10">
              <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#5eead4]">
                {selectedCertificate.category === 'Academic' ? (
                  <Trophy className="w-4 h-4 text-amber-400" />
                ) : selectedCertificate.category === 'Hackathon' ? (
                  <Flame className="w-4 h-4 text-pink-400" />
                ) : (
                  <Award className="w-4 h-4 text-[#5eead4]" />
                )}
                <span className="uppercase tracking-wider font-semibold">
                  {selectedCertificate.category} • {selectedCertificate.year}
                </span>
              </div>

              {selectedCertificate.certificateUrl && (
                <a
                  href={encodeURI(selectedCertificate.certificateUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs font-sans font-medium text-[#5eead4] border border-white/10 transition-colors"
                  title="Open original certificate in new browser tab"
                >
                  <span>Open in Tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close certificate modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg sm:text-2xl font-display font-bold text-white">
                {selectedCertificate.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans font-medium mt-0.5">
                {selectedCertificate.organizer}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 flex-1 min-h-[300px] flex items-center justify-center p-2">
              {selectedCertificate.certificateUrl?.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src={encodeURI(selectedCertificate.certificateUrl)}
                  title={`${selectedCertificate.title} Certificate`}
                  className="w-full h-[55vh] rounded-xl border-0 bg-white"
                />
              ) : (
                <img
                  src={encodeURI(selectedCertificate.certificateUrl || '')}
                  alt={`${selectedCertificate.title} Certificate`}
                  className="w-full max-h-[60vh] object-contain rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
