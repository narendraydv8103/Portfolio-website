import React, { useState } from 'react';
import { Cpu, Terminal, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface SpatialNode {
  id: string;
  name: string;
  cluster: 'core' | 'exploring';
  tag: string;
  appliedIn: string;
  description: string;
  x: number; // percentage in coordinate canvas
  y: number;
}

const SPATIAL_NODES: SpatialNode[] = [
  // 1. CORE DISCIPLINARY FOUNDATIONS
  {
    id: 'cpp',
    name: 'C++',
    cluster: 'core',
    tag: 'Core Discipline',
    appliedIn: 'Algorithmic Problem Solving & System Architecture',
    description: 'Object-Oriented Programming, STL containers, deterministic memory management, and efficient low-level software fundamentals.',
    x: 20,
    y: 26,
  },
  {
    id: 'python',
    name: 'Python',
    cluster: 'core',
    tag: 'Core Discipline',
    appliedIn: 'Scripting, Automation & AI Workflows',
    description: 'Rapid tool development, data processing, async automation pipelines, and machine learning model integration.',
    x: 38,
    y: 20,
  },
  {
    id: 'oop',
    name: 'OOP',
    cluster: 'core',
    tag: 'Core Discipline',
    appliedIn: 'Clean Software Engineering Architecture',
    description: 'Structured Object-Oriented Programming: encapsulation, modular abstraction, inheritance, polymorphism, and reusable class hierarchies.',
    x: 18,
    y: 48,
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    cluster: 'core',
    tag: 'Core Discipline',
    appliedIn: 'Algorithms, Data Structures & Logic',
    description: 'Systematic algorithmic analysis, time-space complexity optimization, structured debugging, and foundational problem resolution.',
    x: 32,
    y: 42,
  },
  {
    id: 'software-fundamentals',
    name: 'Software Development Fundamentals',
    cluster: 'core',
    tag: 'Core Discipline',
    appliedIn: 'Reliable & Maintainable Codebases',
    description: 'Core software design principles, version control workflows, clean code practices, and structured project engineering.',
    x: 26,
    y: 64,
  },

  // 2. CURRENTLY EXPLORING
  {
    id: 'react',
    name: 'React',
    cluster: 'exploring',
    tag: 'Currently Exploring',
    appliedIn: 'Interactive Frontend Interfaces & Dashboards',
    description: 'Component lifecycles, state management, reactive user flows, and modern client-side architectures.',
    x: 68,
    y: 22,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    cluster: 'exploring',
    tag: 'Currently Exploring',
    appliedIn: 'Type-Safe Web Application Development',
    description: 'Static type verification, interfaces, typed contracts across frontend components, and robust code refactoring.',
    x: 82,
    y: 34,
  },
  {
    id: 'ai-ml',
    name: 'AI/ML',
    cluster: 'exploring',
    tag: 'Currently Exploring',
    appliedIn: 'Applied AI Pipelines & Practical Intelligent Systems',
    description: 'Machine learning fundamentals, model integration, applied AI agents, and intelligent data analysis.',
    x: 62,
    y: 44,
  },
  {
    id: 'automation',
    name: 'Automation',
    cluster: 'exploring',
    tag: 'Currently Exploring',
    appliedIn: 'Workflow Scripting & Developer Bots',
    description: 'Building automated developer scripts, repetitive process pipelines, and intelligent software utilities.',
    x: 78,
    y: 56,
  },
  {
    id: 'modern-web',
    name: 'Modern Web Development',
    cluster: 'exploring',
    tag: 'Currently Exploring',
    appliedIn: 'Responsive, Performant & Dynamic Web Applications',
    description: 'Modern CSS design systems, WebGL rendering, mobile responsiveness, fast web experiences, and accessible UI.',
    x: 65,
    y: 72,
  },
  {
    id: 'software-dev',
    name: 'Software Development',
    cluster: 'exploring',
    tag: 'Currently Exploring',
    appliedIn: 'Practical Project Building & Real Products',
    description: 'Bridging engineering logic with real-world user needs to construct practical, reliable, and functional products.',
    x: 80,
    y: 78,
  },
];

const CLUSTER_METAS = [
  { id: 'all', label: 'All Disciplines', color: '#eae5ec' },
  { id: 'core', label: 'Core Disciplines', color: '#10b981', icon: Terminal },
  { id: 'exploring', label: 'Currently Exploring', color: '#5eead4', icon: Sparkles },
];

export const StudioSkillsSpatial: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [activeNode, setActiveNode] = useState<SpatialNode>(SPATIAL_NODES[0]);

  const filteredNodes =
    selectedCluster === 'all'
      ? SPATIAL_NODES
      : SPATIAL_NODES.filter((n) => n.cluster === selectedCluster);

  return (
    <section id="skills" className="relative py-28 sm:py-36 px-4 sm:px-8 overflow-hidden [perspective:1200px]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-sans font-semibold text-xs uppercase tracking-widest text-zinc-400">
            03 // SPATIAL TECHNICAL CONSTELLATION
          </span>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Header & Filter Cluster Switcher */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
          <div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mb-3">
              Spatial Technology Constellation
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-sans">
              An interactive map of core engineering foundations, applied AI pipelines, and creative technology. Hover any node to inspect architectural telemetry.
            </p>
          </div>

          {/* Cluster Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {CLUSTER_METAS.map((c) => {
              const isActive = selectedCluster === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCluster(c.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 flex items-center gap-2 border ${
                    isActive
                      ? 'bg-zinc-800 text-white border-white/30 shadow-lg scale-105'
                      : 'bg-zinc-900/60 text-zinc-400 border-white/10 hover:text-zinc-200 hover:border-white/20'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Layout: Left is Spatial Interactive Node Canvas, Right is HUD Telemetry Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Spatial Node Map (Interactive Canvas) */}
          <div className="lg:col-span-8 relative min-h-[460px] sm:min-h-[520px] rounded-3xl bg-zinc-950/70 border border-white/10 p-6 sm:p-8 overflow-hidden backdrop-blur-md shadow-2xl">
            {/* Ambient Background Grid & Radial Glow */}
            <div className="absolute inset-0 bg-dots-pattern opacity-40 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

            {/* Corner Bracket Markings */}
            <div className="absolute top-4 left-4 text-xs font-sans font-medium text-zinc-600">[+] LAT 22.71° N</div>
            <div className="absolute top-4 right-4 text-xs font-sans font-medium text-zinc-600">SYS_TOPOLOGY [+]</div>
            <div className="absolute bottom-4 left-4 text-xs font-sans font-medium text-zinc-600">[+] ACTIVE_NODES: {filteredNodes.length}</div>
            <div className="absolute bottom-4 right-4 text-xs font-sans font-medium text-zinc-600">IPS_ACADEMY '27 [+]</div>

            {/* Connecting SVG Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25">
              <line x1="22%" y1="28%" x2="36%" y2="18%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="22%" y1="28%" x2="28%" y2="42%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="28%" y1="42%" x2="15%" y2="48%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="72%" y1="22%" x2="82%" y2="38%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="72%" y1="22%" x2="64%" y2="42%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="26%" y1="74%" x2="40%" y2="82%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="26%" y1="74%" x2="18%" y2="86%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="74%" y1="72%" x2="84%" y2="84%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Render Nodes */}
            <div className="relative z-10 w-full h-full min-h-[400px]">
              {filteredNodes.map((node) => {
                const isSelected = activeNode.id === node.id;
                const clusterColor = node.cluster === 'core' ? '#10b981' : '#5eead4';

                return (
                  <div
                    key={node.id}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    onClick={() => setActiveNode(node)}
                    onMouseEnter={() => setActiveNode(node)}
                  >
                    {/* Pulsing Aura if selected */}
                    {isSelected && (
                      <span
                        className="absolute inset-0 -m-3 rounded-full animate-ping opacity-35"
                        style={{ backgroundColor: clusterColor }}
                      />
                    )}

                    {/* Node Capsule */}
                    <div
                      className={`px-3 py-1.5 rounded-full border transition-all duration-300 flex items-center gap-2 backdrop-blur-md shadow-lg ${
                        isSelected
                          ? 'bg-zinc-800 text-white scale-110 shadow-2xl'
                          : 'bg-zinc-900/90 text-zinc-300 hover:text-white hover:scale-105'
                      }`}
                      style={{
                        borderColor: isSelected ? clusterColor : 'rgba(255,255,255,0.12)',
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: clusterColor }}
                      />
                      <span className="text-xs font-sans font-semibold whitespace-nowrap">
                        {node.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Node HUD Inspector */}
          <div className="lg:col-span-4 rounded-3xl bg-zinc-900/80 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-zinc-400">
                  DISCIPLINE TELEMETRY
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-sans font-semibold text-zinc-300">
                {activeNode.cluster === 'core' ? 'CORE' : 'EXPLORING'}
              </span>
            </div>

            <div>
              <span className="text-xs font-sans font-medium text-zinc-500 uppercase block mb-1">
                {activeNode.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                {activeNode.name}
              </h3>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-sans font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{activeNode.cluster === 'core' ? 'Core Foundation' : 'Active Learning & Building'}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
              {activeNode.description}
            </p>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-2">
              <span className="text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-wider block">
                APPLIED IN REAL PROJECTS
              </span>
              <div className="flex items-center gap-2 text-xs font-sans font-medium text-zinc-200">
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                <span>{activeNode.appliedIn}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] font-sans font-medium text-zinc-500 flex items-center justify-between border-t border-white/5">
              <span>SYSTEM DISCIPLINE</span>
              <span className="text-zinc-300">INDORE • 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
