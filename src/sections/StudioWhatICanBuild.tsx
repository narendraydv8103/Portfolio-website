import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StudioWhatICanBuildProps {
  isDesktop?: boolean;
}

export const StudioWhatICanBuild: React.FC<StudioWhatICanBuildProps> = ({ isDesktop = true }) => {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
  });

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const services = [
    {
      id: 'web-development',
      titleLine1: 'WEB',
      titleLine2: 'DEVELOPMENT',
      subtitle: 'Modern & Scalable Web Applications',
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
      titleLine2: 'SOLUTIONS',
      subtitle: 'Leveraging AI for Business Impact',
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
    const isExpanded = !!expandedCards[idx];

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
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-[1.1] mb-1">
            {service.titleLine1}
            {service.titleLine2 && (
              <>
                {' '}
                <span className="block sm:inline">{service.titleLine2}</span>
              </>
            )}
          </h3>

          <p className="text-[11px] sm:text-xs font-sans font-medium text-zinc-400 uppercase tracking-wider mb-3">
            {service.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Expandable Skills / Tools Section */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-sans font-medium text-zinc-400 uppercase tracking-wider">
              {service.skillsetTitle}
            </span>
            <button
              type="button"
              onClick={() => toggleCard(idx)}
              className="w-7 h-7 rounded-lg border border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
              aria-label={isExpanded ? 'Collapse tools' : 'Expand tools'}
            >
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {isExpanded && (
            <div className="flex flex-wrap gap-1.5 pt-3 animate-fade-in">
              {service.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-sans font-medium text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
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
          <h2 className="font-display font-black text-5xl sm:text-6xl text-white uppercase tracking-tight leading-[0.95]">
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
    <div className="what-i-do-desktop pointer-events-none fixed inset-0 z-[65] flex items-center justify-between px-6 sm:px-10 lg:px-14 xl:px-16 select-none">
      {/* Left side: Bold Section Heading */}
      <div className="what-i-do-left pointer-events-auto flex flex-col justify-center max-w-[280px] lg:max-w-[340px]">
        <h2 className="what-i-do-heading font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tighter text-white uppercase leading-[0.92]">
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
