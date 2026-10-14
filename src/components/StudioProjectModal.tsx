import React, { useState } from 'react';
import { X, Layers, Cpu, ShieldCheck, CheckCircle2, Terminal } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface StudioProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const StudioProjectModal: React.FC<StudioProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'features' | 'telemetry'>('architecture');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-[#101014] border border-white/15 p-6 sm:p-10 shadow-2xl text-left space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-12">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-sans font-bold px-3 py-1 rounded-md border"
              style={{
                backgroundColor: `${project.accentColor}15`,
                borderColor: `${project.accentColor}35`,
                color: project.accentColor,
              }}
            >
              {project.interactiveData.badge}
            </span>
            <span className="text-xs font-sans font-medium text-zinc-400">
              {project.category}
            </span>
            {project.statusTag && (
              <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                {project.statusTag}
              </span>
            )}
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-sans font-medium text-zinc-400">
              Project {project.number} of 05
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm font-sans font-medium text-zinc-300">
            {project.tagline}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          {[
            { id: 'architecture', label: 'Architecture & Engineering', icon: Layers },
            { id: 'features', label: 'Key Capabilities', icon: ShieldCheck },
            { id: 'telemetry', label: 'Telemetry & Verification', icon: Cpu },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-sans font-medium transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-zinc-800 text-white border-white/20 shadow-md'
                    : 'bg-transparent text-zinc-400 border-transparent hover:text-zinc-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: isActive ? project.accentColor : undefined }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-sans font-medium text-zinc-400">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>SYSTEM ARCHITECTURE SUMMARY</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {project.architecture}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                <span className="text-[10px] font-sans font-semibold text-zinc-400 uppercase block">CORE DOMAIN CHALLENGE</span>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                <span className="text-[10px] font-sans font-semibold text-zinc-400 uppercase block">ENGINEERING PRINCIPLES</span>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  Engineered with strict algorithmic discipline, modular isolation of concerns, and verifiable data integrity standards.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Features */}
        {activeTab === 'features' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 flex items-start gap-3">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: project.accentColor }}
                  />
                  <span className="text-xs text-zinc-200 font-sans leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-sans font-medium text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Telemetry */}
        {activeTab === 'telemetry' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {project.interactiveData.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 text-center">
                  <span className="text-[10px] font-sans font-semibold text-zinc-400 uppercase block">{m.label}</span>
                  <span className="text-lg sm:text-xl font-display font-bold text-white block mt-1">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2.5">
              <span className="text-xs font-sans font-semibold text-zinc-400 block mb-1 uppercase tracking-wider">
                ACTIVE TELEMETRY CHANNELS
              </span>
              {project.interactiveData.detailItems.map((item, dIdx) => (
                <div key={dIdx} className="flex items-center gap-2 text-xs font-sans font-medium text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans font-medium text-zinc-400">
          <span>PORTFOLIO '26 • NARENDRA SINGH YADAV</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
