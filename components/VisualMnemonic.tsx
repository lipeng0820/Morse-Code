import React from 'react';
import { MorseChar } from '../types';

interface VisualMnemonicProps {
  charData: MorseChar;
  isActive: boolean;
  activeElementIndex: number; // Which dot/dash is currently playing
}

const VisualMnemonic: React.FC<VisualMnemonicProps> = ({ charData, isActive, activeElementIndex }) => {
  // Default visualization if no overlay config exists
  const overlay = charData.visualOverlay?.elements || [];
  const hasOverlay = overlay.length > 0;

  return (
    <div className="relative w-80 h-80 flex items-center justify-center select-none my-4">
      {/* Dynamic Background Glow - Pulse when active */}
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isActive 
            ? 'bg-morse-accent/5 blur-[90px] scale-110 opacity-100' 
            : 'bg-indigo-500/5 blur-[60px] scale-100 opacity-50'
        }`} 
      />

      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full overflow-visible drop-shadow-2xl z-10"
      >
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* The Base Letter - Large, skeletal guide */}
        <text
          x="50"
          y="50"
          dominantBaseline="central"
          textAnchor="middle"
          fill="transparent"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          fontSize="90"
          fontWeight="900"
          className="font-sans"
          style={{ fontFamily: '"Noto Sans SC", "Inter", sans-serif' }}
        >
          {charData.char}
        </text>
        
        {/* Solid letter fill for readability behind dots */}
        <text
          x="50"
          y="50"
          dominantBaseline="central"
          textAnchor="middle"
          fill="rgba(255,255,255,0.05)"
          fontSize="90"
          fontWeight="900"
          className="font-sans"
          style={{ fontFamily: '"Noto Sans SC", "Inter", sans-serif' }}
        >
          {charData.char}
        </text>

        {/* The Morse Overlay Elements */}
        {hasOverlay && overlay.map((el, idx) => {
          const isCurrent = isActive && activeElementIndex === idx;
          const isPlayed = isActive && activeElementIndex > idx;
          const isInactive = !isActive;
          
          return (
            <g 
              key={idx} 
              transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation || 0}) scale(${el.scale || 1})`}
              className="transition-all duration-300 ease-out"
            >
              {/* Active ripple effect */}
              {isCurrent && (
                <circle 
                  r={el.type === 'dot' ? 15 : 20} 
                  className="animate-ping opacity-50 fill-none stroke-morse-accent stroke-2" 
                />
              )}

              {el.type === 'dot' ? (
                // DOT Rendering
                <g>
                   <circle
                    r="7"
                    filter={isCurrent ? "url(#neon-glow)" : ""}
                    className={`transition-all duration-200 ${
                        isCurrent ? 'fill-morse-accent stroke-white stroke-2' : 
                        isPlayed ? 'fill-morse-accent/50 stroke-none' : 
                        'fill-morse-card stroke-morse-muted/50 stroke-2'
                    }`}
                  />
                  {/* Inner shine for dot */}
                   {!isPlayed && !isCurrent && <circle r="2" fill="rgba(255,255,255,0.2)" />}
                </g>
              ) : (
                // DASH Rendering
                <g>
                    <rect
                      x="-18"
                      y="-6"
                      width="36"
                      height="12"
                      rx="6"
                      filter={isCurrent ? "url(#neon-glow)" : ""}
                      className={`transition-all duration-200 ${
                        isCurrent ? 'fill-morse-accent stroke-white stroke-2' : 
                        isPlayed ? 'fill-morse-accent/50 stroke-none' : 
                        'fill-morse-card stroke-morse-muted/50 stroke-2'
                      }`}
                    />
                     {/* Inner shine for dash */}
                     {!isPlayed && !isCurrent && <rect x="-10" y="-1" width="20" height="2" fill="rgba(255,255,255,0.1)" rx="1" />}
                </g>
              )}
            </g>
          );
        })}

        {/* Fallback for characters without specific overlay */}
        {!hasOverlay && (
             <text
             x="50"
             y="60"
             dominantBaseline="central"
             textAnchor="middle"
             fill="white"
             fontSize="40"
             fontWeight="bold"
             className="font-mono"
           >
             {charData.code}
           </text>
        )}
      </svg>
    </div>
  );
};

export default VisualMnemonic;