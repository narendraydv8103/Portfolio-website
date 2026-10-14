import React from 'react';
import { MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const StudioLaptopScene: React.FC = () => {
  return (
    <section
      id="studio"
      className="relative w-full h-[250svh] bg-transparent z-10 pointer-events-none"
    >
      {/* 100svh sticky viewport container holding ONLY the photo card on the right half */}
      <div id="studioPhotoCardSticky" className="sticky top-0 left-0 w-full h-[100svh] min-h-[100svh] flex items-center justify-end px-6 sm:px-12 lg:px-20 pointer-events-none overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-end">
          {/* Right half: Personal Photo Card */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end pointer-events-auto">
            <div
              id="studioPhotoCard"
              className="studio-photo-card relative w-full max-w-[340px] sm:max-w-[380px] rounded-3xl overflow-hidden border border-white/15 bg-zinc-900/80 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-transform duration-500 will-change-transform"
              style={{ opacity: 0, transform: 'translateY(60px) scale(0.95)' }}
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-950 relative">
                <img
                  src="/images/neeraj.jpg"
                  alt="Narendra Singh Yadav (Neeraj)"
                  className="w-full h-full object-cover object-top select-none"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

                {/* Overlaid Pill Badges & Credentials */}
                <div className="absolute bottom-5 left-5 right-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-display font-bold text-lg sm:text-xl tracking-tight">
                      {portfolioData.profile.displayName}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#5eead4]/20 border border-[#5eead4]/40 text-[#5eead4] font-sans text-xs font-bold shadow-sm">
                      8.95 CGPA
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-300 font-sans text-xs sm:text-sm">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">IPS Academy, Indore • 1st Position Topper</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioLaptopScene;
