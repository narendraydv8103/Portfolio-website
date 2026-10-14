import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Mic,
  Flame,
  DollarSign,
  CheckCircle2,
  Sparkles,
  Maximize2,
  Eye
} from 'lucide-react';
import { portfolioData, type Project } from '../data/portfolioData';
import { StudioProjectModal } from '../components/StudioProjectModal';

interface ProjectFlowStep {
  number: string;
  phase: string;
  tag: string;
  title: string;
  description: string;
}

interface ProjectFlowData {
  engineName: string;
  statusBadge: string;
  guarantee: string;
  icon: React.ElementType;
  screenshotUrl?: string;
  screenshotCaption?: string;
  steps: ProjectFlowStep[];
}

const projectFlows: Record<string, ProjectFlowData> = {
  portfolio: {
    engineName: 'PORTFOLIO RUNTIME // SPATIAL ARCHITECTURE',
    statusBadge: 'IN DEVELOPMENT',
    guarantee: 'Real-time Three.js WebGL & Lenis Scroll Physics',
    icon: Sparkles,
    steps: [
      {
        number: '01',
        phase: 'INPUT',
        tag: 'Spatial Controls',
        title: 'Scroll Velocity & Viewport Tracking',
        description: 'Monitors visitor scroll progress, pointer velocity, and tab selections to coordinate dynamic 3D transitions without layout shifts.',
      },
      {
        number: '02',
        phase: 'PROCESSING',
        tag: 'WebGL Engine',
        title: 'Three.js Geometry & GSAP Choreography',
        description: 'Procedurally renders 3D geometric artifacts, dynamic point lighting, and smooth camera panning synchronized with page scrolling.',
      },
      {
        number: '03',
        phase: 'OUTPUT',
        tag: 'Telemetry HUD',
        title: 'Architectural Specs & On-Site Assistant',
        description: 'Renders verified project telemetry, interactive system inspector modals, and an on-site portfolio assistant with instant knowledge lookup.',
      },
    ],
  },
  kavach: {
    engineName: 'KAVACH ENGINE // AIR-GAPPED EVIDENCE TRIAGE',
    statusBadge: '100% OFFLINE',
    guarantee: 'SHA-256 Custody Ledger & CGNAT False-Link Protection',
    icon: Shield,
    screenshotUrl: '/images/projects/kavach_fraud_graph.png',
    screenshotCaption: 'Verified NetworkX Directional Fraud Graph (Correlating Multi-Source Evidence to Mule Accounts)',
    steps: [
      {
        number: '01',
        phase: 'INPUT',
        tag: 'Multi-Source Data',
        title: 'Fragmented Digital Artifact Ingestion',
        description: 'Ingests telecom CDRs, ISP IPDR sessions, Bank/UPI ledgers, phishing emails, and APK metadata on a 100% offline workstation.',
      },
      {
        number: '02',
        phase: 'PROCESSING',
        tag: 'Graph Intelligence',
        title: 'Entity Resolution & Fraud Correlator',
        description: 'Standardizes numbers to E.164, hashes files in a sequential SHA-256 custody chain, and maps fund flows using NetworkX.',
      },
      {
        number: '03',
        phase: 'OUTPUT',
        tag: 'Statutory Dossier',
        title: 'Explainable Risk Scores & Police Brief',
        description: 'Ranks high-velocity accounts for Section 91/102 CrPC notices and compiles standalone bilingual vector PDF dossiers with cryptographic QR seals.',
      },
    ],
  },
  'voice-ai': {
    engineName: 'VOICEFORGE ENGINE // DUPLEX SPEECH RUNTIME',
    statusBadge: 'SUB-25MS RESILIENT',
    guarantee: 'Monotonic Generation Ticket Fencing & Synchronous Audio Halt',
    icon: Mic,
    steps: [
      {
        number: '01',
        phase: 'INPUT',
        tag: 'Voice Stream',
        title: 'Microphone Capture & Active VAD',
        description: 'Continuously monitors operator audio via browser Web Audio API, processing voice activity detection without cloud streaming lag.',
      },
      {
        number: '02',
        phase: 'PROCESSING',
        tag: 'Ticket Fencing',
        title: 'Instant Audio Halt (<25ms) & AbortSignal',
        description: 'Synchronously pauses audio, revokes blob buffers, increments generation tickets (#N → #N+1), and aborts pending network calls.',
      },
      {
        number: '03',
        phase: 'OUTPUT',
        tag: 'Collision-Free Voice',
        title: 'Fenced Neural Speech & Live HUD Metrics',
        description: 'Synthesizes clear speech with Rime AI and Groq LLM only if the ticket is active; streams live latency metrics to the HUD.',
      },
    ],
  },
  emberhold: {
    engineName: 'EMBERHOLD ENGINE // SERVER-VALIDATED PROGRESSION',
    statusBadge: 'GUILD TIER II',
    guarantee: 'Supabase PostgreSQL RLS & Pure Web Audio Synthesizer',
    icon: Flame,
    screenshotUrl: '/images/projects/emberhold_guild_hall.jpg',
    screenshotCaption: 'Atmospheric Guild Hall & Dark-Fantasy Progression Interface',
    steps: [
      {
        number: '01',
        phase: 'INPUT',
        tag: 'Habit Inscription',
        title: 'Guild Quests & Daily Rites',
        description: 'Transforms real-world study and habits into quests categorized across 5 attributes (Strength, Intellect, Endurance, Charisma, Spirit).',
      },
      {
        number: '02',
        phase: 'PROCESSING',
        tag: 'Progression Math',
        title: 'Server-Side Scaling & Streak Multipliers',
        description: 'Validates completions on the server with exponential formulas: round(70 × L^1.55) and awards up to +70% bonus multipliers.',
      },
      {
        number: '03',
        phase: 'OUTPUT',
        tag: 'Reward Economy',
        title: 'Guild Rank Ascension & Tactile Audio',
        description: 'Ascends players through 7 guild ranks, unlocks equipment in the Vault, and synthesizes browser-native Web Audio fanfares.',
      },
    ],
  },
  billshield: {
    engineName: 'BILLSHIELD ENGINE // STATUTORY REGULATORY AUDIT',
    statusBadge: '37 STATUTORY CHECKS',
    guarantee: 'Codified IRDAI, GST Council & CGHS Tariffs (Transparent Math)',
    icon: DollarSign,
    steps: [
      {
        number: '01',
        phase: 'INPUT',
        tag: 'Bill Ingestion',
        title: 'Multi-Format Document Parsing (PDF / Images)',
        description: 'PyMuPDF coordinate parsing extracts line items, quantities, rates, and Indian currency notations with exact bounding box provenance.',
      },
      {
        number: '02',
        phase: 'PROCESSING',
        tag: 'Statutory Engine',
        title: 'Deterministic Compliance & Math Verification',
        description: 'Verifies line-by-line arithmetic, flags duplicate tests, checks GST exemption notifications, and detects improper ICU unbundling.',
      },
      {
        number: '03',
        phase: 'OUTPUT',
        tag: 'Dispute Dossier',
        title: 'Structured Findings & Formal Dispute Letter',
        description: 'Separates verified math errors from non-payable consumables and generates formal, printable dispute letters citing official government circulars.',
      },
    ],
  },
};

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
  const [explainerView, setExplainerView] = useState<'pipeline' | 'screenshot'>('pipeline');

  /* ========================================================================= */
  /* FALLBACK INTERACTIVE STATE (PRESERVED FOR EASY REVERT)                    */
  /* ========================================================================= */
  /*
  const [triageScanned, setTriageScanned] = useState(false);
  const [activeEvidenceNode, setActiveEvidenceNode] = useState('NODE_01_IP_ORIGIN');
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [voiceTurn, setVoiceTurn] = useState<'listening' | 'speaking' | 'interrupted'>('listening');
  const [disputeGenerated, setDisputeGenerated] = useState(false);
  */

  const projects = portfolioData.projects;
  const currentProject = projects[currentIndex];

  const get3DIndex = (projId: string): number => {
    switch (projId) {
      case 'kavach': return 0;
      case 'voice-ai': return 1;
      case 'emberhold': return 2;
      case 'billshield': return 4;
      case 'portfolio':
      default:
        return 3; // Spatial rings & neural core sphere in cyan/teal (#5eead4)
    }
  };

  const handleSelect = (idx: number) => {
    setCurrentIndex(idx);
    if (onProjectChange && projects[idx]) {
      onProjectChange(get3DIndex(projects[idx].id));
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

  // Reset view to pipeline on project change
  useEffect(() => {
    setExplainerView('pipeline');
  }, [currentIndex]);

  // Synchronize 3D world on initial mount
  useEffect(() => {
    if (onProjectChange && projects[currentIndex]) {
      onProjectChange(get3DIndex(projects[currentIndex].id));
    }
  }, []);

  /*
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
  */

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
                {currentProject.statusTag && (
                  <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                    {currentProject.statusTag}
                  </span>
                )}
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

            {/* Right Column: BESPOKE HONEST HOW-IT-WORKS ARCHITECTURAL VIEWPORT */}
            <div className="lg:col-span-7 rounded-2xl bg-zinc-900/90 border border-white/10 p-5 sm:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden">
              {/* Corner crosshairs */}
              <div className="absolute top-3 left-3 text-[10px] font-sans font-medium text-zinc-600">[+]</div>
              <div className="absolute top-3 right-3 text-[10px] font-sans font-medium text-zinc-600">[+]</div>

              {/* Active Project Explainer Flow */}
              {(() => {
                const activeFlow = projectFlows[currentProject.id] || projectFlows.portfolio;
                const FlowIcon = activeFlow.icon;

                return (
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <FlowIcon className="w-4 h-4" style={{ color: currentProject.accentColor }} />
                        <span
                          className="text-xs font-sans font-semibold tracking-wider uppercase"
                          style={{ color: currentProject.accentColor }}
                        >
                          {activeFlow.engineName}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {activeFlow.screenshotUrl && (
                          <div className="flex items-center p-0.5 rounded-lg bg-zinc-950 border border-white/10">
                            <button
                              onClick={() => setExplainerView('pipeline')}
                              className={`px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-all ${
                                explainerView === 'pipeline'
                                  ? 'bg-zinc-800 text-white shadow'
                                  : 'text-zinc-400 hover:text-white'
                              }`}
                            >
                              Step Flow
                            </button>
                            <button
                              onClick={() => setExplainerView('screenshot')}
                              className={`px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-all flex items-center gap-1 ${
                                explainerView === 'screenshot'
                                  ? 'bg-zinc-800 text-white shadow'
                                  : 'text-zinc-400 hover:text-white'
                              }`}
                            >
                              <Eye className="w-3 h-3" />
                              <span>Preview</span>
                            </button>
                          </div>
                        )}
                        <span
                          className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded border"
                          style={{
                            backgroundColor: `${currentProject.accentColor}15`,
                            borderColor: `${currentProject.accentColor}30`,
                            color: currentProject.accentColor,
                          }}
                        >
                          {activeFlow.statusBadge}
                        </span>
                      </div>
                    </div>

                    {/* Viewport Content */}
                    {explainerView === 'pipeline' ? (
                      <div className="space-y-2.5">
                        {activeFlow.steps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-3 sm:p-3.5 rounded-xl bg-black/60 border border-white/5 hover:border-white/15 transition-all"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span
                                className="text-[10px] font-sans font-semibold tracking-wider uppercase"
                                style={{ color: currentProject.accentColor }}
                              >
                                STEP {step.number} // {step.phase}
                              </span>
                              <span className="text-[9px] font-sans px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">
                                {step.tag}
                              </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-sans font-bold text-white mb-0.5">
                              {step.title}
                            </h4>
                            <p className="text-[11px] sm:text-xs font-sans text-zinc-400 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/80 max-h-64 flex items-center justify-center p-2">
                          <img
                            src={activeFlow.screenshotUrl}
                            alt={activeFlow.screenshotCaption || currentProject.title}
                            className="w-full h-auto max-h-60 object-contain rounded-lg"
                          />
                        </div>
                        {activeFlow.screenshotCaption && (
                          <p className="text-[11px] font-sans text-zinc-400 text-center italic">
                            {activeFlow.screenshotCaption}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Bottom Bar: Architectural Guarantee */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-sans text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: currentProject.accentColor }}
                        />
                        <span className="text-[11px] sm:text-xs text-zinc-300">
                          {activeFlow.guarantee}
                        </span>
                      </div>
                      <span className="text-[10px] font-sans text-zinc-400 uppercase hidden sm:inline">
                        HONEST ENGINEERING FLOW
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* ========================================================================= */}
              {/* FALLBACK: ORIGINAL SIMULATED DEMO VIEWPORT (PRESERVED FOR EASY REVERT)   */}
              {/* ========================================================================= */}
              {/*
              // 1. KAVACH SIMULATOR
              currentProject.id === 'kavach' && (
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

                  <div className="relative h-56 rounded-xl bg-black/60 border border-white/10 p-4 overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] font-sans font-medium text-zinc-400">
                      <span>ORIGIN_VECTOR: 192.168.1.104</span>
                      <span className="text-emerald-400">SHA-256: 8f9b4c2...e1a</span>
                    </div>

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
              )

              // 2. VOICE AI SIMULATOR
              currentProject.id === 'voice-ai' && (
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

                  <div className="relative h-56 rounded-xl bg-black/60 border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] font-sans font-medium text-zinc-400">
                      <span>BUFFER LATENCY: 65ms</span>
                      <span className={voiceTurn === 'interrupted' ? 'text-amber-400 font-bold' : 'text-purple-400'}>
                        STATE: {voiceTurn.toUpperCase()}
                      </span>
                    </div>

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

                    <div className="p-2 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
                      <p className="text-[11px] font-sans font-medium text-zinc-300">
                        <span className="text-purple-400 font-semibold">Honest Architecture:</span> Interruption-Resilient turn-taking. Instant playback cutoff upon user vocal trigger.
                      </p>
                    </div>
                  </div>

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
              )

              // 3. EMBERHOLD SIMULATOR
              currentProject.id === 'emberhold' && (
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
              )

              // 4. BILLSHIELD SIMULATOR
              currentProject.id === 'billshield' && (
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
              )
              */}
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
