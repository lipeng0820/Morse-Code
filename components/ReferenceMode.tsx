
import React, { useState, useContext } from 'react';
import { morseAudio } from '../utils/audioUtils';
import { getRefItems } from '../utils/contentHelper';
import { Volume2, Hash, Type, Radio, MessageCircle } from 'lucide-react';
import { LanguageContext } from '../App';
import { RefItem } from '../types';

const MorseSvgDisplay: React.FC<{ code: string, isActive: boolean }> = ({ code, isActive }) => {
  return (
    <div className="flex items-center gap-1">
      {code.split('').map((symbol, idx) => {
        if (symbol === ' ') return <div key={idx} className="w-2" />;
        
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
                  ? 'fill-morse-dark shadow-none' 
                  : 'fill-morse-accent shadow-[0_0_5px_rgba(245,158,11,0.4)]' 
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
            <div className="flex items-center justify-between w-full mb-2">
                <span className={`font-bold font-mono text-xl truncate mr-2 ${isActive ? 'text-morse-dark' : 'text-white'}`}>
                    {item.label}
                </span>
                
                <div className="flex items-center gap-3 shrink-0">
                    <MorseSvgDisplay code={item.code} isActive={isActive} />
                    <Volume2 size={16} className={isActive ? 'animate-pulse text-morse-dark' : 'opacity-0 group-hover:opacity-50 text-morse-accent'} />
                </div>
            </div>

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
  const { ui, lang } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState<'NUM' | 'SYM' | 'ABBR'>('NUM');

  const numbers = getRefItems('NUMBERS', lang);
  const punctuation = getRefItems('PUNCTUATION', lang);
  const prosigns = getRefItems('PROSIGNS', lang);
  const abbr = getRefItems('ABBR', lang);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 h-full flex flex-col">
       
       <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{ui.reference.title}</h2>
            <p className="text-sm text-morse-muted">{ui.reference.subtitle}</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-lg shrink-0">
             <button 
               onClick={() => setActiveTab('NUM')}
               className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'NUM' ? 'bg-morse-accent text-morse-dark shadow-sm' : 'text-morse-muted hover:text-white'}`}
             >
               {ui.reference.tabs.num}
             </button>
             <button 
               onClick={() => setActiveTab('SYM')}
               className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'SYM' ? 'bg-morse-accent text-morse-dark shadow-sm' : 'text-morse-muted hover:text-white'}`}
             >
               {ui.reference.tabs.sym}
             </button>
             <button 
               onClick={() => setActiveTab('ABBR')}
               className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'ABBR' ? 'bg-morse-accent text-morse-dark shadow-sm' : 'text-morse-muted hover:text-white'}`}
             >
               {ui.reference.tabs.abbr}
             </button>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto pr-2 pb-10">
          
          {activeTab === 'NUM' && (
            <div className="animate-fade-in">
                <SectionTitle icon={<Hash size={20} />} title={ui.reference.num_title} />
                <p className="text-morse-muted text-sm mb-4 bg-white/5 p-3 rounded-lg border border-white/5 leading-relaxed">
                   {ui.reference.num_desc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ReferenceGrid items={numbers.slice(0, 5)} cols={1} />
                    <ReferenceGrid items={numbers.slice(5, 10)} cols={1} />
                </div>
            </div>
          )}

          {activeTab === 'SYM' && (
             <div className="animate-fade-in">
                <SectionTitle icon={<Type size={20} />} title={ui.reference.sym_title} />
                <ReferenceGrid items={punctuation} cols={2} />
             </div>
          )}

          {activeTab === 'ABBR' && (
             <div className="animate-fade-in">
                <SectionTitle icon={<Radio size={20} />} title={ui.reference.pro_title} />
                <p className="text-morse-muted text-sm mb-4 bg-white/5 p-3 rounded-lg border border-white/5">
                   {ui.reference.pro_desc}
                </p>
                <ReferenceGrid items={prosigns} cols={2} />
                
                <SectionTitle icon={<MessageCircle size={20} />} title={ui.reference.abbr_title} />
                 <p className="text-morse-muted text-sm mb-4 bg-white/5 p-3 rounded-lg border border-white/5">
                   {ui.reference.abbr_desc}
                </p>
                <ReferenceGrid items={abbr} cols={2} />
             </div>
          )}

       </div>
    </div>
  );
};

export default ReferenceMode;
