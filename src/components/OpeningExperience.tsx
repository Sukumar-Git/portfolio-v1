import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface OpeningExperienceProps {
  onComplete: () => void;
}

const GREETINGS = [
  { text: "Hello", lang: "English", color: "#2E4365" },
  { text: "నమస్తే", lang: "Telugu", color: "#E5902C" },
  { text: "Hola", lang: "Spanish", color: "#8A3B08" },
  { text: "Bonjour", lang: "French", color: "#3B5A80" },
  { text: "Ciao", lang: "Italian", color: "#2A6B4E" },
  { text: "こんにちは", lang: "Japanese", color: "#92301A" },
  { text: "Namaskar", lang: "Hindi", color: "#B85D18" },
  { text: "Vanakkam", lang: "Tamil", color: "#1D3B5C" }
];

export default function OpeningExperience({ onComplete }: OpeningExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    // GSAP Kinetic Typography Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (!skipped) {
          handleFinish();
        }
      }
    });

    // Gather elements to animate
    const validWordElements = wordRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const activeWords = [...validWordElements, nameRef.current];
    
    // Initial states: hide all
    gsap.set(activeWords, { opacity: 0, scale: 0.8, filter: 'blur(12px)' });

    // Animate each greeting sequentially with high-fidelity pacing
    validWordElements.forEach((wordEl, index) => {
      tl.to(wordEl, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'back.out(1.8)'
      }, index === 0 ? undefined : '-=0.18')
      .to(wordEl, {
        opacity: 0,
        scale: 1.1,
        filter: 'blur(8px)',
        duration: 0.22,
        delay: 0.35,
        ease: 'power2.in'
      });
    });

    // Final Name State (Bricolage Display, Police Blue)
    tl.to(nameRef.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.65,
      ease: 'power3.out'
    }, '-=0.1')
    .to(nameRef.current, {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(5px)',
      duration: 0.35,
      delay: 0.7,
      ease: 'power2.in'
    });

    // Fade out main background container at the very end
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out'
    }, '-=0.15');

    return () => {
      tl.kill();
    };
  }, [onComplete, skipped]);

  const handleFinish = () => {
    setSkipped(true);
    onComplete();
  };

  const handleSkip = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    handleFinish();
  };

  return (
    <div
      id="opening-experience-root"
      ref={containerRef}
      onClick={handleFinish}
      className="fixed inset-0 z-[1000] flex flex-col justify-center items-center bg-[#EBDDC5] cursor-pointer overflow-hidden custom-select select-none"
    >
      {/* Subtle Background Notebook Lines for Cohesion */}
      <div className="absolute inset-0 notebook-grid-overlay opacity-30 pointer-events-none" />

      {/* Skipping affordance */}
      <button
        ref={skipBtnRef}
        onClick={handleSkip}
        className="absolute top-8 right-8 z-[1010] px-4 py-2 border border-[#2E4365]/30 rounded font-mono text-xs text-[#2E4365]/60 hover:text-[#2E4365] hover:border-[#2E4365] transition-all bg-[#EBDDC5]/80 active:scale-95 cursor-pointer"
      >
        [ ESCAPE / SKIP ]
      </button>

      {/* Typography Stage */}
      <div className="relative flex justify-center items-center h-48 w-full max-w-4xl px-4">
        {/* Dynamic Greetings */}
        {GREETINGS.map((greeting, index) => (
          <div
            key={index}
            ref={(el) => { wordRefs.current[index] = el; }}
            className="absolute font-hand text-5xl md:text-8xl text-center"
            style={{ color: greeting.color }}
          >
            {greeting.text}
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[#2E4365]/30 mt-1">
              {greeting.lang}
            </span>
          </div>
        ))}

        {/* Final Name State */}
        <div
          ref={nameRef}
          className="absolute font-display font-black text-4xl md:text-7xl uppercase tracking-tight text-[#2E4365] text-center"
        >
          SUKUMAR POKKULURI
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[#8A3B08] mt-2">
            DESIGN JOURNAL & SOFTWARE PORTFOLIO
          </span>
        </div>
      </div>

      <div className="absolute bottom-12 font-mono text-[10px] text-[#2E4365]/40 animate-pulse tracking-widest">
        CLICK ANYWHERE TO DISMISS INTRO
      </div>
    </div>
  );
}
