import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // ms per character stagger
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  textAlign?: 'left' | 'center' | 'right';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  delay = 30,
  duration = 0.5,
  ease = 'power2.out',
  splitType = 'chars',
  from = { opacity: 0, y: 8, rotate: -3 },
  to = { opacity: 1, y: 0, rotate: 0 },
  threshold = 0.1,
  textAlign = 'center',
  tag: Tag = 'p',
  onLetterAnimationComplete
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    
    // Select the split elements
    const targets = el.querySelectorAll('.split-item');
    if (targets.length === 0) return;

    // Set initial values
    gsap.set(targets, from);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: `top bottom-=${threshold * 100}%`,
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: onLetterAnimationComplete
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), threshold]);

  const words = text.split(' ');

  return (
    <Tag
      ref={containerRef as any}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        willChange: 'transform, opacity'
      }}
    >
      {splitType === 'chars' ? (
        words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split('').map((char, cIdx) => (
              <span
                key={cIdx}
                className="split-item inline-block will-change-transform"
                style={{ display: 'inline-block' }}
              >
                {char}
              </span>
            ))}
          </span>
        ))
      ) : (
        words.map((word, wIdx) => (
          <span
            key={wIdx}
            className="split-item inline-block mr-[0.25em] will-change-transform"
            style={{ display: 'inline-block' }}
          >
            {word}
          </span>
        ))
      )}
    </Tag>
  );
}
