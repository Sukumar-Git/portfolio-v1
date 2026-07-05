import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  mode: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Coordinate references to bypass React state updates on mouse move
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const hoveredElementRef = useRef<HTMLElement | null>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile/touch interfaces
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hovered interactive elements to trigger magnetic attraction snapping
    const handleMouseOver = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      let foundInteractive: HTMLElement | null = null;

      while (target && target !== document.body) {
        if (
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.classList.contains('cursor-pointer') ||
          window.getComputedStyle(target).cursor === 'pointer'
        ) {
          foundInteractive = target;
          break;
        }
        target = target.parentElement;
      }
      
      hoveredElementRef.current = foundInteractive;
      setIsHoveringLink(!!foundInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Initial capture of coordinates
    const initialCapture = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      window.removeEventListener('mousemove', initialCapture);
    };
    window.addEventListener('mousemove', initialCapture);

    // Animation Loop
    let animationId = 0;
    const updateCursor = () => {
      const lerp = (start: number, end: number, amt: number) => {
        return (1 - amt) * start + amt * end;
      };

      let targetX = mouse.current.x;
      let targetY = mouse.current.y;

      // Magnetic center-snapping logic like CAD software
      if (hoveredElementRef.current) {
        const rect = hoveredElementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Pull cursor coordinate 38% towards the button center coordinates
        targetX = mouse.current.x + (centerX - mouse.current.x) * 0.38;
        targetY = mouse.current.y + (centerY - mouse.current.y) * 0.38;
      }

      // Smooth follow LERP (0.24 factor for highly fluid snap transition)
      pos.current.x = lerp(pos.current.x, targetX, 0.24);
      pos.current.y = lerp(pos.current.y, targetY, 0.24);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationId = requestAnimationFrame(updateCursor);
    };

    animationId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef}
      className={`hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform mix-blend-difference transition-all duration-200 ease-out`}
      style={{ transform: `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)` }}
    >
      <div className={`relative flex items-center justify-center w-8 h-8 transition-transform duration-300 ${isClicking ? 'scale-[0.8] rotate-[45deg]' : 'scale-100 rotate-0'}`}>
        {/* Horizontal crosshair line */}
        <div className="absolute w-6 h-[1.5px] bg-white opacity-90 rounded-sm" />
        
        {/* Vertical crosshair line */}
        <div className="absolute h-6 w-[1.5px] bg-white opacity-90 rounded-sm" />

        {/* CAD Snap Indicator box (appears dynamically when snapped to button center) */}
        <div className={`absolute w-3.5 h-3.5 border-[1.5px] border-white transition-all duration-300 ease-out ${
          isHoveringLink ? 'scale-100 opacity-100 rotate-[-45deg]' : 'scale-0 opacity-0 rotate-0'
        }`} />
      </div>
    </div>
  );
};
