import React, { useState, useEffect } from 'react';
import { ArrowUp, Menu, X, ArrowUpRight } from 'lucide-react';

interface StudioNavProps {
  activeSection?: string;
}

export const StudioNav: React.FC<StudioNavProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition from hero plain links to floating round hamburger button
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const allLinks = [
    { label: 'Work', href: '#projects', subtitle: 'Featured Engineering Projects' },
    { label: 'About', href: '#about', subtitle: 'Background & Academic Profile' },
    { label: 'What I Can Build', href: '#what', subtitle: 'Capabilities & Technical Offerings' },
    { label: 'Journey', href: '#journey', subtitle: 'Milestones, Competitions & Timeline' },
    { label: 'Contact', href: '#contact', subtitle: 'Let’s Collaborate & Build' },
  ];

  return (
    <>
      {/* ── TOP HEADER LAYER (Transparent, No Dark Blurred Bar) ── */}
      <header className="fixed top-0 left-0 right-0 z-40 py-6 sm:py-8 px-6 sm:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Left: "© Code by Neeraj" */}
          <a
            href="#home"
            className="group flex items-center gap-1.5 pointer-events-auto select-none transition-opacity duration-300"
          >
            <span
              className={`font-sans text-sm sm:text-base transition-colors ${
                scrolled
                  ? 'text-zinc-400 group-hover:text-white'
                  : 'text-zinc-700 group-hover:text-black font-medium'
              }`}
            >
              ©
            </span>
            <span
              className={`font-display text-sm sm:text-base tracking-tight transition-colors ${
                scrolled
                  ? 'text-zinc-200 group-hover:text-white font-medium'
                  : 'text-zinc-900 group-hover:text-black font-semibold'
              }`}
            >
              Code by Neeraj
            </span>
          </a>

          {/* Right Hero Links (ONLY 3 plain text links: Work, About, Contact) - Hidden once scrolled */}
          <nav
            className={`hidden md:flex items-center gap-8 pointer-events-auto transition-all duration-500 ${
              scrolled
                ? 'opacity-0 -translate-y-2 pointer-events-none'
                : 'opacity-100 translate-y-0'
            }`}
          >
            {heroLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-sm sm:text-base text-zinc-800 hover:text-black font-medium transition-colors select-none"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── TOP-RIGHT ROUND 48px HAMBURGER BUTTON (Fades in when scrolled / on mobile) ── */}
      <div
        className={`fixed top-5 right-6 sm:top-6 sm:right-8 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-90 pointer-events-none md:opacity-0 md:pointer-events-none max-md:opacity-100 max-md:pointer-events-auto'
        }`}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 rounded-full bg-[#111115]/90 hover:bg-[#18181f] text-white border border-white/15 flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-zinc-200" />}
        </button>
      </div>

      {/* ── BOTTOM-RIGHT ROUND 48px SCROLL-TO-TOP BUTTON (Positioned cleanly above FloatingChatbot) ── */}
      <div
        className={`fixed bottom-24 right-6 sm:bottom-24 sm:right-8 z-40 transition-all duration-500 ${
          scrolled
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-[#111115]/90 hover:bg-[#18181f] text-white border border-white/15 flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-5 h-5 text-zinc-300 group-hover:text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* ── FULL-SCREEN OVERLAY MENU ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08080a]/96 backdrop-blur-3xl flex flex-col justify-between p-8 sm:p-16 animate-fade-in overflow-y-auto">
          {/* Header row in modal */}
          <div className="flex items-center justify-between pt-2">
            <span className="font-sans font-semibold text-xs text-zinc-400 uppercase tracking-widest">
              NAVIGATION
            </span>
          </div>

          {/* Navigation Links list */}
          <nav className="my-auto py-12 flex flex-col space-y-5 sm:space-y-7 max-w-4xl">
            {allLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline justify-between py-2 border-b border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-sans font-semibold text-xs sm:text-sm text-[#5eead4] opacity-75">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white group-hover:text-[#5eead4] transition-colors">
                    {link.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block font-sans text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    {link.subtitle}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </a>
            ))}
          </nav>

          {/* Footer row with Get in touch & Location status */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs font-sans font-medium text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Located in India • Indore, MP</span>
            </div>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 font-display text-sm font-bold text-white hover:text-[#5eead4] transition-colors"
            >
              <span>Get In Touch ↘</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default StudioNav;
