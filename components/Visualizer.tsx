import React from 'react';

interface VisualizerProps {
  code: string;
  isActive: boolean;
  activeCharIndex?: number;
}

const Visualizer: React.FC<VisualizerProps> = ({ code, isActive, activeCharIndex = -1 }) => {
  return (
    <div className="flex items-center justify-center gap-2 h-16">
      {code.split('').map((symbol, idx) => (
        <div
          key={idx}
          className={`
            transition-all duration-200 
            ${symbol === '.' ? 'w-4 h-4 rounded-full' : 'w-12 h-4 rounded-md'}
            ${isActive ? 'bg-morse-accent shadow-[0_0_15px_rgba(245,158,11,0.6)]' : 'bg-morse-muted/30'}
          `}
        />
      ))}
    </div>
  );
};

export default Visualizer;
