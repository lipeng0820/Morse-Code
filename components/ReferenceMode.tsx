
import React, { useState } from 'react';
import { morseAudio } from '../utils/audioUtils';
import { MORSE_NUMBERS, MORSE_PUNCTUATION, MORSE_PROSIGNS, MORSE_ABBR, RefItem } from '../constants_reference';
import { Volume2, Hash, Type, Radio, MessageCircle } from 'lucide-react';

// --- Subcomponent: SVG Morse Display ---
const MorseSvgDisplay: React.FC<{ code: string, isActive: boolean }> = ({ code, isActive }) => {
  return (
    <div className="flex items-center gap-1">
      {code.split('').map((symbol, idx) => {
        if (symbol === ' ') return <div key={idx} className="w-2" />; // Handle internal spaces
        
        const isDot = symbol === '.';
        const width = isDot ? 8 : 22;
        const height = 8;
        
        return (
          <svg key={idx} width={width} height={height} className="overflow-visible">
            <rect
              x={0}
              y={0}
              width={width}
              height={height}
              rx={height / 2}
              className={`transition-colors duration-300 ${
                isActive 
                  ? 'fill-morse-dark shadow-none' // When active (bg is accent), dots become dark
                  : 'fill-morse-accent shadow-[0_0_5px_rgba(245,158,11,0.4)]' // Default
              }`}
            />
          </svg>
        );
      })}
    </div>
  );
};

const SectionTitle: React.FC<{ icon: React.ReactNode, title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-4 text-morse-accent border-b border-white/5 pb-2 mt-8 first:mt-0">
    {icon}
    <h3 className="font-bold text-lg tracking-wide uppercase">{title}</h3>
  </div>
);

const ReferenceGrid: React.FC<{ items: RefItem[], cols?: number }> = ({ items, cols = 2 }) => {
  const [playing, setPlaying] = useState<string | null>(null);

  const handlePlay = (code: string, label: string) => {
    if (playing) return;
    setPlaying(label);
    morseAudio.playCode(code, () => setPlaying(null));
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-3`}>
      {items.map((item) => {
        const isActive = playing === item.label;
        
        return (
            <button
            key={item.label}
            onClick={() => handlePlay(item.code, item.label)}
            className={`
                group flex flex-col p-4 rounded-xl border transition-all h-full
                ${isActive 
                ? 'bg-morse-accent border-morse-accent text-morse-dark scale-[1.02] shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                : 'bg-morse-card/50 border-white/5 hover:bg-white/5 hover:border-white/10 text-morse-text'}
            `}
            >
            {/* Top Row: Label and Code */}
            <div className="flex items-center justify-between w-full mb-2">
                <span className={`font-bold font-mono text-xl truncate mr-2 ${isActive ? 'text-morse-dark' : 'text-white'}`}>
                    {item.label}
                </span>
                
                <div className="flex items-center gap-3 shrink-0">
                    <MorseSvgDisplay code={item.code} isActive={isActive} />
                    <Volume2 size={16} className={isActive ? 'animate-pulse text-morse-dark' : 'opacity-0 group-hover:opacity-50 text-morse-accent'} />
                </div>
            </div>

            {/* Bottom Row: Description */}
            {item.desc && (
                <span className={`text-left text-xs w-full leading-relaxed ${isActive ? 'text-morse-dark/80' : 'text-morse-muted'}`}>
                    {item.desc}
                </span>
            )}
            </button>
        );
      })}
    </div>
  );
};

const ReferenceMode: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'NUM' | 'SYM' | 'ABBR'>('NUM');

  return (
    <div className="w-full max-w-4xl mx-auto p-4 h-full flex flex-col">
       
       <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">信号手册</h2>
            <p className="text-sm text-morse-muted">完整的数字、标点与通信缩写数据库。</p>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-white/5 p-1 rounded-lg shrink-0">
             <button 
               onClick={() => setActiveTab('NUM')}
               className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'NUM' ? 'bg-morse-accent text-morse-dark shadow-sm' : 'text-morse-muted hover:text-white'}`}
             >
               数字
             </button>
             <button 
               onClick={() => setActiveTab('SYM')}
               className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'SYM' ? 'bg-morse-accent text-morse-dark shadow-sm' : 'text-morse-muted hover:text-white'}`}
             >
               标点
             </button>
             <button 
               onClick={() => setActiveTab('ABBR')}
               className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'ABBR' ? 'bg-morse-accent text-morse-dark shadow-sm' : 'text-morse-muted hover:text-white'}`}
             >
               缩写与勤务
             </button>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto pr-2 pb-10">
          
          {activeTab === 'NUM' && (
            <div className="animate-fade-in">
                <SectionTitle icon={<Hash size={20} />} title="标准数字 (Numbers)" />
                <p className="text-morse-muted text-sm mb-4 bg-white/5 p-3 rounded-lg border border-white/5 leading-relaxed">
                   摩斯数字始终由 5 个符号组成。
                   <br/>左栏 1-5 以<span className="text-morse-accent">点</span>开头（点的数量等于数字）。
                   <br/>右栏 6-0 以<span className="text-morse-accent">划</span>开头（划的数量等于数字减 5，0 除外）。
                </p>
                {/* Special Layout for Numbers: Split 1-5 and 6-0 into two columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ReferenceGrid items={MORSE_NUMBERS.slice(0, 5)} cols={1} />
                    <ReferenceGrid items={MORSE_NUMBERS.slice(5, 10)} cols={1} />
                </div>
            </div>
          )}

          {activeTab === 'SYM' && (
             <div className="animate-fade-in">
                <SectionTitle icon={<Type size={20} />} title="标点符号 (Punctuation)" />
                <ReferenceGrid items={MORSE_PUNCTUATION} cols={2} />
             </div>
          )}

          {activeTab === 'ABBR' && (
             <div className="animate-fade-in">
                <SectionTitle icon={<Radio size={20} />} title="勤务符号 (Prosigns)" />
                <p className="text-morse-muted text-sm mb-4 bg-white/5 p-3 rounded-lg border border-white/5">
                   勤务符号通常作为单个字符发送（字符间无停顿），用于控制通信流程。
                </p>
                <ReferenceGrid items={MORSE_PROSIGNS} cols={2} />
                
                <SectionTitle icon={<MessageCircle size={20} />} title="常用缩写与Q简语" />
                 <p className="text-morse-muted text-sm mb-4 bg-white/5 p-3 rounded-lg border border-white/5">
                   在实际电报（CW）通信中，为了提高效率，广泛使用缩写。
                </p>
                <ReferenceGrid items={MORSE_ABBR} cols={2} />
             </div>
          )}

       </div>
    </div>
  );
};

export default ReferenceMode;
