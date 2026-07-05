import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { playXpSound } from '../utils/audio';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number; // 0 to 1, default 0.35
  onClick?: (e: React.MouseEvent<any>) => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magneticStrength = 0.35,
  href,
  target,
  rel,
  type = 'button',
  disabled,
  onClick,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values to track distance from button center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs to make translation look springy and organic
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate center coordinates of the button
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;

    // Calculate mouse distance from center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Attract the button towards the mouse
    x.set(mouseX * magneticStrength);
    y.set(mouseY * magneticStrength);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<any>) => {
    playXpSound();
    if (onClick) onClick(e);
  };

  const commonProps = {
    ref: ref as any,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    style: {
      x: springX,
      y: springY,
      transformStyle: 'preserve-3d' as const,
    },
    animate: {
      scale: hovered ? 1.02 : 1,
      // Increased mechanical shadow on hover
      boxShadow: hovered 
        ? '5px 5px 0px rgba(46, 67, 101, 0.25)' 
        : '2px 2px 0px rgba(46, 67, 101, 0.08)',
    },
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20
    },
    className: `relative select-none ${className}`,
    ...props
  };

  if (href) {
    return (
      <motion.a 
        href={href} 
        target={target} 
        rel={rel} 
        {...commonProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button 
      type={type} 
      disabled={disabled} 
      {...commonProps}
    >
      {children}
    </motion.button>
  );
};
