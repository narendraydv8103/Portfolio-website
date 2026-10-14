import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Mic,
  Flame,
  Bot,
  DollarSign,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { portfolioData, type Project } from '../data/portfolioData';
import { StudioProjectModal } from '../components/StudioProjectModal';

interface StudioProjectsJourneyProps {
  onProjectChange?: (index: number) => void;
  activeProjectIndex?: number;
}

export const StudioProjectsJourney: React.FC<StudioProjectsJourneyProps> = ({
  onProjectChange,
  activeProjectIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(activeProjectIndex);
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  // KAVACH interactive state
  const [triageScanned, setTriageScanned] = useState(false);
  const [activeEvidenceNode, setActiveEvidenceNode] = useState('NODE_01_IP_ORIGIN');

  // Voice AI interactive state
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [voiceTurn, setVoiceTurn] = useState<'listening' | 'speaking' | 'interrupted'>('listening');

  // BillShield interactive state
  const [disputeGenerated, setDisputeGenerated] = useState(false);

  const projects = portfolioData.projects;
  const currentProject = projects[currentIndex];

  const handleSelect = (idx: number) => {
    setCurrentIndex(idx);
    if (onProjectChange) {
      onProjectChange(idx);
    }
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + projects.length) % projects.length;
    handleSelect(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % projects.length;
    handleSelect(nextIdx);
  };

  const triggerInterruptionDemo = () => {
    setVoiceTurn('speaking');
    setTimeout(() => {
      setIsInterrupted(true);
      setVoiceTurn('interrupted');
      setTimeout(() => {
        setIsInterrupted(false);
        setVoiceTurn('listening');
      }, 2000);
    }, 1200);
  };

  return (
    <section
      id="projects"
      className="relative py-28 sm:py-36 px-4 sm:px-8 overflow-hidden [perspective:1200px]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading Tag */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <span className="font-sans font-semibold text-xs uppercase tracking-widest text-zinc-400">
              04 // SELECTED CINEMATIC WORK
            </span>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>

          <span className="font-sans font-semibold text-xs text-zinc-400">
            {currentProject.number} / 05
          </span>
        </div>

        {/* Centered Headline matching Reference Video Frame 00:22 */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight">
            My <span className="text-[#5eead4] drop-shadow-[0_0_30px_rgba(94,234,212,0.45)]">Work</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#5eead4] to-transparent mt-4" />
        </div>

        {/* Quick Project Tabs Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {projects.map((proj, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelect(idx)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-zinc-800 text-white border-white/30 shadow-lg scale-105'
                    : 'bg-zinc-900/60 text-zinc-400 border-white/10 hover:text-zinc-200'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: proj.accentColor }}
                />
                <span className="font-bold">{proj.number}</span>
                <span>{proj.title.split('/')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* CINEMATIC PROJECT SHOWCASE CONTAINER */}
        <div className="relative rounded-3xl bg-zinc-950/80 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Ambient Corner Accent Lighting */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[110px] opacity-20 pointer-events-none transition-colors duration-700"
            style={{ backgroundColor: currentProject.accentColor }}
          />

          {/* 2-Column Showcase Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            {/* Left Column: Project Editorial & Architectural Telemetry */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-sans font-semibold px-2.5 py-1 rounded-md border"
                  style={{
                    backgroundColor: `${currentProject.accentColor}15`,
                    borderColor: `${currentProject.accentColor}35`,
                    color: currentProject.accentColor,
                  }}
                >
                  {currentProject.interactiveData.badge}
                </span>
                <span className="text-xs font-sans font-medium text-zinc-400">
                  {currentProject.category}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-2">
                  {currentProject.title}
                </h3>
                <p className="text-sm font-sans font-medium text-zinc-300">
                  {currentProject.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                {currentProject.description}
              </p>

              {/* Real Architectural Specs Grid */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10">
                {currentProject.interactiveData.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-zinc-900/70 border border-white/5">
                    <span className="text-[9px] font-sans font-semibold text-zinc-400 uppercase block">
                      {m.label}
                    </span>
                    <span className="text-xs sm:text-sm font-display font-bold text-white block mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-zinc-400 block">
                  SYSTEM CAPABILITIES
                </span>
                <ul className="space-y-1.5">
                  {currentProject.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: currentProject.accentColor }}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {currentProject.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-[10px] font-sans font-medium text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => setSelectedModalProject(currentProject)}
                  className="px-5 py-2.5 rounded-full bg-white text-zinc-950 font-medium text-xs hover:bg-zinc-200 transition-all shadow-md flex items-center gap-1.5"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect System Architecture</span>
                </button>
              </div>
            </div>

            {/* Right Column: BESPOKE INTERACTIVE LIVE SIMULATOR VIEWPORT */}
            <div className="lg:col-span-7 rounded-2xl bg-zinc-900/90 border border-white/10 p-5 sm:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden">
              {/* Corner crosshairs */}
              <div className="absolute top-3 left-3 text-[10px] font-sans font-medium text-zinc-600">[+]</div>
              <div className="absolute top-3 right-3 text-[10px] font-sans font-medium text-zinc-600">[+]</div>

              {/* 1. KAVACH SIMULATOR */}
              {currentProject.id === 'kavach' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-sans font-semibold text-emerald-300">
                        INCIDENT TRIAGE CONSOLE // GOLDEN-HOUR ACTIVE
                      </span>
                    </div>
                    <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      LIVE GRAPH
                    </span>
                  </div>

                  {/* Interactive Evidence Node Graph Canvas Simulation */}
                  <div className="relative h-56 rounded-xl bg-black/60 border border-white/10 p-4 overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] font-sans font-medium text-zinc-400">
                      <span>ORIGIN_VECTOR: 192.168.1.104</span>
                      <span className="text-emerald-400">SHA-256: 8f9b4c2...e1a</span>
                    </div>

                    {/* Nodes Visual */}
                    <div className="grid grid-cols-3 gap-3 my-auto">
                      {[
                        { id: 'NODE_01_IP_ORIGIN', label: 'Compromised IP', ip: '192.168.1.104', risk: 'CRITICAL' },
                        { id: 'NODE_02_AUTH_LOG', label: 'Auth Pipeline', ip: '10.0.4.82', risk: 'SUSPICIOUS' },
                        { id: 'NODE_03_DATA_VAULT', label: 'Exfiltration Port', ip: 'Port 8443', risk: 'ISOLATED' },
                      ].map((node) => {
                        const isNodeActive = activeEvidenceNode === node.id;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setActiveEvidenceNode(node.id)}
                            className={`p-3 rounded-lg text-left transition-all border ${
                              isNodeActive
                                ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg'
                                : 'bg-zinc-900/60 border-white/5 hover:border-white/20'
                            }`}
                          >
                            <span className="text-[10px] font-sans font-medium text-zinc-400 block">{node.label}</span>
                            <span className="text-xs font-sans font-bold text-white block mt-0.5">{node.ip}</span>
                            <span className="text-[9px] font-sans font-semibold text-emerald-400 block mt-1">{node.risk}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-sans font-medium text-zinc-500">
                      <span>CHRONOLOGY: T+00:14:32</span>
                      <span className="text-emerald-400">24 EVIDENCE NODES LINKED</span>
                    </div>
                  </div>

                  {/* Incident Triage Action Button */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setTriageScanned(!triageScanned)}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-semibold transition-colors flex items-center gap-2"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>{triageScanned ? 'Triage Hash Verified ✓' : 'Run Golden-Hour Scan'}</span>
                    </button>

                    <span className="text-[11px] font-sans font-medium text-zinc-400">
                      Active Target: {activeEvidenceNode}
                    </span>
                  </div>
                </div>
              )}

              {/* 2. VOICE AI SIMULATOR */}
              {currentProject.id === 'voice-ai' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-sans font-semibold text-purple-300">
                        VOICEFORGE STREAM // INTERRUPTION-RESILIENT VAD
                      </span>
                    </div>
                    <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      SPEECH PIPELINE
                    </span>
                  </div>

                  {/* Simulated Waveform & Audio Spectrum */}
                  <div className="relative h-56 rounded-xl bg-black/60 border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] font-sans font-medium text-zinc-400">
                      <span>BUFFER LATENCY: 65ms</span>
                      <span className={voiceTurn === 'interrupted' ? 'text-amber-400 font-bold' : 'text-purple-400'}>
                        STATE: {voiceTurn.toUpperCase()}
                      </span>
                    </div>

                    {/* Dynamic waveform bars */}
                    <div className="flex items-center justify-center gap-1.5 h-24 my-auto">
                      {[35, 60, 85, 45, 95, 75, 40, 90, 65, 80, 50, 70, 95, 30, 85, 60, 40].map((h, bIdx) => (
                        <div
                          key={bIdx}
                          style={{
                            height: voiceTurn === 'interrupted' ? '8px' : `${h}%`,
                            backgroundColor: voiceTurn === 'interrupted' ? '#f59e0b' : '#c084fc',
                          }}
                          className="w-2.5 rounded-full transition-all duration-150"
                        />
                      ))}
                    </div>

                    {/* Honest wording banner */}
                    <div className="p-2 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
                      <p className="text-[11px] font-sans font-medium text-zinc-300">
                        <span className="text-purple-400 font-semibold">Honest Architecture:</span> Interruption-Resilient turn-taking. Instant playback cutoff upon user vocal trigger.
                      </p>
                    </div>
                  </div>

                  {/* Interruption Demo Trigger */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={triggerInterruptionDemo}
                      className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-sans text-xs font-semibold transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Simulate User Interruption</span>
                    </button>

                    <span className="text-[11px] font-sans font-medium text-zinc-400">
                      {isInterrupted ? 'Vocal Interruption Registered (65ms Cutoff)' : 'Listening for Voice Activity'}
                    </span>
                  </div>
                </div>
              )}

              {/* 3. EMBERHOLD SIMULATOR */}
              {currentProject.id === 'emberhold' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-sans font-semibold text-amber-300">
                        EMBERHOLD GUILD CHRONICLE // DISCIPLINE FORGE
                      </span>
                    </div>
                    <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      GUILD TIER II
                    </span>
                  </div>

                  {/* Dark-Fantasy Dungeon Log & Relics */}
                  <div className="relative h-56 rounded-xl bg-[#14120f] border border-amber-900/40 p-4 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] font-sans font-medium text-amber-200">
                      <span>HERO: NEERAJ THE SCHOLAR</span>
                      <span>DISCIPLINE: 8.95 CGPA</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 my-auto">
                      <div className="p-3 rounded-xl bg-zinc-950/80 border border-amber-500/20">
                        <span className="text-[10px] font-sans font-semibold text-amber-400 uppercase block">ACTIVE QUEST</span>
                        <span className="text-xs font-display font-bold text-white block mt-0.5">The Algorithmic Spire</span>
                        <span className="text-[10px] text-zinc-400 block mt-1">C++ Rigor &amp; Competitive DSA</span>
                      </div>

                      <div className="p-3 rounded-xl bg-zinc-950/80 border border-amber-500/20">
                        <span className="text-[10px] font-sans font-semibold text-amber-400 uppercase block">EQUIPPED RELIC</span>
                        <span className="text-xs font-display font-bold text-white block mt-0.5">Tome of Circuits &amp; Logic</span>
                        <span className="text-[10px] text-zinc-400 block mt-1">Electrical &amp; Electronics Core</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-sans font-medium text-zinc-400 border-t border-amber-900/30 pt-2">
                      <span>GUILD STATUS: ACADEMIC TOPPER</span>
                      <span className="text-amber-400">14 RELICS UNLOCKED</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-xs font-sans font-medium text-amber-300">
                      <span>Life RPG System: Habit mastery through epic worldbuilding</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. RPM SIMULATOR */}
              {currentProject.id === 'rpm' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-teal-400" />
                      <span className="text-xs font-sans font-semibold text-teal-300">
                        RPM ASSISTANT CORE // SPATIAL HUD
                      </span>
                    </div>
                    <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                      SPATIAL VOICE
                    </span>
                  </div>

                  {/* Neural Assistant HUD */}
                  <div className="relative h-56 rounded-xl bg-black/60 border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] font-sans font-medium text-zinc-400">
                      <span>AMBIENT LISTENER: ACTIVE</span>
                      <span className="text-teal-400">ACCURACY: HIGH PRECISION</span>
                    </div>

                    <div className="my-auto space-y-2 p-3 rounded-xl bg-zinc-950/80 border border-teal-500/20">
                      <div className="flex items-center gap-2 text-xs font-sans font-medium text-teal-300">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Recent Query: "Dispatch system unit tests and inspect memory leaks"</span>
                      </div>
                      <div className="text-[11px] font-sans font-medium text-zinc-400 pl-5">
                        ➜ Intent parsed: <span className="text-white">DEV_AUTOMATION_EXEC</span> (Confidence: 98.6%)
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-sans font-medium text-zinc-500">
                      <span>SPATIAL AUDIO DRIVER: READY</span>
                      <span className="text-teal-400">MODULAR TOOLS LOADED</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-sans font-medium text-zinc-400">
                      Hands-free developer automation with contextual dialogue memory
                    </span>
                  </div>
                </div>
              )}

              {/* 5. BILLSHIELD SIMULATOR */}
              {currentProject.id === 'billshield' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-sans font-semibold text-cyan-300">
                        BILLSHIELD AUDIT // SURCHARGE RADAR
                      </span>
                    </div>
                    <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      FINTECH DEFENSE
                    </span>
                  </div>

                  {/* Itemized Dissection & Anomaly Flags */}
                  <div className="relative h-56 rounded-xl bg-black/60 border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] font-sans font-medium text-zinc-400">
                      <span>SCANNED: ENTERPRISE UTILITY BILL</span>
                      <span className="text-amber-400 font-bold">2 ANOMALIES DETECTED</span>
                    </div>

                    <div className="space-y-2 my-auto">
                      <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-sans font-medium text-white block">Cloud Storage Tier Alpha</span>
                          <span className="text-[10px] font-sans font-medium text-zinc-500">Normal billing baseline</span>
                        </div>
                        <span className="text-xs font-sans font-semibold text-zinc-300">$42.00</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/40 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <AlertTriangle className="w-3 h-3 text-red-400" />
                            <span className="text-xs font-sans text-white font-semibold">Hidden Inactive Maintenance Fee</span>
                          </div>
                          <span className="text-[10px] font-sans font-medium text-red-400">Flagged: Uncontracted charge</span>
                        </div>
                        <span className="text-xs font-sans text-red-400 font-bold">+$18.50</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-sans font-medium text-zinc-500">
                      <span>RISK SCORE: ELEVATED (74%)</span>
                      <span className="text-cyan-400">ZERO RETENTION VAULT</span>
                    </div>
                  </div>

                  {/* Dispute Letter Generator */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setDisputeGenerated(!disputeGenerated)}
                      className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-sans text-xs font-semibold transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{disputeGenerated ? 'Dispute Letter Drafted ✓' : 'Generate Dispute Draft'}</span>
                    </button>

                    <span className="text-[11px] font-sans font-medium text-zinc-400">
                      Automated line-item surcharge detection
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dot Indicators & Next/Prev Controls matching Reference Frame 00:23 */}
        <div className="flex items-center justify-center gap-6 pt-10 pb-4">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-all hover:scale-105"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-[#5eead4] w-8 shadow-[0_0_12px_#5eead4]' : 'bg-zinc-700 w-2.5 hover:bg-zinc-500'
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-all hover:scale-105"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Circular "MORE WORK" Button matching Reference Frame 00:24-00:25 */}
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setSelectedModalProject(currentProject)}
            className="w-32 h-32 rounded-full bg-zinc-950 border border-white/15 text-white font-display font-bold text-xs uppercase tracking-widest hover:scale-105 hover:border-[#5eead4] hover:text-[#5eead4] transition-all shadow-2xl flex flex-col items-center justify-center gap-1 group"
          >
            <span>MORE</span>
            <span>WORK</span>
          </button>
        </div>
      </div>

      {/* Full Deep-Dive Architecture Modal */}
      {selectedModalProject && (
        <StudioProjectModal
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
        />
      )}
    </section>
  );
};
