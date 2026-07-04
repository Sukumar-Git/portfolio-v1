import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface OpeningExperienceProps {
  onComplete: () => void;
}

export default function OpeningExperience({ onComplete }: OpeningExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const word3Ref = useRef<HTMLDivElement>(null);
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

    const activeWords = [word1Ref.current, word2Ref.current, word3Ref.current, nameRef.current];
    
    // Initial states: hide all
    gsap.set(activeWords, { opacity: 0, scale: 0.8, filter: 'blur(10px)' });

    // Word 1: Hello. (Caveat, Police Blue)
    tl.to(word1Ref.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'back.out(1.7)'
    })
    .to(word1Ref.current, {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(6px)',
      duration: 0.3,
      delay: 0.4,
      ease: 'power2.in'
    })

    // Word 2: నమస్తే. (Caveat, Marigold)
    .to(word2Ref.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.15')
    .to(word2Ref.current, {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(6px)',
      duration: 0.3,
      delay: 0.4,
      ease: 'power2.in'
    })

    // Word 3: Hola. (Caveat, Citrine Brown)
    .to(word3Ref.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.15')
    .to(word3Ref.current, {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(6px)',
      duration: 0.3,
      delay: 0.4,
      ease: 'power2.in'
    })

    // Word 4: SUKUMAR POKKULURI (Bricolage Display, Police Blue)
    .to(nameRef.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: 'power4.out'
    }, '-=0.1')
    .to(nameRef.current, {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
      duration: 0.4,
      delay: 0.6,
      ease: 'power2.in'
    });

    // Fade out main background container at the very end
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.2');

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
        className="absolute top-8 right-8 z-[1010] px-4 py-2 border border-[#2E4365]/30 rounded font-mono text-xs text-[#2E4365]/60 hover:text-[#2E4365] hover:border-[#2E4365] transition-all bg-[#EBDDC5]/80 active:scale-95"
      >
        [ ESCAPE / SKIP ]
      </button>

      {/* Typography Stage */}
      <div className="relative flex justify-center items-center h-48 w-full max-w-4xl px-4">
        {/* Word 1 */}
        <div
          ref={word1Ref}
          className="absolute font-hand text-6xl md:text-8xl text-[#2E4365]"
        >
          Hello.
        </div>

        {/* Word 2 */}
        <div
          ref={word2Ref}
          className="absolute font-hand text-6xl md:text-8xl text-[#E5902C]"
        >
          నమస్తే.
        </div>

        {/* Word 3 */}
        <div
          ref={word3Ref}
          className="absolute font-hand text-6xl md:text-8xl text-[#8A3B08]"
        >
          Hola.
        </div>

        {/* Final Name State */}
        <div
          ref={nameRef}
          className="absolute font-display font-black text-4xl md:text-7xl uppercase tracking-tight text-[#2E4365] text-center"
        >
          SUKUMAR POKKULURI
        </div>
      </div>

      <div className="absolute bottom-12 font-mono text-[10px] text-[#2E4365]/40 animate-pulse tracking-widest">
        CLICK ANYWHERE TO SKIP
      </div>
    </div>
  );
}
