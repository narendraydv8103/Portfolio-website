import React from 'react';
import Character from '../components/Character';
import NameMarquee from '../components/NameMarquee';
import '../components/styles/Landing.css';

interface StudioHeroProps {
  onOpenAssistant?: () => void;
}

export const StudioHero: React.FC<StudioHeroProps> = () => {
  return (
    <section
      id="home"
      className="landing-section relative min-h-[100svh] h-[100svh] w-full flex flex-col justify-between select-none text-zinc-950 overflow-visible"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* 1. LEFT PINNED LOCATION CARD */}
      <div className="location-card" id="heroLocationCard">
        <div className="location-text">
          <span>Located</span>
          <span>in</span>
          <span className="font-bold text-white tracking-wide">India</span>
        </div>
        <div className="location-globe">
          <div className="digital-ball">
            <div className="overlay" />
            <div className="globe">
              <div className="globe-wrap">
                <div className="circle" />
                <div className="circle" />
                <div className="circle" />
                <div className="circle-hor" />
                <div className="circle-hor-middle" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP RIGHT EDITORIAL: DESIGNER & DEVELOPER (Exact Reference Match) */}
      <div className="landing-container" id="heroLandingContainer">
        <div className="landing-info pointer-events-auto">
          <div className="landing-arrow select-none leading-none opacity-85">
            ↘
          </div>
          <h2 className="landing-desc font-sans text-base sm:text-lg text-zinc-800 font-normal leading-snug">
            <span className="block">Designer &amp;</span>
            <span className="block">Developer</span>
          </h2>
        </div>
      </div>

      {/* 3. CENTER 3D CHARACTER SCENE (Front-Facing Bust -> Laptop Rise -> Seated Work) */}
      <Character />

      {/* 4. GIANT ARCHITECTURAL CONTINUOUS NAME MARQUEE (Behind 3D Avatar) */}
      <NameMarquee />
    </section>
  );
};

export default StudioHero;
