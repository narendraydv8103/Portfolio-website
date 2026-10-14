import React, { useState } from 'react';
import { GraduationCap, X, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const StudioAbout: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // Exact chronological order: Class 10th -> Class 12th -> B.Tech 1st Year -> Current Status
  const orderedHighlights = [
    portfolioData.academicHighlights.find((h) => h.label === 'Class 10th Board') ?? portfolioData.academicHighlights[2],
    portfolioData.academicHighlights.find((h) => h.label === 'Class 12th Board') ?? portfolioData.academicHighlights[1],
    portfolioData.academicHighlights.find((h) => h.label === 'B.Tech 1st Year') ?? portfolioData.academicHighlights[0],
    portfolioData.academicHighlights.find((h) => h.label === 'Current Status') ?? portfolioData.academicHighlights[3],
  ];

  return (
    <section
      id="about"
      className="next-section relative min-h-[90vh] py-24 sm:py-32 px-4 sm:px-8 bg-[#0b0d19] text-[#eae5ec] overflow-hidden flex flex-col justify-center"
      style={{ backgroundColor: '#0b0d19' }}
    >
      <div className="max-w-7xl mx-auto w-full space-y-8 sm:space-y-10">
        {/* Section Marker */}
        <div className="flex items-center gap-3">
          <span className="font-sans text-xs uppercase tracking-widest text-[#5eead4] font-semibold">
            01 // ABOUT ME
          </span>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Upper Two-Column Layout: Left Intro & Capability Pillars | Right Profile Photo & Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col">
            {/* 1. Main Heading (Exact font size, weight, line-height & styling preserved) */}
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight mb-4 sm:mb-5">
              Turning ideas into practical software, exploring AI, and building with curiosity.
            </h2>

            {/* 2. Personal Introduction Paragraph */}
            <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal mb-6 sm:mb-7">
              I am a B.Tech Electrical &amp; Electronics Engineering student at IPS Academy, Indore, currently exploring software development, AI/ML and automation. I started my coding journey in my second year and enjoy turning ideas into practical projects while continuously learning new technologies.
            </p>

            {/* 3. Existing Learning / Technology Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10">
                <span className="text-xs font-sans text-[#5eead4] uppercase block font-semibold mb-1 tracking-wider">01 / CORE</span>
                <span className="text-sm font-display font-bold text-white block">C++ &amp; Python</span>
                <span className="text-xs text-zinc-400 mt-1 block">OOP &amp; Problem Solving</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10">
                <span className="text-xs font-sans text-[#5eead4] uppercase block font-semibold mb-1 tracking-wider">02 / EXPLORING</span>
                <span className="text-sm font-display font-bold text-white block">React &amp; TS</span>
                <span className="text-xs text-zinc-400 mt-1 block">Modern Web UI</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10">
                <span className="text-xs font-sans text-[#5eead4] uppercase block font-semibold mb-1 tracking-wider">03 / APPLIED AI</span>
                <span className="text-sm font-display font-bold text-white block">AI/ML &amp; Voice</span>
                <span className="text-xs text-zinc-400 mt-1 block">Automation Bots</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Profile Photo & Card */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <div className="w-full rounded-3xl bg-zinc-900/60 border border-white/10 p-3 sm:p-4 shadow-2xl backdrop-blur-sm flex flex-col items-center">
              {/* Photo Frame */}
              <div className="w-full rounded-2xl overflow-hidden bg-zinc-950/80 border border-white/5 flex items-center justify-center">
                <img
                  src="/images/neeraj.jpg"
                  alt="Narendra Singh Yadav holding Academic Award at IPS Academy, Indore"
                  className="w-full h-auto max-h-[720px] object-contain rounded-2xl"
                  loading="lazy"
                />
              </div>

              {/* Verified Description beneath the photo */}
              <div className="w-full pt-4 px-2 pb-1 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display font-bold text-base text-white">
                    Narendra Singh Yadav
                  </span>
                  <span className="text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/15 text-[#5eead4] border border-teal-500/30">
                    IPS Academy, Indore
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  B.Tech Electrical &amp; Electronics Engineering student at IPS Academy, Indore. Secured 1st Rank in the EEE Department in my first year and received the Academic Topper Award.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Full-Width Row: All 4 Academic Cards in ONE Single Horizontal Row on Desktop */}
        <div className="pt-2 sm:pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {orderedHighlights.map((stat, idx) => (
              <div
                key={stat.label}
                className="about-stat-tile group p-5 xl:p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-y-[-2px] shadow-lg backdrop-blur-sm flex flex-col justify-between h-full"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <span className="text-[11px] sm:text-xs font-sans font-medium text-zinc-400 uppercase tracking-wider truncate">
                      {stat.label}
                    </span>
                    {stat.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold bg-[#5eead4]/15 text-[#5eead4] border border-[#5eead4]/30 shrink-0 whitespace-nowrap">
                        {stat.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-3xl xl:text-4xl font-display font-extrabold text-white tracking-tight group-hover:text-[#5eead4] transition-colors">
                    {stat.value}
                  </div>
                </div>
                <div className="text-xs font-sans text-zinc-400 mt-2.5 flex items-center gap-1.5 leading-snug">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{stat.subtext}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DETAILED ABOUT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#111115] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#5eead4] tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC PROFILE &amp; VERIFIED CREDENTIALS</span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Narendra Singh Yadav (Neeraj)
              </h3>
              <p className="text-xs sm:text-sm font-sans font-medium text-zinc-400 mt-1">
                Student Developer | AI &amp; Software Development • Indore, India
              </p>
            </div>

            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              {portfolioData.about.lead}
            </p>

            {/* Verified Certificate Photograph */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-zinc-950 p-2 space-y-2">
              <div className="flex items-center justify-between px-2 pt-1 text-xs font-sans text-zinc-400">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Award className="w-4 h-4" />
                  <span>Academic Award Certificate • Session 2025–2026</span>
                </span>
                <span className="text-[#5eead4] font-bold">1st Position Topper</span>
              </div>
              <img
                src="/images/academic_certificate.jpg"
                alt="IPS Academy Academic Award Certificate - Narendra Singh Yadav"
                className="w-full max-h-80 object-contain rounded-xl bg-black/40"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-sans font-medium text-zinc-300">
                  8.95 CGPA • Department of EEE, IPS Academy
                </span>
              </div>
              <a
                href="#contact"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-full bg-white text-zinc-950 font-display text-xs font-bold hover:bg-zinc-200 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudioAbout;
