import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ArchitectureDiagramProps {
  nodes: string[];
}

export default function ArchitectureDiagram({ nodes }: ArchitectureDiagramProps) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="flex flex-col items-center py-4 px-2 bg-[#EBDDC5]/30 border border-dashed border-[#2E4365]/20 rounded-sm relative select-none">
      <div className="absolute top-2 left-2 text-[10px] font-mono text-[#8A3B08] tracking-widest uppercase">
        [ DIAGRAM // FLOW ]
      </div>

      <div className="flex flex-col items-center gap-2 mt-4 w-full">
        {nodes.map((node, idx) => {
          const isLast = idx === nodes.length - 1;
          return (
            <React.Fragment key={idx}>
              {/* Node Card Box */}
              <div 
                className="w-full max-w-[200px] bg-[#F5EBD8] border border-[#2E4365] px-3 py-2 rounded-sm text-center shadow-xs hover:border-[#E5902C] hover:shadow-md transition-all relative group"
                style={{
                  transform: `rotate(${(idx % 2 === 0 ? 0.7 : -0.7)}deg)`,
                  boxShadow: '2px 2px 0px rgba(46, 67, 101, 0.08)'
                }}
              >
                {/* Visual binder hole dot on left */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#EBDDC5] border border-[#2E4365]/30 rounded-full" />
                
                <span className="font-mono text-[10px] text-[#8A3B08] block mb-0.5">
                  0{idx + 1}
                </span>
                <span className="font-sans font-bold text-xs text-[#2E4365] uppercase tracking-tight block">
                  {node}
                </span>
              </div>

              {/* Connected Arrow */}
              {!isLast && (
                <div className="flex flex-col items-center my-1 text-[#2E4365]/40 group-hover:text-[#E5902C]">
                  {/* Vertical dotted track */}
                  <div className="h-6 w-0.5 border-l border-dashed border-[#2E4365]/40" />
                  <ArrowDown className="w-3 h-3 text-[#2E4365]/60 -mt-1" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
