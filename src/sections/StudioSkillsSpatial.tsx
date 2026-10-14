import React from 'react';
import {
  Layout,
  Workflow,
  Sparkles,
  LayoutDashboard,
  Orbit,
  Code2,
  ArrowUpRight,
} from 'lucide-react';
import { getSmoother } from '../components/utils/scrollSmoother';

interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  examples: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'ui-ux-websites',
    number: '01',
    title: 'UI/UX Design & Websites',
    description:
      'Modern, responsive websites, landing pages, portfolio websites, and SaaS interfaces with fluid layouts, clean typography, and intuitive user experiences.',
    examples: [
      'Responsive Web Platforms',
      'High-Conversion Landing Pages',
      'Portfolio & Brand Showcases',
      'SaaS Dashboard Layouts',
    ],
    icon: Layout,
  },
  {
    id: 'workflow-automation',
    number: '02',
    title: 'Workflow Automation',
    description:
      'Workflow automation, repetitive-task reduction, form-based workflows, notifications, and service integrations designed to streamline daily operations.',
    examples: [
      'Automated Notification Bots',
      'Form-to-Database Pipelines',
      'Service & Webhook Integrations',
      'Routine Task Automation',
    ],
    icon: Workflow,
  },
  {
    id: 'ai-powered-apps',
    number: '03',
    title: 'AI-Powered Applications',
    description:
      'AI-assisted web tools, contextual chatbots, productivity tools, document Q&A interfaces, and intelligent application concepts built with modern APIs.',
    examples: [
      'Document Q&A Knowledge Tools',
      'Context-Aware Conversational Bots',
      'AI-Assisted Productivity Utilities',
      'Smart Text & Data Extraction',
    ],
    icon: Sparkles,
  },
  {
    id: 'dashboards-web-apps',
    number: '04',
    title: 'Dashboards & Web Applications',
    description:
      'Interactive dashboards, admin panels, analytics interfaces, management systems, and data visualization tools designed for clear insight.',
    examples: [
      'Real-Time Analytics Dashboards',
      'Administrative Control Panels',
      'Custom Data Visualization Tools',
      'Management & Inventory Portals',
    ],
    icon: LayoutDashboard,
  },
  {
    id: 'interactive-web-experiences',
    number: '05',
    title: 'Interactive Web Experiences',
    description:
      'Creative cursor effects, interactive interfaces, scroll animations, 3D-inspired visuals, and immersive landing pages that captivate visitors.',
    examples: [
      'Liquid-Light & Cursor Physics',
      'Scroll-Driven Timelines',
      'Interactive Micro-Animations',
      '3D-Inspired Canvas Elements',
    ],
    icon: Orbit,
  },
  {
    id: 'custom-digital-solutions',
    number: '06',
    title: 'Custom Digital Solutions',
    description:
      'Custom web applications, MVP prototypes, API-integrated applications, and specialized tools tailored around specific requirements.',
    examples: [
      'End-to-End MVP Prototypes',
      'REST & Third-Party API Clients',
      'Specialized Engineering Utilities',
      'Tailored Business Web Tools',
    ],
    icon: Code2,
  },
];

export const StudioSkillsSpatial: React.FC = () => {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const smoother = getSmoother();
    if (smoother) {
      smoother.scrollTo('#contact', true);
    } else {
      const el = document.querySelector('#contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="what-can-i-build"
      className="relative py-28 sm:py-36 px-4 sm:px-8 overflow-hidden [perspective:1200px]"
    >
      {/* Backward-compatibility anchor for existing #skills links & FloatingChatbot quick actions */}
      <span
        id="skills"
        className="absolute -top-28 pointer-events-none opacity-0 select-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Marker */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-sans font-semibold text-xs uppercase tracking-widest text-[#5eead4]">
            03 // WHAT CAN I BUILD?
          </span>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Section Heading & Subtitle */}
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mb-3">
            What Can I Build?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            A practical overview of digital products, scalable web interfaces, workflow automations,
            and intelligent applications I can design, build, and deploy.
          </p>
        </div>

        {/* Six Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICE_CATEGORIES.map((category) => {
            const IconComponent = category.icon;

            return (
              <div
                key={category.id}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#0e0e12]/85 border border-white/10 hover:border-teal-500/30 transition-all duration-300 backdrop-blur-md flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.7),0_0_24px_rgba(94,234,212,0.08)] hover:-translate-y-1"
              >
                {/* Signature Corner Brackets ┌ ┐ └ ┘ */}
                <span className="absolute top-3 left-3 text-zinc-600 group-hover:text-teal-400/60 font-sans text-xs select-none pointer-events-none transition-colors">
                  ┌
                </span>
                <span className="absolute top-3 right-3 text-zinc-600 group-hover:text-teal-400/60 font-sans text-xs select-none pointer-events-none transition-colors">
                  ┐
                </span>
                <span className="absolute bottom-3 left-3 text-zinc-600 group-hover:text-teal-400/60 font-sans text-xs select-none pointer-events-none transition-colors">
                  └
                </span>
                <span className="absolute bottom-3 right-3 text-zinc-600 group-hover:text-teal-400/60 font-sans text-xs select-none pointer-events-none transition-colors">
                  ┘
                </span>

                {/* Card Top: Number Index + Icon Badge */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-sans font-semibold text-xs text-[#5eead4] tracking-wider">
                      // {category.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 flex items-center justify-center group-hover:bg-teal-500/20 group-hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-5 h-5 text-[#5eead4]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-tight mb-2.5 group-hover:text-teal-100 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Card Bottom: Practical Examples */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  <span className="text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-wider block">
                    Practical Examples
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.examples.map((example, eIdx) => (
                      <span
                        key={eIdx}
                        className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-[11px] font-sans font-medium text-zinc-300 group-hover:border-white/20 transition-colors"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Call-To-Action Banner */}
        <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-teal-500/[0.08] via-zinc-900/80 to-emerald-500/[0.08] border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
          <div className="space-y-1.5">
            <h4 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
              Have an idea? Let’s build it together.
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl leading-relaxed">
              Whether you need a custom web application, an automated workflow, or an intelligent interface, feel free to reach out and start a conversation.
            </p>
          </div>

          <button
            type="button"
            onClick={handleContactClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500/15 hover:bg-teal-500/25 text-[#5eead4] hover:text-white border border-teal-500/30 hover:border-teal-400/50 text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(94,234,212,0.15)] hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Let’s Collaborate</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Aliases for clean naming and full drop-in backwards compatibility
export const StudioWhatCanIBuild: React.FC = StudioSkillsSpatial;
export default StudioSkillsSpatial;
