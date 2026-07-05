import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { playXpSound } from '../utils/audio';

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
  const hasFinishedRef = useRef(false);

  // Dynamic subset of 3 greetings to keep the experience beautifully balanced and paced
  const [activeGreetings] = useState(() => {
    const telugu = GREETINGS.find(g => g.lang === "Telugu") || GREETINGS[1];
    const others = GREETINGS.filter(g => g.lang !== "Telugu");
    const shuffled = [...others].sort(() => 0.5 - Math.random());
    return [shuffled[0], telugu, shuffled[1]];
  });

  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    onComplete();
  };

  useGSAP(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      handleFinish();
      return;
    }

    const q = gsap.utils.selector(containerRef);
    const greetingEls = q('.greeting-word');
    const nameEl = q('.final-name');
    const activeWords = [...greetingEls, nameEl];
    
    // Initial state: subtle blur, scale down, invisible for Butter-smooth slide up
    gsap.set(activeWords, { opacity: 0, scale: 0.94, filter: 'blur(8px)', y: 15 });

    // GSAP Kinetic Typography Timeline - strictly engineered to end beautifully around 5.0 seconds
    const tl = gsap.timeline({
      onComplete: handleFinish
    });

    // Animate each greeting with highly polished, fluid pacing
    greetingEls.forEach((wordEl, index) => {
      // Smooth slide up & fade in
      tl.to(wordEl, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        ease: 'power3.out'
      }, index === 0 ? 0 : `-=0.15`)
      // Butter-smooth slide up & fade out
      .to(wordEl, {
        opacity: 0,
        scale: 1.04,
        y: -15,
        filter: 'blur(5px)',
        duration: 0.3,
        delay: 0.5,
        ease: 'power3.in'
      });
    });

    // Final Name State - elegant reveal of your name
    tl.to(nameEl, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.7,
      ease: 'power4.out'
    }, '-=0.15')
    // Hold it for a moment, then prepare for the transition
    .to(nameEl, {
      opacity: 0,
      scale: 1.05,
      y: -10,
      filter: 'blur(4px)',
      duration: 0.35,
      delay: 0.5,
      ease: 'power3.in'
    });

    // Premium Transition: container scales up slightly and blurs out, simulating a physical notebook page zoom-in
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(8px)',
      duration: 0.5,
      ease: 'power2.inOut'
    }, '-=0.35');
  }, { scope: containerRef, dependencies: [onComplete] });

  return (
    <div
      id="opening-experience-root"
      ref={containerRef}
      onClick={() => {
        playXpSound();
        handleFinish();
      }}
      className="fixed inset-0 z-[1000] flex flex-col justify-center items-center bg-[#EBDDC5] cursor-pointer overflow-hidden custom-select select-none"
    >
      {/* Subtle Background Notebook Lines for Cohesion */}
      <div className="absolute inset-0 notebook-grid-overlay opacity-30 pointer-events-none" />

      {/* Skipping affordance */}
      <button
        ref={skipBtnRef}
        onClick={(e) => {
          e.stopPropagation();
          playXpSound();
          handleFinish();
        }}
        className="absolute top-8 right-8 z-[1010] px-4 py-2 border border-[#2E4365]/30 rounded font-mono text-xs text-[#2E4365]/60 hover:text-[#2E4365] hover:border-[#2E4365] transition-all bg-[#EBDDC5]/80 active:scale-95 cursor-pointer"
      >
        [ ESCAPE / SKIP ]
      </button>

      {/* Typography Stage */}
      <div className="relative flex justify-center items-center h-48 w-full max-w-4xl px-4">
        {/* Dynamic Greetings */}
        {activeGreetings.map((greeting, index) => (
          <div
            key={index}
            className="greeting-word absolute font-hand text-5xl md:text-8xl text-center"
            style={{ color: greeting.color, opacity: 0 }}
          >
            {greeting.text}
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[#2E4365]/30 mt-1">
              {greeting.lang}
            </span>
          </div>
        ))}

        {/* Final Name State */}
        <div
          className="final-name absolute font-display font-black text-4xl md:text-7xl uppercase tracking-tight text-[#2E4365] text-center"
          style={{ opacity: 0 }}
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

