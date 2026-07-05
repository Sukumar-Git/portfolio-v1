import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Calendar, PenTool } from 'lucide-react';
import { CONCEPT_SKETCHES } from '../data';
import { playXpSound } from '../utils/audio';

interface SketchbookModalProps {
  onClose: () => void;
}

export default function SketchbookModal({ onClose }: SketchbookModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in overlay & slide up paper card
    gsap.to(modalRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(containerRef.current, 
      { y: 50, rotate: -2, scale: 0.95 },
      { y: 0, rotate: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }
    );

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playXpSound();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCloseClick = () => {
    playXpSound();
    gsap.to(containerRef.current, { 
      y: 30, 
      rotate: 1, 
      scale: 0.97, 
      opacity: 0, 
      duration: 0.3, 
      ease: 'power2.in' 
    });
    gsap.to(modalRef.current, { 
      opacity: 0, 
      duration: 0.3, 
      delay: 0.1, 
      onComplete: onClose 
    });
  };

  return (
    <div
      ref={modalRef}
      style={{ opacity: 0 }}
      onClick={handleCloseClick}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#2E4365]/60 backdrop-blur-xs p-4 md:p-8"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#F5EBD8] border-2 border-[#8A3B08] p-6 md:p-10 shadow-2xl rounded-sm overflow-y-auto max-h-[90vh] custom-select"
        style={{ boxShadow: '12px 16px 0px rgba(138, 59, 8, 0.25)' }}
      >
        {/* Paper spiral binding effect at top */}
        <div className="absolute top-0 left-10 right-10 -translate-y-1/2 flex justify-between pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-4 h-8 bg-gradient-to-b from-[#2E4365] to-transparent rounded-full border border-[#EBDDC5] shadow-xs" />
          ))}
        </div>

        {/* Torn paper top ridge simulation */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#2E4365]/10 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleCloseClick}
          className="absolute top-6 right-6 p-2 text-[#2E4365] hover:text-[#E5902C] hover:scale-110 active:scale-95 transition-all bg-[#EBDDC5]/50 rounded-sm border border-[#2E4365]/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b-2 border-dashed border-[#2E4365]/30 pb-6 mb-8 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <PenTool className="w-5 h-5 text-[#E5902C]" />
            <span className="font-mono text-xs tracking-wider text-[#8A3B08] uppercase">SUKUMAR POKKULURI // ARCHIVE</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-[#2E4365]">THE INTERNAL SKETCHBOOK</h2>
          <p className="font-sans text-sm text-[#2E4365]/70 max-w-xl mt-2 leading-relaxed">
            Early layout concepts, flowcharts, and technical doodles captured from initial product whiteboard sessions. Clean architectures start as messy pencil marks.
          </p>
        </div>

        {/* Grid of Concept Drawings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONCEPT_SKETCHES.map((sketch, idx) => (
            <div
              key={idx}
              className="bg-[#EBDDC5]/40 border border-[#2E4365]/20 p-4 rounded-sm flex flex-col justify-between hover:border-[#E5902C] transition-all"
            >
              {/* SVG Sketch Box */}
              <div className="relative w-full aspect-square bg-[#EBDDC5]/25 border border-dashed border-[#2E4365]/15 rounded-sm overflow-hidden flex items-center justify-center p-2 mb-4">
                {/* Dotted grid lines inside sketch box */}
                <div className="absolute inset-0 notebook-grid-overlay opacity-10 pointer-events-none" />
                
                <svg viewBox="0 0 200 200" className="w-full h-full text-[#2E4365]/80 select-none">
                  <path
                    d={sketch.lines.join(' ')}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-draw"
                  />
                </svg>

                <div className="absolute bottom-2 right-2 font-hand text-xs text-[#8A3B08] opacity-75">
                  sketch.{sketch.date.split(' ')[0].toLowerCase()}
                </div>
              </div>

              {/* Sketch Meta */}
              <div>
                <div className="flex items-center gap-1.5 text-[#2E4365]/50 text-[10px] font-mono mb-1 uppercase">
                  <Calendar className="w-3 h-3" />
                  <span>{sketch.date}</span>
                </div>
                <h3 className="font-sans font-bold text-sm text-[#2E4365] mb-1.5 uppercase tracking-tight">
                  {sketch.title}
                </h3>
                <p className="font-hand text-sm text-[#2E4365]/80 leading-snug">
                  {sketch.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Footnote */}
        <div className="mt-10 pt-6 border-t border-dashed border-[#2E4365]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[10px] text-[#2E4365]/40">
            DOUBLE-CLICK ANYWHERE TO RE-TOGGLE SKETCHBOOK OVERLAY
          </div>
          <button
            onClick={handleCloseClick}
            className="px-6 py-2 border-2 border-[#2E4365] text-[#2E4365] hover:bg-[#2E4365] hover:text-[#EBDDC5] font-mono text-xs uppercase tracking-wider rounded-sm transition-all"
          >
            [ CLOSE SHELF ]
          </button>
        </div>
      </div>
    </div>
  );
}
