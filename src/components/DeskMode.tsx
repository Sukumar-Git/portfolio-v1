import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Lightbulb, 
  Volume2, 
  VolumeX, 
  Calendar as CalendarIcon, 
  BookOpen, 
  Clock, 
  ArrowLeftRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { 
  playPaperFlip, 
  playPencilScratch, 
  playStampClack, 
  playSwitchClick, 
  playCoffeeSip, 
  toggleSound 
} from '../utils/audio';

interface DeskModeProps {
  onSwitchView: () => void;
  altTheme: boolean;
  setAltTheme: React.Dispatch<React.SetStateAction<boolean>>;
  gridOverlay: boolean;
  setGridOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  currentTime: string;
}

export default function DeskMode({ 
  onSwitchView, 
  altTheme, 
  setAltTheme, 
  gridOverlay, 
  setGridOverlay,
  currentTime
}: DeskModeProps) {
  const [coffeeLevel, setCoffeeLevel] = useState(100);
  const [coffeeSipped, setCoffeeSipped] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [lampOn, setLampOn] = useState(true);
  const [activeTool, setActiveTool] = useState<'pencil' | 'stamp' | 'pointer'>('pointer');
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  // Handle local walkman / audio sync
  const handleToggleSound = () => {
    const nextSound = !soundOn;
    setSoundOn(nextSound);
    toggleSound(nextSound);
    playSwitchClick();
  };

  const handleLampClick = () => {
    setLampOn(!lampOn);
    setAltTheme(!altTheme);
    playSwitchClick();
  };

  const handleCoffeeClick = () => {
    if (coffeeLevel > 0) {
      playCoffeeSip();
      setCoffeeLevel(prev => Math.max(0, prev - 25));
      const remarks = [
        "Mmm, delicious CSS!",
        "Warm compilation juice...",
        "Double-shot TypeScript!",
        "Refuel complete! (Click to Brew)"
      ];
      setCoffeeSipped(remarks[3 - Math.floor(coffeeLevel / 25)]);
      setTimeout(() => setCoffeeSipped(null), 3000);
    } else {
      playCoffeeSip(); // bubble refill sound
      setCoffeeLevel(100);
      setCoffeeSipped("Fresh brew prepped!");
      setTimeout(() => setCoffeeSipped(null), 3000);
    }
  };

  const handleToolClick = (tool: 'pencil' | 'stamp' | 'pointer') => {
    setActiveTool(tool);
    if (tool === 'pencil') {
      playPencilScratch();
    } else if (tool === 'stamp') {
      playStampClack();
    } else {
      playPaperFlip();
    }
  };

  // Mini retro SDE calculator logic
  const handleCalcBtn = (val: string) => {
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === '=') {
      try {
        // Special Easter eggs for Sukumar SDE portfolio
        if (calcInput.includes('17.6') || calcInput.includes('83.2')) {
          setCalcResult('Visakhapatnam AP');
        } else if (calcInput.toLowerCase() === 'sde' || calcInput.toLowerCase() === 'role') {
          setCalcResult('HIRE SUKUMAR');
        } else if (calcInput.toLowerCase() === '2026') {
          setCalcResult('GRADUATION YEAR');
        } else if (calcInput.toLowerCase() === 'nexus') {
          setCalcResult('NEXUS AI v0.4');
        } else {
          // Safe eval
          const sanitized = calcInput.replace(/[^0-9+\-*/().]/g, '');
          const res = Function(`"use strict"; return (${sanitized})`)();
          setCalcResult(String(res));
        }
      } catch {
        setCalcResult('Error');
      }
    } else {
      setCalcInput(prev => prev + val);
    }
  };

  return (
    <div className={`w-full min-h-screen relative overflow-hidden transition-colors duration-700 ${lampOn ? 'bg-[#3A2218]' : 'bg-[#150D0A]'}`}>
      
      {/* Desk Wooden Planks & Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-color-burn" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at 50% 50%, #8D543B 0%, #30170B 100%)',
             backgroundSize: 'cover'
           }} 
      />
      
      {/* Wood grain lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
           style={{
             backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(0,0,0,0.5) 16px, transparent 17px)`
           }} 
      />

      {/* Desk Lamp Warm Glow Overlay */}
      <AnimatePresence>
        {lampOn && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-1/4 right-1/4 bottom-0 pointer-events-none z-[1]"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(243, 213, 141, 0.8) 0%, rgba(243, 213, 141, 0.15) 50%, transparent 80%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Navigation Header / Back option */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-4 md:px-8 border-b border-white/10 bg-black/30 backdrop-blur-md select-none">
        <div className="flex items-center gap-3">
          <span className="font-hand text-3xl font-black text-[#F3D58D]">Sukumar Pokkuluri</span>
          <span className="font-mono text-[9px] uppercase bg-[#E5902C] text-black px-1.5 py-0.5 rounded-xs font-bold">
            Explore Desk Mode
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick toggle sound */}
          <button 
            onClick={handleToggleSound}
            className="p-2 border border-white/20 rounded-sm bg-white/5 hover:bg-white/10 text-[#F3D58D] transition-colors"
            title="Toggle Sound Effects"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Main Journal view switch button */}
          <button
            onClick={() => {
              playPaperFlip();
              onSwitchView();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#E5902C] hover:bg-[#8A3B08] text-[#EBDDC5] font-mono text-xs font-bold rounded-sm border border-white/20 transition-all uppercase cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Design Journal</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Stage */}
      <main className="max-w-7xl mx-auto px-4 pt-28 pb-16 min-h-screen relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: LAMP, COFFEE MUG, WALKMAN (AMBIENT INTERACTIVE ITEMS) */}
        <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-6 justify-between lg:justify-start h-full">
          
          {/* 1. DESK LAMP (THEME CONTROLLER) */}
          <div className="bg-black/45 border border-white/10 p-5 rounded-sm flex flex-col gap-3 flex-1">
            <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase flex justify-between">
              <span>Item 01 // Lamp</span>
              <span className={lampOn ? 'text-green-400' : 'text-red-400'}>{lampOn ? 'ON' : 'OFF'}</span>
            </span>
            
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full transition-colors duration-300 ${lampOn ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/5 text-white/30'}`}>
                <Lightbulb className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-[#F3D58D] uppercase">Warm Brass Desk Lamp</h4>
                <p className="font-mono text-[9px] text-white/40">FLIPS OVERALL THEME</p>
              </div>
            </div>

            <button
              onClick={handleLampClick}
              className={`w-full py-2.5 rounded-sm border font-mono text-xs font-bold transition-all uppercase ${lampOn ? 'bg-yellow-500 text-black border-yellow-600' : 'bg-white/10 text-white/80 border-white/20'}`}
            >
              Toggle Light Switch
            </button>
          </div>

          {/* 2. CERAMIC COFFEE MUG (SIPIFY CONTROLLER) */}
          <div className="bg-black/45 border border-white/10 p-5 rounded-sm flex flex-col gap-3 flex-1 relative">
            <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase">
              Item 02 // Coffee Cup
            </span>
            
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer" onClick={handleCoffeeClick}>
                <Coffee className="w-10 h-10 text-[#F3D58D]" />
                {/* Coffee Liquid Level bar on mug */}
                <div className="absolute bottom-2 left-3 right-3 h-1 bg-amber-900 rounded-xs transition-all" style={{ width: `${coffeeLevel * 0.4}%` }} />
                {/* Steam trails */}
                {coffeeLevel > 0 && lampOn && (
                  <div className="absolute -top-3 left-4 flex gap-1 pointer-events-none">
                    <div className="w-1 h-3 bg-white/20 rounded-full animate-pulse blur-xs" />
                    <div className="w-1 h-4 bg-white/25 rounded-full animate-pulse blur-xs delay-100" />
                    <div className="w-1 h-2 bg-white/15 rounded-full animate-pulse blur-xs delay-300" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-[#F3D58D] uppercase">SDE Brewed Coffee</h4>
                <p className="font-mono text-[9px] text-white/40">LEVEL: {coffeeLevel}% • CLICK MUG TO SIP</p>
              </div>
            </div>

            <button
              onClick={handleCoffeeClick}
              className="w-full py-2 bg-amber-800/20 hover:bg-amber-800/40 text-amber-200 border border-amber-800/30 font-mono text-xs rounded-sm uppercase tracking-wide transition-colors"
            >
              {coffeeLevel === 0 ? 'Brew Fresh Pot' : 'Take a Sip'}
            </button>

            {/* Coffee Speech remark bubbles */}
            <AnimatePresence>
              {coffeeSipped && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#F3D58D] text-black border border-[#2E4365] px-3 py-1 text-[11px] font-hand rounded-md shadow-lg font-bold"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {coffeeSipped}
                  <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#F3D58D] rotate-45 border-r border-b border-[#2E4365]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. RETRO WALKMAN CASSETTE PLAYER (SOUND CONTROLLER) */}
          <div className="bg-black/45 border border-white/10 p-5 rounded-sm flex flex-col gap-3 flex-1">
            <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase">
              Item 03 // WALKMAN WM-SDE
            </span>
            
            <div className="relative h-16 bg-[#1a2233] border border-white/10 rounded-sm overflow-hidden flex items-center justify-between px-3">
              {/* Reels spin */}
              <div className="flex gap-4">
                <div className={`w-6 h-6 rounded-full border-4 border-dashed border-gray-600 flex items-center justify-center ${soundOn ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className={`w-6 h-6 rounded-full border-4 border-dashed border-gray-600 flex items-center justify-center ${soundOn ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-[8px] text-[#E5902C] block font-bold">SYNTH SOUNDS</span>
                <span className="font-mono text-[10px] text-white/80 block uppercase">{soundOn ? 'PLAYING' : 'MUTED'}</span>
              </div>
            </div>

            <button
              onClick={handleToggleSound}
              className={`w-full py-2 border font-mono text-xs rounded-sm uppercase tracking-wide transition-colors ${soundOn ? 'bg-gray-800 text-amber-200 border-gray-700' : 'bg-red-950/40 text-red-300 border-red-900/40'}`}
            >
              {soundOn ? 'Mute Cassette' : 'Play Cassette'}
            </button>
          </div>

        </div>

        {/* CENTER COLUMN: THE DESIGN JOURNAL (THE CORE OBJECT) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* THE NOTEBOOK OBJECT */}
          <div 
            onClick={() => {
              playPaperFlip();
              onSwitchView();
            }}
            className="group cursor-pointer relative bg-[#F5EBD8] border-4 border-[#2E4365] rounded-lg p-8 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-rotate-1"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 12px 12px 0px rgba(229, 144, 44, 0.15)'
            }}
          >
            {/* Vintage binder seam rings on the left side of notebook cover */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-[#2E4365] flex flex-col justify-around py-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-[#EBDDC5] mx-auto shadow-inner border border-black/30" />
              ))}
            </div>

            {/* Background notebook grid lines */}
            <div className="absolute inset-0 pointer-events-none notebook-grid-overlay opacity-20" />

            <div className="pl-6 flex flex-col justify-between min-h-[380px] relative">
              
              {/* Monogram or logo stamped */}
              <div className="flex justify-between items-start">
                <div className="font-mono text-[9px] text-[#8A3B08] border border-[#8A3B08]/40 px-1.5 py-0.5 rounded-sm uppercase">
                  JOURNAL v9.0 // SDE
                </div>
                <div className="font-mono text-[9px] text-[#2E4365]/50 uppercase tracking-widest text-right">
                  17.6868° N, 83.2185° E
                </div>
              </div>

              {/* Cover stamped title */}
              <div className="my-auto py-8">
                <span className="font-mono text-[10px] text-[#E5902C] uppercase font-bold tracking-widest block mb-2">
                  EXPLORATION JOURNAL & DEV LOG
                </span>
                <h2 className="font-display font-black text-4xl md:text-5xl text-[#2E4365] uppercase leading-none tracking-tight">
                  SUKUMAR <br />
                  <span className="text-[#8A3B08]">POKKULURI</span>
                </h2>
                <div className="h-1 w-24 bg-[#E5902C] mt-4" />
              </div>

              {/* Bottom footer stamp */}
              <div className="border-t border-dashed border-[#2E4365]/20 pt-4 flex justify-between items-end">
                <div>
                  <span className="font-mono text-[10px] text-[#2E4365]/60 block uppercase">LAST METADATA WRITE</span>
                  <span className="font-mono text-xs text-[#2E4365] font-bold">JULY 2026 // EST. ACTIVE</span>
                </div>
                
                <div className="flex items-center gap-2 text-[#E5902C] font-mono text-xs font-black animate-pulse">
                  <span>TAP TO LEAP INSIDE</span>
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Binder Ribbon Page Marker hanging out */}
            <div className="absolute right-12 bottom-[-10px] w-4 h-24 bg-[#8A3B08] rotate-6 border border-black/20 origin-top transform group-hover:rotate-12 transition-transform duration-300" />
          </div>

          {/* CREATIVE DIRECTION STATEMENT PINNED TO DESK */}
          <div className="bg-[#EBDDC5] border-2 border-dashed border-[#2E4365]/30 p-6 rounded-sm relative shadow-md">
            {/* Masking tape pinning it on top */}
            <div className="absolute top-[-10px] left-1/3 w-32 h-5 bg-yellow-100/50 border border-yellow-200/40 rotate-[-1.5deg]" />
            
            <h4 className="font-mono text-xs font-bold text-[#8A3B08] mb-2 uppercase">
              📓 THEMETIC PRINCIPLE (CREATIVE DIRECTION)
            </h4>
            <p className="font-sans text-xs text-[#2E4365]/80 italic leading-relaxed">
              "This portfolio must not resemble a dashboard, SaaS landing page, developer template, or standard React portfolio. It should feel like a physical design journal documenting the journey of an SDE. Every interaction reinforces the illusion of turning pages, discovering notes, and exploring artifacts."
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: CALENDAR, MOBILE POCKET CALCULATOR, DRAWING INSTRUMENTS */}
        <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-6 justify-between lg:justify-start h-full">
          
          {/* 1. JULY 2026 CALENDAR WITH HANDDRAWN CIRCLE */}
          <div className="bg-black/45 border border-white/10 p-5 rounded-sm flex flex-col gap-3 flex-1 select-none">
            <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5 text-[#E5902C]" />
              <span>Item 04 // CALENDAR</span>
            </span>
            
            <div className="bg-[#F5EBD8] text-[#2E4365] p-3 rounded-sm border border-[#2E4365]/20 font-mono text-xs">
              <div className="text-center font-bold border-b border-[#2E4365]/20 pb-1.5 mb-2 uppercase tracking-wider">
                JULY 2026
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <span key={i} className="font-black text-[#8A3B08]/60">{d}</span>
                ))}
                {/* Pad empty days for July 2026 (Wednesday starts on 1st) */}
                <span></span><span></span><span></span>
                <span>1</span><span>2</span><span>3</span><span>4</span>
                <span>5</span><span>6</span><span>7</span><span>8</span>
                <span>9</span><span>10</span><span>11</span><span>12</span>
                <span>13</span><span>14</span><span>15</span>
                {/* 16 is circled as "current" marker */}
                <span className="relative flex items-center justify-center font-bold text-[#8A3B08] z-10">
                  16
                  {/* Circle outline handdrawn simulation */}
                  <span className="absolute w-5 h-5 border-2 border-red-500 rounded-full scale-125 -rotate-12 border-dashed pointer-events-none" />
                </span>
                <span>17</span><span>18</span><span>19</span>
                <span>20</span><span>21</span><span>22</span><span>23</span>
                <span>24</span><span>25</span><span>26</span><span>27</span>
                <span>28</span><span>29</span><span>30</span><span>31</span>
              </div>
            </div>
            
            <div className="font-mono text-[9px] text-white/40 leading-snug">
              Today: July 16, 2026. Hand-circled design log deadline.
            </div>
          </div>

          {/* 2. POCKET CALCULATOR WIDGET */}
          <div className="bg-black/45 border border-white/10 p-5 rounded-sm flex flex-col gap-3 flex-1">
            <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase flex justify-between">
              <span>Item 05 // CALC PHONE</span>
              <button onClick={() => setCalculatorOpen(!calculatorOpen)} className="text-[#E5902C] hover:underline font-bold text-[9px] uppercase">
                {calculatorOpen ? '[ COLLAPSE ]' : '[ ACTIVATE ]'}
              </button>
            </span>

            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-gray-900 border border-white/20 rounded-md text-[#E5902C] cursor-pointer" onClick={() => setCalculatorOpen(!calculatorOpen)}>
                <span className="text-sm font-mono block tracking-tight font-black">SDE-80</span>
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-[#F3D58D] uppercase">Pocket SDE Device</h4>
                <p className="font-mono text-[9px] text-white/40">RETRO CALC & LATITUDE MATRIX</p>
              </div>
            </div>

            {/* Interactive Calculator Slide Down */}
            <AnimatePresence>
              {calculatorOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden border-t border-white/10 pt-3 flex flex-col gap-2"
                >
                  {/* Digital screen */}
                  <div className="bg-black/70 border border-white/10 p-2 text-right font-mono text-xs h-12 flex flex-col justify-between rounded-xs">
                    <span className="text-white/40 text-[9px] overflow-hidden whitespace-nowrap block">{calcInput || '0'}</span>
                    <span className="text-[#E5902C] font-black tracking-wide block">{calcResult || '0.00'}</span>
                  </div>

                  {/* Keys Grid */}
                  <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
                    {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'].map((btn) => (
                      <button
                        key={btn}
                        onClick={() => {
                          playSwitchClick();
                          handleCalcBtn(btn);
                        }}
                        className={`py-1 rounded-xs border text-center font-bold active:scale-95 transition-all ${
                          btn === '=' ? 'bg-[#E5902C] text-black border-yellow-600 font-black' :
                          btn === 'C' ? 'bg-red-950 text-red-200 border-red-900' :
                          'bg-white/5 text-white border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                  
                  <div className="text-[8px] font-mono text-white/30 text-center uppercase tracking-wider">
                    Binds: SDE (Hire), 2026, Nexus, Coordinates
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. DRAWING PENCILS / SCRATCH TOOLS */}
          <div className="bg-black/45 border border-white/10 p-5 rounded-sm flex flex-col gap-3 flex-1 select-none">
            <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase">
              Item 06 // GRAPHITE TOOLS
            </span>
            
            <div className="flex justify-around items-center py-2 border border-white/15 rounded-xs bg-[#1A1310]">
              <button
                onClick={() => handleToolClick('pointer')}
                className={`flex flex-col items-center gap-1 p-2 rounded-xs transition-colors ${activeTool === 'pointer' ? 'bg-[#E5902C] text-black' : 'text-[#F3D58D] hover:bg-white/5'}`}
                title="Select Index Pointer"
              >
                <span className="text-xs">👆</span>
                <span className="font-mono text-[8px] uppercase">FINGER</span>
              </button>

              <button
                onClick={() => handleToolClick('pencil')}
                className={`flex flex-col items-center gap-1 p-2 rounded-xs transition-colors ${activeTool === 'pencil' ? 'bg-[#E5902C] text-black' : 'text-[#F3D58D] hover:bg-white/5'}`}
                title="Select Graphite Pencil"
              >
                <span className="text-xs">✏️</span>
                <span className="font-mono text-[8px] uppercase">PENCIL</span>
              </button>

              <button
                onClick={() => handleToolClick('stamp')}
                className={`flex flex-col items-center gap-1 p-2 rounded-xs transition-colors ${activeTool === 'stamp' ? 'bg-[#E5902C] text-black' : 'text-[#F3D58D] hover:bg-white/5'}`}
                title="Select Validation Stamp"
              >
                <span className="text-xs">💮</span>
                <span className="font-mono text-[8px] uppercase">STAMP</span>
              </button>
            </div>
            
            <p className="font-mono text-[9px] text-white/30 leading-snug">
              Graphite Pencil triggers physical scratch effects; Validation Stamp seals approval tags.
            </p>
          </div>

        </div>

      </main>

      {/* FOOTER RAILS */}
      <footer className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/40 font-mono text-[9px] uppercase z-10 select-none pointer-events-none">
        <span>SUKUMAR POKKULURI // PORTFOLIO_STABILIZED_BUILD</span>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-[#E5902C]" />
          <span>{currentTime}</span>
        </div>
      </footer>

    </div>
  );
}
