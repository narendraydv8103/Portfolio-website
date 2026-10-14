import { useState, useEffect } from 'react';
import { LoadingProvider } from './context/LoadingProvider';
import { Navbar } from './components/Navbar';
import BackToTop from './components/BackToTop';
import Landing from './components/Landing';
import Character from './components/Character';
import ErrorBoundary from './components/ErrorBoundary';
import { StudioAbout } from './sections/StudioAbout';
import { StudioWhatICanBuild } from './sections/StudioWhatICanBuild';
import { StudioSkillsSpatial } from './sections/StudioSkillsSpatial';
import { StudioProjectsJourney } from './sections/StudioProjectsJourney';
import { StudioJourney } from './sections/StudioJourney';
import { StudioContact } from './sections/StudioContact';
import { FloatingChatbot } from './components/FloatingChatbot';

import { getSmoother } from './components/utils/scrollSmoother';

export function App() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth > 1024 : true
  );

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const smoother = getSmoother();
    if (smoother) {
      smoother.scrollTo('#about', true);
    } else {
      const el = document.querySelector('#about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopView(window.innerWidth > 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <LoadingProvider>
      <div className="container-main text-[#eae5ec] relative selection:bg-teal-500/30 selection:text-teal-200 overflow-x-clip font-sans">
        <Navbar />
        <BackToTop />

        {/* Desktop Fixed Avatar Canvas (z-index: 60, above marquee z-index: 50) */}
        <ErrorBoundary fallback={null}>
          {isDesktopView && <Character />}
        </ErrorBoundary>

        {/* Desktop Fixed "WHAT I DO" Section (z-index: 65, revealed in tl2, exits in tl3) */}
        {isDesktopView && <StudioWhatICanBuild isDesktop={true} />}

        {/* Smooth wrapper for GSAP ScrollSmoother */}
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {/* Landing Hero Section: contains avatar canvas on mobile (<=1024px) */}
            <Landing>
              <ErrorBoundary fallback={null}>
                {!isDesktopView && <Character />}
              </ErrorBoundary>
            </Landing>

            {/* Hero Right-Side Introductory Content (Studio Lead) */}
            <div
              className="studio-lead hero-right-container"
              style={{ minHeight: '100vh', height: '100vh' }}
            >
              <div className="hero-right-content about-me">
                <h2 className="hero-right-heading">
                  Building digital experiences with code and intelligence.
                </h2>
                <p className="hero-right-sub">
                  I’m a developer passionate about building useful web experiences, exploring AI-powered solutions, and turning creative ideas into real-world projects.
                </p>
                <div className="about-circle-btn-wrap">
                  <button
                    type="button"
                    className="about-circle-btn"
                    aria-label="About me"
                    onClick={handleAboutClick}
                  >
                    <span>ABOUT ME</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Studio hold spacer / What I Do section (125vh) for tl3 */}
            <div className="studio-hold" id="what" style={{ height: '125vh' }}>
              {!isDesktopView && <StudioWhatICanBuild isDesktop={false} />}
            </div>

            {/* Neeraj's About section & rest of portfolio */}
            <StudioAbout />
            <StudioSkillsSpatial />
            <StudioProjectsJourney
              onProjectChange={(idx) => setActiveProjectIndex(idx)}
              activeProjectIndex={activeProjectIndex}
            />
            <StudioJourney />
            <StudioContact />
          </div>
        </div>

        {/* Floating Neeraj AI Chatbot */}
        <FloatingChatbot />
      </div>
    </LoadingProvider>
  );
}

export default App;
