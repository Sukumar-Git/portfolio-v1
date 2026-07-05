import React from 'react';

export default function HeroOrbit() {
  const skills = [
    { name: 'React', color: '#2E4365', delay: '0s', radius: 90, speed: 20 },
    { name: 'Node', color: '#8A3B08', delay: '-3.3s', radius: 130, speed: 28 },
    { name: 'MongoDB', color: '#2A6B4E', delay: '-6.6s', radius: 170, speed: 36 },
    { name: 'AI', color: '#E5902C', delay: '-10s', radius: 90, speed: 20 },
    { name: 'Cloud', color: '#3B5A80', delay: '-13.3s', radius: 130, speed: 28 },
    { name: 'DevOps', color: '#92301A', delay: '-16.6s', radius: 170, speed: 36 }
  ];

  return (
    <div className="relative w-[340px] h-[340px] flex items-center justify-center select-none pointer-events-auto">
      {/* Outer concentric orbit lines */}
      <div className="absolute w-[180px] h-[180px] border border-dashed border-[#2E4365]/20 rounded-full animate-[spin_20s_linear_infinite]" style={{ willChange: 'transform' }} />
      <div className="absolute w-[260px] h-[260px] border border-dashed border-[#2E4365]/15 rounded-full animate-[spin_28s_linear_infinite_reverse]" style={{ willChange: 'transform' }} />
      <div className="absolute w-[340px] h-[340px] border border-dashed border-[#2E4365]/10 rounded-full animate-[spin_36s_linear_infinite]" style={{ willChange: 'transform' }} />

      {/* Center core */}
      <div className="relative z-10 w-24 h-24 rounded-full bg-[#E5902C] border-2 border-[#2E4365] flex flex-col items-center justify-center shadow-md">
        <span className="font-display font-black text-xs uppercase tracking-widest text-[#EBDDC5] text-center">
          SUKUMAR
        </span>
        {/* Decorative inner circle */}
        <div className="absolute inset-1.5 border border-dashed border-[#EBDDC5]/40 rounded-full animate-[spin_10s_linear_infinite]" style={{ willChange: 'transform' }} />
      </div>

      {/* Orbiting items */}
      {skills.map((skill, index) => {
        return (
          <div
            key={index}
            className="absolute"
            style={{
              width: `${skill.radius * 2}px`,
              height: `${skill.radius * 2}px`,
              animation: `spin-${index} ${skill.speed}s linear infinite`,
              animationDelay: skill.delay,
              willChange: 'transform'
            }}
          >
            {/* The actual label */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 border border-[#2E4365] bg-[#F5EBD8] font-mono text-[9px] font-bold rounded-full shadow-xs hover:scale-110 hover:bg-[#EBDDC5] transition-all cursor-pointer"
              style={{
                color: skill.color,
                animation: `spin-${index}-reverse ${skill.speed}s linear infinite`,
                animationDelay: skill.delay,
                willChange: 'transform'
              }}
            >
              {skill.name}
            </div>

            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes spin-${index} {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes spin-${index}-reverse {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(-360deg); }
                }
              `
            }} />
          </div>
        );
      })}
    </div>
  );
}
