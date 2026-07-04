import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  MapPin, 
  Sparkles, 
  ArrowDown, 
  Mail, 
  Github, 
  Linkedin, 
  Grid, 
  Calendar, 
  Award, 
  Layers, 
  Clock, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  Volume2,
  VolumeX,
  BookOpen
} from 'lucide-react';

import { 
  NEXUS_AI, 
  OTHER_PROJECTS, 
  EXPERIENCE, 
  EDUCATION, 
  PROCESS_STEPS, 
  SECTIONS 
} from './data';
import { CursorMode } from './types';

// Components
import SplitText from './components/SplitText';
import FlowingMenu from './components/FlowingMenu';
import GlareHover from './components/GlareHover';
import OpeningExperience from './components/OpeningExperience';
import SketchbookModal from './components/SketchbookModal';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import DeskMode from './components/DeskMode';

// Audio Synthesizer Controls
import {
  playPaperFlip,
  playPencilScratch,
  playStampClack,
  playSwitchClick,
  toggleSound,
  startHum,
  stopHum
} from './utils/audio';

export default function App() {
  // State for Opening Experience & Easter Eggs
  const [showOpening, setShowOpening] = useState(true);
  const [showSketchbook, setShowSketchbook] = useState(false);
  const [altTheme, setAltTheme] = useState(false);
  const [gridOverlay, setGridOverlay] = useState(true);
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
  const [unlockedSecret, setUnlockedSecret] = useState(false);

  // View Mode: 'JOURNAL' (default print/design notebook) or 'DESK' (interactive desk scene)
  const [viewMode, setViewMode] = useState<'JOURNAL' | 'DESK'>('JOURNAL');
  const [soundOn, setSoundOn] = useState(true);
  const [activeProjIdx, setActiveProjIdx] = useState(0);

  // Time & Clock
  const [currentTime, setCurrentTime] = useState<string>('12:34:36 UTC');

  // Contact form simulated state (as per magnetic / visual requirements)
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [emailText, setEmailText] = useState('');

  // Mouse / Cursor States
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('DEFAULT');

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('hero');

  // Konami keys
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Handle Opening Experience setting (plays on every refresh for design review)
  const handleOpeningComplete = () => {
    setShowOpening(false);
  };

  // Clock ticks
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Print in UTC for standard catalog aesthetic
      const timeStr = now.toUTCString().replace('GMT', 'UTC');
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard Shortcuts (B, G, S, and Konami Code)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      // Skip shortcuts if user is typing in the message field
      if (document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'INPUT') {
        return;
      }

      // 'B' to toggle alternate theme
      if (key === 'B' || key === 'b') {
        setAltTheme(prev => !prev);
        playSwitchClick();
      }

      // 'G' to toggle grid overlay
      if (key === 'G' || key === 'g') {
        setGridOverlay(prev => !prev);
        playPaperFlip();
      }

      // 'S' to toggle sound
      if (key === 'S' || key === 's') {
        setSoundOn(prev => {
          const next = !prev;
          toggleSound(next);
          return next;
        });
        playSwitchClick();
      }

      // Konami tracker
      setKonamiProgress(prev => {
        const next = [...prev, key];
        if (next.length > konamiCode.length) {
          next.shift();
        }
        
        // Verify code
        const codeMatches = next.every((val, index) => val.toLowerCase() === konamiCode[index].toLowerCase());
        if (codeMatches && next.length === konamiCode.length) {
          setUnlockedSecret(true);
          playStampClack();
          // Auto fade secret after 4s
          setTimeout(() => setUnlockedSecret(false), 4000);
          return [];
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  // Track cursor position on desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Set cursor context triggers
  const triggerCursorMode = (mode: CursorMode) => {
    setCursorMode(mode);
  };

  // Simulated messaging / mailto flow
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    playPencilScratch();

    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      playStampClack();
      // Trigger mailto immediately after simulated visual success
      window.location.href = `mailto:vikaspokkuluri@gmail.com?body=${encodeURIComponent(emailText)}`;
      
      setTimeout(() => {
        setSendSuccess(false);
        setEmailText('');
      }, 5000);
    }, 1500);
  };

  // Convert Menu Tabs to Scroll targets
  const navMenuItems = SECTIONS.map(section => ({
    text: section.name,
    link: `#${section.id}`
  }));

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    playPaperFlip();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (viewMode === 'DESK') {
    return (
      <DeskMode 
        onSwitchView={() => {
          playPaperFlip();
          setViewMode('JOURNAL');
        }}
        altTheme={altTheme}
        setAltTheme={setAltTheme}
        gridOverlay={gridOverlay}
        setGridOverlay={setGridOverlay}
        currentTime={currentTime}
      />
    );
  }

  return (
    <div 
      className={`min-h-screen relative font-sans transition-colors duration-500 overflow-hidden ${altTheme ? 'alt-theme bg-[#D7E1D3]' : 'bg-[#EBDDC5]'}`}
      onDoubleClick={() => setShowSketchbook(true)}
    >
      {/* Paper Grain Overlay */}
      <div className="paper-grain opacity-[0.05] pointer-events-none fixed inset-0 mix-blend-multiply bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#2E4365]/5 to-[#2E4365]/10" />

      {/* Notebook Grid Overlay */}
      {gridOverlay && (
        <div className="fixed inset-0 pointer-events-none z-[1] notebook-grid-overlay opacity-30" />
      )}

      {/* Opening sequence */}
      <AnimatePresence>
        {showOpening && (
          <OpeningExperience onComplete={handleOpeningComplete} />
        )}
      </AnimatePresence>

      {/* Interactive Custom Cursor (Desktop Only) */}
      {cursorVisible && (
        <div 
          className="hidden md:flex fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 items-center justify-center mix-blend-difference transition-transform duration-75"
          style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
        >
          {cursorMode === 'DEFAULT' ? (
            <div className="w-4 h-4 rounded-full bg-white border border-[#2E4365]" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[#E5902C] border-2 border-white flex items-center justify-center text-[8px] text-white font-mono scale-110 shadow-md">
                ✎
              </div>
              <span className="mt-1 px-1.5 py-0.5 bg-black/80 text-white font-mono text-[9px] uppercase tracking-wider rounded-sm">
                {cursorMode}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Secret Verification Stamp (Konami Code Easter Egg) */}
      <AnimatePresence>
        {unlockedSecret && (
          <motion.div 
            initial={{ scale: 2, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: -12 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed top-1/4 left-1/4 z-[500] border-4 border-dashed border-[#8A3B08] px-6 py-4 bg-[#F5EBD8] text-[#8A3B08] font-mono text-center select-none"
            style={{ boxShadow: '8px 8px 0px rgba(138, 59, 8, 0.2)' }}
          >
            <div className="font-black text-2xl tracking-widest uppercase">CONFIDENTIAL</div>
            <div className="text-xs uppercase mt-1 tracking-wider border-t border-[#8A3B08] pt-1">
              VERIFIED PORTFOLIO ENGINE v9
            </div>
            <div className="text-[9px] text-[#2E4365] mt-1">17.6868° N, 83.2185° E</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sketchbook Overlay Easter Egg */}
      <AnimatePresence>
        {showSketchbook && (
          <SketchbookModal onClose={() => setShowSketchbook(false)} />
        )}
      </AnimatePresence>

      {/* HEADER BAR (Sticky Index Rail) */}
      <header className="sticky top-0 z-50 bg-[#EBDDC5]/90 alt-theme:bg-[#D7E1D3]/90 backdrop-blur-md border-b-2 border-[#2E4365] flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          {/* Handwritten monogram */}
          <div 
            className="font-hand text-3xl font-black text-[#2E4365] cursor-pointer hover:text-[#E5902C] transition-colors"
            onClick={() => handleTabClick('hero')}
          >
            Sukumar
          </div>
          <div className="hidden sm:flex items-center gap-2 border-l border-[#2E4365]/20 pl-3">
            <span className="w-2 h-2 rounded-full bg-[#E5902C] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#2E4365]/70">
              SDE AVAILABLE — 2026
            </span>
          </div>
        </div>

        {/* Floating index menu tabs fallback for responsive */}
        <nav className="flex items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs">
          <button 
            onClick={() => handleTabClick('nexus-ai')}
            className={`px-2 py-1 border border-transparent rounded-sm hover:border-[#2E4365] transition-all uppercase ${activeTab === 'nexus-ai' ? 'bg-[#2E4365] text-[#EBDDC5]' : 'text-[#2E4365]'}`}
          >
            Centerpiece
          </button>
          <button 
            onClick={() => handleTabClick('other-projects')}
            className={`px-2 py-1 border border-transparent rounded-sm hover:border-[#2E4365] transition-all uppercase ${activeTab === 'other-projects' ? 'bg-[#2E4365] text-[#EBDDC5]' : 'text-[#2E4365]'}`}
          >
            Spreads
          </button>
          <button 
            onClick={() => handleTabClick('tech-stack')}
            className={`px-2 py-1 border border-transparent rounded-sm hover:border-[#2E4365] transition-all uppercase ${activeTab === 'tech-stack' ? 'bg-[#2E4365] text-[#EBDDC5]' : 'text-[#2E4365]'}`}
          >
            Toolbox
          </button>
          <button 
            onClick={() => handleTabClick('contact')}
            className="px-2 py-1 bg-[#E5902C] text-[#EBDDC5] font-bold rounded-sm border border-[#2E4365] hover:bg-[#8A3B08] hover:text-[#F3D58D] transition-all uppercase active:scale-95 cursor-pointer"
          >
            Message
          </button>
          
          <button 
            onClick={() => {
              playPaperFlip();
              setViewMode('DESK');
            }}
            className="px-2 py-1 bg-[#2E4365] text-[#F3D58D] font-bold rounded-sm border border-[#2E4365] hover:bg-[#8A3B08] transition-all uppercase active:scale-95 flex items-center gap-1 cursor-pointer"
            title="Switch to Interactive Desk Workspace"
          >
            <span>🪵 Desk Mode</span>
          </button>
        </nav>
      </header>

      {/* CORE PORTFOLIO CONTAINER (Editorial Layout) */}
      <main className="relative max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 flex flex-col gap-24 md:gap-36 z-10">

        {/* ================= HERO SECTION ================= */}
        <section 
          id="hero"
          className="relative min-h-[80vh] flex flex-col justify-between pt-8 border-b-2 border-dashed border-[#2E4365]/20 pb-16 overflow-visible"
          onMouseEnter={() => triggerCursorMode('EXPLORE')}
          onMouseLeave={() => triggerCursorMode('DEFAULT')}
        >
          {/* BACKGROUND LAYER 1: Parallax Margin / Coordinate Stamps */}
          <div className="absolute top-0 right-0 text-right select-none pointer-events-none z-0">
            <div className="font-mono text-[10px] text-[#8A3B08]">
              LOG: 17.6868° N, 83.2185° E
            </div>
            <div className="font-mono text-[9px] text-[#2E4365]/50 uppercase mt-1">
              Visakhapatnam Area • India
            </div>
          </div>

          {/* Left Binder Holes Simulation */}
          <div className="absolute left-[-2rem] top-0 bottom-0 w-8 flex flex-col justify-around pointer-events-none opacity-40 z-0">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-5 h-5 rounded-full bg-[#2E4365]/10 border border-[#2E4365]/20 shadow-inner" />
            ))}
          </div>

          {/* BACKGROUND LAYER 2: Scattered hand-sketched graphite vector annotations (SVG lines) */}
          <div className="absolute inset-0 pointer-events-none select-none z-10">
            <svg className="w-full h-full absolute inset-0 text-[#8A3B08]/40" fill="none" stroke="currentColor" strokeWidth="1.5">
              {/* Pointing arrow from subtext to stamp */}
              <path d="M 220 120 Q 180 80 150 110" strokeDasharray="3 3" />
              <path d="M 152 101 L 150 110 L 159 108" strokeWidth="2" />
              
              {/* Circular pencil loop surrounding the main title accent */}
              <path d="M 50 200 C 180 160, 320 180, 380 240 C 400 270, 310 290, 180 270 C 80 250, 40 210, 80 190" strokeWidth="1" strokeDasharray="2 4" />
              
              {/* Hand-sketched star near title */}
              <path d="M 520 80 L 525 92 L 537 92 L 527 100 L 531 112 L 520 104 L 509 112 L 513 100 L 503 92 L 515 92 Z" />
            </svg>
          </div>

          {/* LAYER 3: Core Typography & Stamp Elements */}
          <div className="max-w-4xl relative z-20">
            {/* Stamp-like tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3D58D] border-2 border-[#2E4365] text-[#2E4365] rounded-sm shadow-xs font-mono text-xs mb-8 rotate-[-1deg] hover:rotate-1 transition-transform cursor-pointer" onClick={playStampClack}>
              <Sparkles className="w-4 h-4 text-[#E5902C]" />
              <span>LOGGED // PORTFOLIO v9.0</span>
            </div>

            {/* Main title with subtle text drop-shadow to simulate embossed notebook print */}
            <h1 className="font-display font-black text-5xl md:text-8xl tracking-tight leading-none text-[#2E4365] mb-6 select-none" style={{ textShadow: '2px 2px 0px rgba(46,67,101,0.06)' }}>
              SUKUMAR <br />
              <span className="text-[#E5902C]">POKKULURI</span>
            </h1>

            {/* Handwritten note next to name */}
            <div className="absolute right-4 md:right-32 top-1/3 rotate-12 pointer-events-none select-none">
              <span className="font-hand text-3xl md:text-4xl text-[#8A3B08]">est. 2026</span>
              <div className="w-16 h-1 bg-[#8A3B08]/20 rotate-[-12deg] -mt-1" />
            </div>

            {/* Sub-headings */}
            <div className="max-w-2xl mt-8">
              <p className="font-sans font-bold text-xl md:text-3xl text-[#2E4365] leading-snug">
                Full stack developer.
                <br />
                <span className="text-[#8A3B08]">Building products, not projects.</span>
              </p>
              <p className="font-sans text-base text-[#2E4365]/70 mt-4 max-w-xl leading-relaxed">
                Focused on pristine code layouts, intuitive product architecture, and durable cloud engineering. Still learning, building, and breaking software daily.
              </p>
            </div>
          </div>

          {/* LAYER 4: The Pinned "Creative Direction / Metaphor" Sticky Note */}
          <div className="mt-10 lg:absolute lg:top-2/3 lg:right-0 max-w-sm bg-[#F5EBD8] border-2 border-[#2E4365] p-5 rounded-xs shadow-card rotate-[-2deg] hover:rotate-0 transition-transform duration-300 z-20" onMouseEnter={playPencilScratch}>
            {/* Visual masking tape pinning it on top */}
            <div className="absolute top-[-9px] left-1/3 w-28 h-4.5 bg-yellow-100/70 border border-yellow-200/50 rotate-[-2deg] pointer-events-none shadow-xs" />
            <span className="font-mono text-[9px] text-[#8A3B08] font-bold block mb-1.5 uppercase tracking-widest">// CREATIVE DIRECTION BRIEF</span>
            <p className="font-sans text-[11px] text-[#2E4365]/90 leading-relaxed italic">
              "This portfolio must not resemble a dashboard or standard SDE template. It is a physical design journal documenting an engineering journey. Every interaction reinforces the illusion of turning pages, discovering notes, and exploring tactile artifacts."
            </p>
          </div>

          {/* Hero Bottom Marginalia */}
          <div className="mt-16 pt-8 border-t border-[#2E4365]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-20">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#E5902C]" />
              <span className="font-mono text-xs text-[#2E4365]/80 uppercase">
                Visakhapatnam, Andhra Pradesh, IN
              </span>
            </div>

            {/* Available flag with custom masking tape design */}
            <div className="relative bg-[#F3D58D] border border-[#2E4365] px-4 py-2 rotate-[-1.5deg] shadow-xs hover:rotate-0 transition-all cursor-pointer" onClick={playPaperFlip}>
              {/* Masking tape on top-left */}
              <div className="absolute top-[-8px] left-[-15px] w-12 h-4 bg-yellow-100/60 border border-yellow-200/50 rotate-[-12deg] pointer-events-none" />
              
              <span className="font-mono text-xs font-bold text-[#2E4365] uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                AVAILABLE FOR SDE ROLES — 2026
              </span>
            </div>
          </div>

          {/* Physical page number stamp */}
          <div className="absolute bottom-0 right-0 font-mono text-[9px] text-[#2E4365]/40 select-none pointer-events-none uppercase tracking-widest mt-4">
            Page 01 // Notebook Cover • July 2026 Entry
          </div>
        </section>


        {/* ================= CENTERPIECE: NEXUS AI EXPERIENCE ================= */}
        <section 
          id="nexus-ai"
          className="relative py-12 border-b-2 border-dashed border-[#2E4365]/20 pb-20"
          onMouseEnter={() => triggerCursorMode('VIEW')}
          onMouseLeave={() => triggerCursorMode('DEFAULT')}
        >
          {/* Section Heading */}
          <div className="mb-12">
            <span className="font-eyebrow text-xs tracking-widest text-[#8A3B08] uppercase block mb-2">
              [ THE FEATURED CENTERPIECE ]
            </span>
            <SplitText 
              text="NEXUS AI EXPERIENCE" 
              tag="h2" 
              className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-[#2E4365]"
              textAlign="left"
            />
            <div className="font-mono text-xs text-[#2E4365]/50 mt-1">
              WORKSPACE INTEGRATION // v0.4 (IN PROGRESS)
            </div>
          </div>

          {/* Multi-Part Magazine Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Overview & Core Columns (Left side) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Problem vs Solution Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Problem */}
                <div className="bg-[#8A3B08]/5 border-l-4 border-[#8A3B08] p-6 rounded-sm">
                  <span className="font-mono text-xs font-bold text-[#8A3B08] uppercase block mb-2">
                    01 // THE PROBLEM
                  </span>
                  <p className="font-sans text-sm text-[#2E4365] leading-relaxed">
                    {NEXUS_AI.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="bg-[#E5902C]/5 border-l-4 border-[#E5902C] p-6 rounded-sm">
                  <span className="font-mono text-xs font-bold text-[#E5902C] uppercase block mb-2">
                    02 // THE SOLUTION
                  </span>
                  <p className="font-sans text-sm text-[#2E4365] leading-relaxed">
                    {NEXUS_AI.solution}
                  </p>
                </div>
              </div>

              {/* Core Features list */}
              <div className="bg-[#F5EBD8] border border-[#2E4365] p-6 md:p-8 rounded-sm shadow-card">
                <h3 className="font-display font-bold text-lg text-[#2E4365] uppercase tracking-tight mb-4 border-b border-[#2E4365]/20 pb-2">
                  KEY SYSTEMS & FEATURES
                </h3>
                <ul className="flex flex-col gap-3">
                  {NEXUS_AI.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="font-mono text-[#E5902C] text-xs mt-0.5 font-black">[✓]</span>
                      <span className="font-sans text-sm text-[#2E4365] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Challenges & Lessons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 border border-[#2E4365]/30 rounded-sm">
                  <h4 className="font-mono text-xs font-bold text-[#8A3B08] uppercase tracking-wider mb-2">
                    DEV CHALLENGES
                  </h4>
                  <p className="font-hand text-base text-[#2E4365] leading-snug">
                    {NEXUS_AI.challenges}
                  </p>
                </div>

                <div className="p-5 border border-[#2E4365]/30 rounded-sm">
                  <h4 className="font-mono text-xs font-bold text-[#E5902C] uppercase tracking-wider mb-2">
                    LESSONS EXTRACTED
                  </h4>
                  <p className="font-hand text-base text-[#2E4365] leading-snug">
                    {NEXUS_AI.lessonsLearned}
                  </p>
                </div>
              </div>

            </div>

            {/* Architecture Flow & Tech stack (Right side) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Architecture diagram widget */}
              <div onMouseEnter={() => triggerCursorMode('DRAW')} onMouseLeave={() => triggerCursorMode('VIEW')}>
                <ArchitectureDiagram nodes={NEXUS_AI.architecture} />
              </div>

              {/* Tech stack badge list */}
              <div className="bg-[#F5EBD8] border border-[#2E4365] p-5 rounded-sm shadow-xs">
                <span className="font-mono text-[10px] text-[#8A3B08] tracking-widest uppercase block mb-3">
                  [ COMPILED STACK ]
                </span>
                <div className="flex flex-wrap gap-2">
                  {NEXUS_AI.tech.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 bg-[#EBDDC5] text-[#2E4365] border border-[#2E4365]/30 font-mono text-[10px] rounded-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Physical page number stamp */}
          <div className="absolute bottom-0 right-0 font-mono text-[9px] text-[#2E4365]/40 select-none pointer-events-none uppercase tracking-widest mt-4">
            Page 02 // Nexus AI Centerpiece • July 2026 Entry
          </div>
        </section>


        {/* ================= EDITORIAL SPREADS: OTHER PROJECTS ================= */}
        <section 
          id="other-projects"
          className="relative py-12 border-b-2 border-dashed border-[#2E4365]/20 pb-20 overflow-visible"
          onMouseEnter={() => triggerCursorMode('EXPLORE')}
          onMouseLeave={() => triggerCursorMode('DEFAULT')}
        >
          {/* Section Heading */}
          <div className="mb-8">
            <span className="font-eyebrow text-xs tracking-widest text-[#8A3B08] uppercase block mb-2">
              [ DIRECTORY TABS ]
            </span>
            <SplitText 
              text="PROJECT SPREADS" 
              tag="h2" 
              className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-[#2E4365]"
              textAlign="left"
            />
            <div className="font-mono text-xs text-[#2E4365]/50 mt-1">
              CLICK THE PAPER INDEX TABS TO FLIP OR BROWSE SPREADS
            </div>
          </div>

          {/* DUAL PAGE BINDER LAYOUT WITH SIDE TABS */}
          <div className="relative grid grid-cols-1 xl:grid-cols-12 gap-0 items-start mt-10">
            
            {/* PHYSICAL INDEX TABS (Aligned on the left or top on mobile, acts like dividers) */}
            <div className="xl:col-span-2 flex xl:flex-col gap-2 xl:gap-3 mb-6 xl:mb-0 xl:pr-4 z-20 overflow-x-auto xl:overflow-x-visible pb-3 xl:pb-0 scrollbar-none">
              {OTHER_PROJECTS.map((proj, idx) => {
                const isActive = idx === activeProjIdx;
                // Soft vintage colors for tabs
                const colors = [
                  { bg: 'bg-[#C2D3CD]', border: 'border-[#4A6B5D]', text: 'text-[#23382F]' },
                  { bg: 'bg-[#E3CBB5]', border: 'border-[#8C5D35]', text: 'text-[#4F3017]' },
                  { bg: 'bg-[#D6C5DB]', border: 'border-[#6A4775]', text: 'text-[#3E2347]' },
                  { bg: 'bg-[#C5D5E6]', border: 'border-[#426485]', text: 'text-[#1F364D]' }
                ];
                const themeColor = colors[idx % colors.length];

                return (
                  <button
                    key={proj.id}
                    onClick={() => {
                      playPaperFlip();
                      setActiveProjIdx(idx);
                    }}
                    className={`flex-shrink-0 text-left px-4 py-3 border-2 rounded-sm font-mono text-[11px] font-bold tracking-tight uppercase transition-all duration-300 relative group cursor-pointer ${
                      isActive 
                        ? `${themeColor.bg} ${themeColor.border} ${themeColor.text} translate-x-1 xl:translate-x-3 shadow-md`
                        : 'bg-[#EBDDC5]/60 border-[#2E4365]/40 text-[#2E4365]/70 hover:bg-[#F5EBD8] hover:text-[#2E4365]'
                    }`}
                    style={{
                      boxShadow: isActive ? '3px 3px 0px rgba(46,67,101,0.15)' : 'none'
                    }}
                  >
                    {/* Folder index tab shape sticking out */}
                    <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#2E4365]/20 rounded-l-xs group-hover:bg-[#E5902C]/40 hidden xl:block" />
                    <span className="block text-[9px] opacity-60">TAB // 0{idx + 1}</span>
                    <span className="block truncate max-w-[130px] xl:max-w-none">{proj.title}</span>
                  </button>
                );
              })}
            </div>

            {/* OPEN JOURNAL DUAL-PAGE CONTAINER */}
            <div className="xl:col-span-10 relative bg-[#F5EBD8] border-2 border-[#2E4365] rounded-sm p-4 md:p-8 xl:p-10 shadow-card overflow-hidden">
              
              {/* Notebook Binder Rings (Central Spiral) - Desktop Only */}
              <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 hidden xl:flex flex-col justify-around pointer-events-none z-30 opacity-60">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex items-center justify-center gap-1">
                    {/* Metal wire loop */}
                    <div className="w-6 h-2 rounded-full border-2 border-[#2E4365] bg-[#EBDDC5] shadow-xs" />
                  </div>
                ))}
              </div>

              {/* Central Divider Shadow Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l border-dashed border-[#2E4365]/10 -translate-x-1/2 hidden xl:block z-20 pointer-events-none" />

              {/* RENDER ACTIVE PROJECT SPREAD (Animated page flip) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProjIdx}
                  initial={{ opacity: 0, rotateY: -15, scale: 0.98 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 15, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-14 items-start relative z-10"
                >
                  
                  {/* LEFT PAGE: Visual Catalog Ref & Architecture Blueprints */}
                  <div className="flex flex-col gap-6 xl:pr-6">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs text-[#E5902C] font-black tracking-widest block mb-1">
                          SPREAD // 0{activeProjIdx + 1}
                        </span>
                        <span className="font-mono text-[9px] px-2 py-0.5 bg-[#2E4365]/10 text-[#2E4365] rounded-sm uppercase font-bold">
                          YEAR // {OTHER_PROJECTS[activeProjIdx].year}
                        </span>
                      </div>
                      <h3 className="font-display font-black text-2xl md:text-3xl text-[#2E4365] uppercase leading-none tracking-tight">
                        {OTHER_PROJECTS[activeProjIdx].title}
                      </h3>
                      <p className="font-sans text-xs text-[#2E4365]/60 mt-1.5 italic">
                        Technical layout & logical data bindings
                      </p>
                    </div>

                    {/* Hand-drawn vector sketch box surrounding architecture */}
                    <div 
                      className="border border-[#2E4365]/20 p-4 rounded-sm bg-[#EBDDC5]/20 relative group overflow-hidden"
                      onMouseEnter={() => triggerCursorMode('DRAW')} 
                      onMouseLeave={() => triggerCursorMode('EXPLORE')}
                    >
                      {/* Pencil bracket decoration */}
                      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#8A3B08]/40" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#8A3B08]/40" />
                      
                      <ArchitectureDiagram nodes={OTHER_PROJECTS[activeProjIdx].architecture} />
                      <div className="text-center font-mono text-[9px] text-[#2E4365]/40 mt-3 select-none uppercase">
                        Fig // 0{activeProjIdx + 1}. System Node Topology
                      </div>
                    </div>

                    <div className="p-4 bg-[#EBDDC5]/30 border border-dashed border-[#2E4365]/20 rounded-sm">
                      <span className="font-mono text-[10px] text-[#8A3B08] font-bold block mb-1">NOTES // FIELD DISPATCH:</span>
                      <p className="font-hand text-base text-[#2E4365] leading-snug">
                        "Drafted after deploying production builds. The architecture node topology models logical services. Tested under persistent client transaction loads."
                      </p>
                    </div>
                  </div>

                  {/* RIGHT PAGE: Problem, Solution, Challenges & Key protocols */}
                  <div className="flex flex-col gap-5 xl:pl-6">
                    
                    {/* Problem Definition */}
                    <div className="border-l-2 border-[#8A3B08] pl-4">
                      <span className="font-mono text-[9px] text-[#8A3B08] tracking-widest uppercase block mb-0.5 font-bold">
                        [ RECOGNIZED PROBLEM ]
                      </span>
                      <p className="font-sans text-xs md:text-sm text-[#2E4365] leading-relaxed">
                        {OTHER_PROJECTS[activeProjIdx].problem}
                      </p>
                    </div>

                    {/* Solution Details */}
                    <div className="border-l-2 border-[#E5902C] pl-4">
                      <span className="font-mono text-[9px] text-[#E5902C] tracking-widest uppercase block mb-0.5 font-bold">
                        [ APPLIED SOLUTION ]
                      </span>
                      <p className="font-sans text-xs md:text-sm text-[#2E4365] leading-relaxed">
                        {OTHER_PROJECTS[activeProjIdx].solution}
                      </p>
                    </div>

                    {/* Key features */}
                    <div className="pt-4 border-t border-[#2E4365]/10">
                      <span className="font-mono text-[9px] text-[#2E4365]/50 tracking-widest uppercase block mb-2 font-bold">
                        [ CORE PROTOCOLS ]
                      </span>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OTHER_PROJECTS[activeProjIdx].features.map((item, fidx) => (
                          <li key={fidx} className="font-sans text-[11px] text-[#2E4365] flex items-start gap-2" onMouseEnter={playPencilScratch}>
                            <span className="text-[#E5902C] mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges & Lessons Block */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#2E4365]/10">
                      <div>
                        <span className="font-mono text-[9px] text-[#8A3B08] block mb-1 uppercase font-bold">CHALLENGES MET</span>
                        <p className="font-hand text-sm text-[#2E4365] leading-snug">
                          {OTHER_PROJECTS[activeProjIdx].challenges}
                        </p>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-[#E5902C] block mb-1 uppercase font-bold">LESSON EXTRACTED</span>
                        <p className="font-hand text-sm text-[#2E4365] leading-snug">
                          {OTHER_PROJECTS[activeProjIdx].lessonsLearned}
                        </p>
                      </div>
                    </div>

                    {/* Compiled Stack & Button */}
                    <div className="pt-4 border-t border-[#2E4365]/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto">
                      <div>
                        <span className="font-mono text-[9px] text-[#2E4365]/60 block mb-1.5 uppercase font-bold">
                          COMPILED STACK
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {OTHER_PROJECTS[activeProjIdx].tech.map((item, tidx) => (
                            <span 
                              key={tidx} 
                              className="px-1.5 py-0.5 bg-[#EBDDC5] text-[#2E4365] border border-[#2E4365]/20 font-mono text-[9px] rounded-xs"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Code Repo Button */}
                      <div className="w-full sm:w-auto">
                        <GlareHover
                          width="100%"
                          height="auto"
                          borderColor="#2E4365"
                          borderRadius="4px"
                          glareOpacity={0.2}
                        >
                          <a 
                            href="https://github.com/vikaspokkuluri" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center justify-between gap-3 px-4 py-2 bg-[#E5902C] text-[#EBDDC5] hover:bg-[#8A3B08] transition-colors font-mono text-xs font-bold cursor-pointer"
                            onClick={playStampClack}
                          >
                            <span>CODE BLUEPRINTS</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </GlareHover>
                      </div>
                    </div>

                  </div>

                </motion.div>
                </AnimatePresence>
              
              </div>
            </div>

            {/* Hand-drawn Page Number */}
            <div className="absolute bottom-[-24px] right-4 font-mono text-[9px] text-[#2E4365]/40 select-none pointer-events-none uppercase tracking-widest mt-2">
              Page 03 // Project Spreads • July 2026 Entry
            </div>
        </section>


        {/* ================= WHY I BUILD (Replaces About) ================= */}
        <section 
          id="why-i-build"
          className="relative py-12 border-b-2 border-dashed border-[#2E4365]/20 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          onMouseEnter={() => triggerCursorMode('EXPLORE')}
          onMouseLeave={() => triggerCursorMode('DEFAULT')}
        >
          {/* Visual block left side */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-square w-full bg-[#F5EBD8] border-2 border-[#2E4365] p-6 rounded-sm relative shadow-card select-none">
              <div className="absolute inset-0 notebook-grid-overlay opacity-20 pointer-events-none" />
              
              {/* Pencil line visual */}
              <div className="absolute bottom-6 left-6 rotate-12">
                <span className="font-hand text-5xl text-[#8A3B08] block opacity-90">Sukumar P.</span>
                <span className="font-mono text-[9px] text-[#2E4365]/60 uppercase tracking-widest block mt-1">17.6868° N, 83.2185° E</span>
              </div>

              {/* Masking tape pinning top-right */}
              <div className="absolute top-[-5px] right-[-15px] w-16 h-5 bg-yellow-100/50 border border-yellow-200/40 rotate-[22deg]" />

              <div className="h-full flex flex-col justify-between">
                <span className="font-mono text-xs text-[#2E4365]/30">[ SKETCH_P03 // VERIFIED ]</span>
                
                {/* Hand drawn SVG symbol */}
                <svg viewBox="0 0 100 100" className="w-32 h-32 text-[#2E4365]/80 self-center">
                  <path d="M 10 50 Q 50 10 90 50 T 10 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/>
                  <circle cx="50" cy="50" r="10" fill="currentColor"/>
                  <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1.5"/>
                </svg>

                <div className="border-t border-dashed border-[#2E4365]/20 pt-3">
                  <p className="font-mono text-[10px] text-[#8A3B08] uppercase">ANALOG CATALOG REF: SDE-2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Copy Right side */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="font-eyebrow text-xs tracking-widest text-[#8A3B08] uppercase block mb-2">
                [ MOTIVATIONS & PRINCIPLES ]
              </span>
              <SplitText 
                text="FIELD NOTES" 
                tag="h2" 
                className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-[#2E4365]"
                textAlign="left"
              />
            </div>

            <p className="font-sans text-base text-[#2E4365]/80 leading-relaxed">
              I started coding because I wanted to make ideas immediately tactile. To me, a clean software application is identical to a meticulously crafted physical device. It should look balanced, feel solid under interaction, and perform its function with sub-second immediacy.
            </p>

            <p className="font-sans text-base text-[#2E4365]/80 leading-relaxed">
              I do not build just to hit milestones. I build because I am deeply curious about how systems handle concurrency, how storage indices compile, and how interfaces can convey warmth instead of digital sterile coldness. 
            </p>

            {/* Editorial pull quote */}
            <div className="bg-[#F3D58D] border-l-4 border-[#8A3B08] p-6 rounded-sm mt-4 relative">
              <span className="absolute -top-3 left-4 px-2 bg-[#EBDDC5] alt-theme:bg-[#D7E1D3] font-mono text-[10px] text-[#8A3B08]">
                [ PHILOSOPHY ]
              </span>
              <p className="font-sans font-bold text-lg md:text-xl italic text-[#2E4365] leading-snug">
                "Good software should disappear. The experience should remain."
              </p>
            </div>
          </div>

          {/* Physical page number stamp */}
          <div className="absolute bottom-0 right-0 font-mono text-[9px] text-[#2E4365]/40 select-none pointer-events-none uppercase tracking-widest mt-4">
            Page 04 // Field Notes • July 2026 Entry
          </div>
        </section>


        {/* ================= TECH STACK / TOOLBOX ================= */}
        <section 
          id="tech-stack"
          className="relative py-12 border-b-2 border-dashed border-[#2E4365]/20 pb-20"
          onMouseEnter={() => triggerCursorMode('VIEW')}
          onMouseLeave={() => triggerCursorMode('DEFAULT')}
        >
          {/* Section Heading */}
          <div className="mb-12">
            <span className="font-eyebrow text-xs tracking-widest text-[#8A3B08] uppercase block mb-2">
              [ TECHNICAL AMMUNITION ]
            </span>
            <SplitText 
              text="THE TOOLBOX" 
              tag="h2" 
              className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-[#2E4365]"
              textAlign="left"
            />
          </div>

          {/* Three-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* BUILD */}
            <div className="bg-[#F5EBD8] border border-[#2E4365] p-6 rounded-sm shadow-card hover:translate-y-[-4px] transition-all duration-300">
              <div className="flex items-center justify-between border-b border-[#2E4365]/20 pb-3 mb-6">
                <span className="font-display font-black text-xl text-[#2E4365] uppercase">01 // BUILD</span>
                <span className="font-mono text-xs text-[#E5902C]">[ ACTIVE CORE ]</span>
              </div>
              <ul className="flex flex-col gap-4">
                {['React (Vite)', 'Node.js', 'MongoDB', 'Express'].map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center font-mono text-xs">
                    <span className="text-[#2E4365] font-bold">{item}</span>
                    <span className="text-[#8A3B08]">● Production ready</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SHIP */}
            <div className="bg-[#F5EBD8] border border-[#2E4365] p-6 rounded-sm shadow-card hover:translate-y-[-4px] transition-all duration-300">
              <div className="flex items-center justify-between border-b border-[#2E4365]/20 pb-3 mb-6">
                <span className="font-display font-black text-xl text-[#2E4365] uppercase">02 // SHIP</span>
                <span className="font-mono text-xs text-[#E5902C]">[ PIPELINES ]</span>
              </div>
              <ul className="flex flex-col gap-4">
                {['Docker Containers', 'Git Versioning', 'REST APIs', 'Command-Line Tools'].map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center font-mono text-xs">
                    <span className="text-[#2E4365] font-bold">{item}</span>
                    <span className="text-[#8A3B08]">▲ Orchestrated</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEARN */}
            <div className="bg-[#F5EBD8] border border-[#2E4365] p-6 rounded-sm shadow-card hover:translate-y-[-4px] transition-all duration-300">
              <div className="flex items-center justify-between border-b border-[#2E4365]/20 pb-3 mb-6">
                <span className="font-display font-black text-xl text-[#2E4365] uppercase">03 // LEARN</span>
                <span className="font-mono text-xs text-[#E5902C]">[ EXPERIMENTS ]</span>
              </div>
              <ul className="flex flex-col gap-4">
                {['Cloud Infrastructure', 'System Design Scale', 'AI Tooling / LLM Ingress', 'Advanced TypeScript'].map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center font-mono text-xs">
                    <span className="text-[#2E4365] font-bold">{item}</span>
                    <span className="text-[#8A3B08]">◆ Research phase</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Physical page number stamp */}
          <div className="absolute bottom-0 right-0 font-mono text-[9px] text-[#2E4365]/40 select-none pointer-events-none uppercase tracking-widest mt-4">
            Page 05 // SDE Toolbox • July 2026 Entry
          </div>
        </section>


        {/* ================= EXPERIENCE TIMELINE ================= */}
        <section 
          id="experience"
          className="relative py-12 border-b-2 border-dashed border-[#2E4365]/20 pb-20"
          onMouseEnter={() => triggerCursorMode('EXPLORE')}
          onMouseLeave={() => triggerCursorMode('DEFAULT')}
        >
          {/* Section Heading */}
          <div className="mb-12">
            <span className="font-eyebrow text-xs tracking-widest text-[#8A3B08] uppercase block mb-2">
              [ PROFESSIONAL CHRONICLE ]
            </span>
            <SplitText 
              text="EXPERIENCE" 
              tag="h2" 
              className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-[#2E4365]"
              textAlign="left"
            />
          </div>

          {/* Stacking notebook cards */}
          <div className="flex flex-col gap-8">
            {EXPERIENCE.map((exp, idx) => (
              <div 
                key={idx} 
                className="bg-[#F5EBD8] border border-[#2E4365] p-6 md:p-8 rounded-sm shadow-card relative overflow-hidden"
              >
                {/* Visual binder tabs */}
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#8A3B08]" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-6 border-b border-[#2E4365]/10 pb-4">
                  <div>
                    <h3 className="font-display font-black text-xl text-[#2E4365] uppercase tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="font-mono text-xs text-[#E5902C] font-bold uppercase mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="font-mono text-xs text-[#2E4365]/60 bg-[#EBDDC5] px-2 py-1 rounded-xs border border-[#2E4365]/10 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8A3B08]" />
                    <span>{exp.startDate} – {exp.endDate}</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3">
                  {exp.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="flex items-start gap-3">
                      <span className="font-mono text-[#8A3B08] text-xs mt-0.5 font-bold">[✎]</span>
                      <span className="font-sans text-sm text-[#2E4365]/85 leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Physical page number stamp */}
          <div className="absolute bottom-0 right-0 font-mono text-[9px] text-[#2E4365]/40 select-none pointer-events-none uppercase tracking-widest mt-4">
            Page 06 // Work Chronicle • July 2026 Entry
          </div>
        </section>


        {/* ================= EDUCATION ================= */}
        <section 
          id="education"
          className="relative py-12 border-b-2 border-dashed border-[#2E4365]/20 pb-20"
          onMouseEnter={() => triggerCursorMode('VIEW')}
          onMouseLeave={() => triggerCursorMode('DEFAULT')}
        >
          {/* Section Heading */}
          <div className="mb-12">
            <span className="font-eyebrow text-xs tracking-widest text-[#8A3B08] uppercase block mb-2">
              [ INTELLECTUAL BASELINE ]
            </span>
            <SplitText 
              text="EDUCATION" 
              tag="h2" 
              className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-[#2E4365]"
              textAlign="left"
            />
          </div>

          <div className="bg-[#F5EBD8] border border-[#2E4365] p-6 md:p-8 rounded-sm shadow-card flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#EBDDC5] border border-[#2E4365]/20 rounded-xs hidden sm:block">
                <Award className="w-6 h-6 text-[#E5902C]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#2E4365] uppercase tracking-tight">
                  {EDUCATION[0].degree}
                </h3>
                <p className="font-sans text-sm text-[#2E4365]/70 mt-1">
                  {EDUCATION[0].institution}
                </p>
                <p className="font-mono text-xs text-[#8A3B08] mt-1.5 uppercase font-bold">
                  Location Marker: Visakhapatnam, Andhra Pradesh, IN
                </p>
              </div>
            </div>

            <div className="font-mono text-xs text-[#E5902C] bg-[#2E4365] px-3 py-1.5 rounded-sm border border-[#2E4365]">
              EXPECTED {EDUCATION[0].year}
            </div>
          </div>

          {/* Physical page number stamp */}
          <div className="absolute bottom-0 right-0 font-mono text-[9px] text-[#2E4365]/40 select-none pointer-events-none uppercase tracking-widest mt-4">
            Page 07 // Academics • July 2026 Entry
          </div>
        </section>


        {/* ================= PROCESS STEPS ================= */}
        <section 
          id="process"
          className="relative py-12 border-b-2 border-dashed border-[#2E4365]/20 pb-20"
          onMouseEnter={() => triggerCursorMode('EXPLORE')}
          onMouseLeave={() => triggerCursorMode('DEFAULT')}
        >
          {/* Section Heading */}
          <div className="mb-12">
            <span className="font-eyebrow text-xs tracking-widest text-[#8A3B08] uppercase block mb-2">
              [ RE-OCCURRING WORK PROTOCOL ]
            </span>
            <SplitText 
              text="THE DEVELOPMENT PROCESS" 
              tag="h2" 
              className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-[#2E4365]"
              textAlign="left"
            />
          </div>

          {/* Numbered grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div 
                key={step.num} 
                className="bg-[#F5EBD8] border border-[#2E4365]/50 p-6 rounded-sm shadow-xs relative hover:border-[#E5902C] transition-all duration-300"
              >
                <span className="font-display font-black text-4xl text-[#8A3B08]/15 absolute top-2 right-4 tracking-wider select-none">
                  {step.num}
                </span>

                <span className="font-mono text-xs text-[#E5902C] font-black block mb-2">
                  PHASE // {step.num}
                </span>

                <h3 className="font-sans font-bold text-base text-[#2E4365] uppercase tracking-tight mb-2">
                  {step.title}
                </h3>

                <p className="font-hand text-base text-[#2E4365]/90 leading-snug">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Physical page number stamp */}
          <div className="absolute bottom-0 right-0 font-mono text-[9px] text-[#2E4365]/40 select-none pointer-events-none uppercase tracking-widest mt-4">
            Page 08 // Process Blueprints • July 2026 Entry
          </div>
        </section>


        {/* ================= PHILOSOPHY FULL BLEED BAR ================= */}
        <section className="relative py-16 bg-[#F3D58D] border-2 border-[#2E4365] rounded-sm text-center select-none shadow-card overflow-hidden">
          <div className="absolute inset-0 notebook-grid-overlay opacity-15 pointer-events-none" />
          
          <div className="absolute top-3 left-4 font-mono text-[9px] text-[#8A3B08]/40 tracking-widest">
            SUKUMAR POKKULURI // ANCHOR CORE PHILOSOPHY
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display font-black text-xl md:text-3xl text-[#2E4365] tracking-tight leading-normal uppercase">
              GOOD SOFTWARE SHOULD DISAPPEAR. <br />
              <span className="text-[#8A3B08]">THE EXPERIENCE SHOULD REMAIN.</span>
            </h2>
          </div>
        </section>


        {/* ================= CONTACT SECTION ================= */}
        <section 
          id="contact"
          className="relative py-12 pb-20 border-b border-[#2E4365]/10"
          onMouseEnter={() => triggerCursorMode('WRITE')}
          onMouseLeave={() => triggerCursorMode('DEFAULT')}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Info and links */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="font-eyebrow text-xs tracking-widest text-[#8A3B08] uppercase block mb-2">
                  [ ESTABLISH INGRESS ]
                </span>
                <SplitText 
                  text="LET'S BUILD SOMETHING REAL." 
                  tag="h2" 
                  className="font-display font-black text-4xl uppercase tracking-tight text-[#2E4365] leading-none"
                  textAlign="left"
                />
              </div>

              <p className="font-sans text-sm text-[#2E4365]/70 leading-relaxed">
                If you are looking for an SDE who owns their code end-to-end, writes robust tests, and holds pixel-level margins accountable, drop me a prompt directly into the console box or connect via active social nodes.
              </p>

              {/* Live Info card */}
              <div className="bg-[#F5EBD8] border border-[#2E4365]/40 p-4 rounded-sm">
                <div className="flex items-center justify-between text-xs font-mono text-[#2E4365]/50 border-b border-[#2E4365]/10 pb-2 mb-2">
                  <span>METADATA INDEX</span>
                  <span>v9.0</span>
                </div>
                <div className="flex flex-col gap-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#2E4365]/50">EMAIL:</span>
                    <a href="mailto:vikaspokkuluri@gmail.com" className="text-[#8A3B08] hover:underline font-bold">
                      vikaspokkuluri@gmail.com
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2E4365]/50">LATITUDE:</span>
                    <span className="text-[#2E4365]">17.6868° N</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2E4365]/50">LONGITUDE:</span>
                    <span className="text-[#2E4365]">83.2185° E</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2E4365]/50">STATUS:</span>
                    <span className="text-[#E5902C] font-bold">READY FOR INTAKE // 2026</span>
                  </div>
                </div>
              </div>

              {/* Social buttons */}
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://github.com/vikaspokkuluri" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-[#2E4365] text-[#2E4365] hover:bg-[#2E4365] hover:text-[#EBDDC5] rounded-sm font-mono text-xs transition-all active:scale-95 shadow-xs"
                >
                  <Github className="w-4 h-4" />
                  <span>GITHUB</span>
                </a>

                <a 
                  href="https://linkedin.com/in/vikaspokkuluri" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-[#2E4365] text-[#2E4365] hover:bg-[#2E4365] hover:text-[#EBDDC5] rounded-sm font-mono text-xs transition-all active:scale-95 shadow-xs"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LINKEDIN</span>
                </a>
              </div>

            </div>

            {/* Simulated interactive terminal / message box */}
            <div className="lg:col-span-7">
              <div className="bg-[#F5EBD8] border-2 border-[#2E4365] rounded-sm shadow-card overflow-hidden">
                <div className="bg-[#2E4365] px-4 py-2.5 text-[#EBDDC5] flex items-center justify-between border-b border-[#2E4365]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="font-mono text-xs tracking-wider">CONSOLE_SESSION_STREAM</span>
                  <span className="font-mono text-[9px] opacity-50">[ INTAKE PORT: 3000 ]</span>
                </div>

                <form onSubmit={handleSendMessage} className="p-6 flex flex-col gap-4">
                  <div>
                    <label className="font-mono text-xs text-[#8A3B08] font-bold uppercase block mb-1.5">
                      // DIRECT PROMPT MESSAGING
                    </label>
                    <textarea 
                      required
                      rows={5}
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                      placeholder="Type your prompt/message here... (e.g. Let's arrange a call to discuss SDE roles!)"
                      className="w-full bg-[#EBDDC5]/40 border border-[#2E4365]/30 focus:border-[#E5902C] focus:ring-1 focus:ring-[#E5902C] outline-hidden p-3 rounded-sm font-hand text-lg text-[#2E4365] leading-relaxed placeholder-[#2E4365]/40 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="font-mono text-[10px] text-[#2E4365]/40 max-w-xs">
                      Submitting triggers simulated visual completion before calling native mailto broker.
                    </div>

                    <div className="w-full sm:w-auto">
                      <GlareHover
                        width="100%"
                        height="auto"
                        borderColor="#2E4365"
                        borderRadius="4px"
                        glareOpacity={0.25}
                      >
                        <button
                          type="submit"
                          disabled={isSending || sendSuccess}
                          className="w-full sm:w-auto min-w-[180px] flex items-center justify-center gap-2 px-6 py-3 bg-[#E5902C] text-[#EBDDC5] font-mono text-xs font-bold hover:bg-[#8A3B08] disabled:bg-[#2E4365]/20 disabled:text-[#2E4365]/40 transition-colors uppercase cursor-pointer"
                        >
                          {isSending && (
                            <span className="w-4 h-4 border-2 border-[#EBDDC5] border-t-transparent rounded-full animate-spin" />
                          )}
                          {!isSending && sendSuccess && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          {!isSending && !sendSuccess && (
                            <Mail className="w-4 h-4" />
                          )}
                          <span>
                            {isSending ? 'Sending Stream' : sendSuccess ? 'Prompt Dispatched!' : 'Dispatch Prompt'}
                          </span>
                        </button>
                      </GlareHover>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>

          {/* Physical page number stamp */}
          <div className="absolute bottom-0 right-0 font-mono text-[9px] text-[#2E4365]/40 select-none pointer-events-none uppercase tracking-widest mt-4">
            Page 09 // Radio Transmission • July 2026 Entry
          </div>
        </section>

      </main>

      {/* ================= EDITORIAL SIGN-OFF FOOTER ================= */}
      <footer className="mt-16 bg-[#F5EBD8] border-t-2 border-[#2E4365] py-12 px-4 md:px-8 relative z-10 select-none">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#2E4365]/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          
          {/* Handwritten Sign-off */}
          <div className="flex flex-col gap-2">
            <div className="font-sans text-sm text-[#2E4365]/70 italic leading-relaxed">
              Still learning. <br />
              Still building. <br />
              Still curious.
            </div>
            
            <div className="mt-4 relative">
              <span className="font-hand text-4xl md:text-5xl text-[#8A3B08] tracking-wider block">
                Sukumar Pokkuluri
              </span>
              <span className="font-mono text-[9px] text-[#2E4365]/40 uppercase tracking-widest block -mt-1 pl-1">
                Handwritten Authentication
              </span>
            </div>
          </div>

          {/* Quick instructions & clock */}
          <div className="flex flex-col md:items-end gap-3 text-left md:text-right">
            <div className="flex flex-wrap md:justify-end gap-4 font-mono text-[10px] text-[#2E4365]/60 uppercase items-center">
              {/* Replay Intro button */}
              <button 
                onClick={() => {
                  playPaperFlip();
                  setShowOpening(true);
                }}
                className="flex items-center gap-1 bg-[#EBDDC5] hover:bg-[#F3D58D] border border-[#2E4365]/30 px-2 py-1 rounded-sm text-[10px] text-[#2E4365] font-mono cursor-pointer active:scale-95"
                title="Replay the welcome animation"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#E5902C]" />
                <span>REPLAY INTRO</span>
              </button>

              {/* Sound toggle button */}
              <button 
                onClick={() => {
                  setSoundOn(prev => {
                    const next = !prev;
                    toggleSound(next);
                    return next;
                  });
                  playSwitchClick();
                }}
                className="flex items-center gap-1 bg-[#EBDDC5] hover:bg-[#F3D58D] border border-[#2E4365]/30 px-2 py-1 rounded-sm text-[10px] text-[#2E4365] font-mono cursor-pointer active:scale-95"
                title="Mute / Unmute physical sound effects"
              >
                {soundOn ? <Volume2 className="w-3.5 h-3.5 text-green-600" /> : <VolumeX className="w-3.5 h-3.5 text-red-500" />}
                <span>SOUND: {soundOn ? 'ON' : 'OFF'}</span>
              </button>
              
              <span className="flex items-center gap-1.5">
                <span className="px-1 bg-[#EBDDC5] border border-[#2E4365]/20 rounded-xs">[ S ]</span> Mute
              </span>
              <span className="flex items-center gap-1.5">
                <span className="px-1 bg-[#EBDDC5] border border-[#2E4365]/20 rounded-xs">[ B ]</span> Theme
              </span>
              <span className="flex items-center gap-1.5">
                <span className="px-1 bg-[#EBDDC5] border border-[#2E4365]/20 rounded-xs">[ G ]</span> Grid
              </span>
              <span className="flex items-center gap-1.5">
                <span className="px-1 bg-[#EBDDC5] border border-[#2E4365]/20 rounded-xs">[ Double Click ]</span> Sketchbook
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#2E4365]/80 bg-[#EBDDC5] px-3 py-1.5 rounded-sm border border-[#2E4365]/10">
              <Clock className="w-3.5 h-3.5 text-[#E5902C]" />
              <span className="uppercase">{currentTime}</span>
            </div>

            <p className="font-mono text-[9px] text-[#2E4365]/40 mt-1 uppercase">
              © 2026 Sukumar Pokkuluri. Crafted entirely with vintage CSS & local SVG lines.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
