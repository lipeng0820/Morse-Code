import React, { useState, useEffect } from 'react';
import { MorseChar } from '../types';
import { morseAudio } from '../utils/audioUtils';
import VisualMnemonic from './VisualMnemonic';
import { Volume2, ArrowRight, RotateCcw, Lightbulb, Sparkles, ArrowLeft } from 'lucide-react';
import { getCreativeMnemonic } from '../services/geminiService';

interface LearningCardProps {
  charData: MorseChar;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
}

const LearningCard: React.FC<LearningCardProps> = ({ charData, onNext, onPrev, hasPrev }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Parse code length for visualization sync
  const codeSymbols = charData.code.split('');

  const handlePlay = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setActiveIndex(-1);

    // Custom sequencer to sync visualizer with audio
    const unitTime = 80; // Must match audioUtils roughly
    let accumulatedTime = 0;

    // Start Audio
    morseAudio.playCode(charData.code);

    // Sync Visuals
    codeSymbols.forEach((symbol, idx) => {
        const duration = symbol === '.' ? unitTime : unitTime * 3;
        
        setTimeout(() => {
            setActiveIndex(idx);
        }, accumulatedTime);

        accumulatedTime += duration + unitTime; // duration + gap
    });

    // Reset after done
    setTimeout(() => {
        setIsPlaying(false);
        setActiveIndex(-1);
    }, accumulatedTime + 200);
  };

  // Reset state when char changes
  useEffect(() => {
    setAiTip(null);
    setActiveIndex(-1);
    setIsPlaying(false);
    
    // Auto-play hint on mount
    const timer = setTimeout(() => {
        handlePlay();
    }, 500);
    return () => clearTimeout(timer);
  }, [charData]);

  const fetchAiTip = async () => {
    setLoadingAi(true);
    const tip = await getCreativeMnemonic(charData);
    setAiTip(tip);
    setLoadingAi(false);
  };

  return (
    <div className="w-full max-w-4xl bg-morse-card/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/5 relative overflow-hidden flex flex-col md:flex-row h-auto min-h-[400px]">
      
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-morse-accent to-transparent opacity-75 md:hidden" />
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-morse-accent to-transparent opacity-75 hidden md:block" />
      
      {/* Left Panel: Visual (Top on mobile) */}
      <div className="flex-1 bg-black/20 p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-white/5">
         
         <div className="absolute top-4 left-4 text-morse-muted/50 font-mono text-[10px] tracking-widest uppercase flex items-center gap-1">
            <Sparkles size={10} /> Visual Memory
         </div>

         <div 
          className="cursor-pointer transform transition-all hover:scale-105 active:scale-95 duration-500 relative z-10"
          onClick={handlePlay}
        >
            <div className="w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
                 <VisualMnemonic 
                    charData={charData} 
                    isActive={isPlaying} 
                    activeElementIndex={activeIndex} 
                />
            </div>
        </div>
        
        {/* SVG Morse Display (Compact) */}
        <div className="mt-4 flex items-center gap-1.5 h-6 opacity-80">
            {charData.code.split('').map((symbol, idx) => (
            <svg key={idx} width={symbol === '.' ? 10 : 28} height={10} className="overflow-visible">
                <rect
                x={0} y={0} width={symbol === '.' ? 10 : 28} height={10} rx={5}
                className={`fill-morse-accent drop-shadow-[0_0_6px_rgba(245,158,11,0.6)] ${activeIndex === idx ? 'fill-white' : ''}`}
                />
            </svg>
            ))}
        </div>
      </div>

      {/* Right Panel: Content & Controls */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        
        <div>
            {/* Core Mnemonic */}
            <div className="mb-6">
                <h3 className="text-morse-accent text-xs font-bold uppercase tracking-widest mb-2 opacity-80">核心助记</h3>
                <div className="text-3xl text-white font-bold tracking-wide mb-3">{charData.mnemonic}</div>
                <div className="text-morse-muted text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                    {charData.description}
                </div>
            </div>

            {/* AI Hint Section */}
            <div className="min-h-[80px]">
                {!aiTip ? (
                    <button 
                        onClick={fetchAiTip}
                        disabled={loadingAi}
                        className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-morse-muted hover:text-morse-accent border border-dashed border-white/10 hover:border-morse-accent/30 rounded-lg hover:bg-morse-accent/5 transition-all"
                    >
                        <Lightbulb size={14} />
                        {loadingAi ? "AI 正在联想..." : "记不住？让 AI 讲个故事"}
                    </button>
                ) : (
                    <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-3 animate-fade-in flex gap-3 items-start">
                        <Lightbulb size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-indigo-100 leading-relaxed">{aiTip}</p>
                    </div>
                )}
            </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-4 gap-3">
             {/* Prev Button */}
             <button 
                onClick={onPrev}
                disabled={!hasPrev}
                className={`col-span-1 p-3 rounded-xl border flex items-center justify-center transition-colors ${
                    hasPrev 
                    ? 'bg-morse-bg/50 hover:bg-white/10 text-morse-muted hover:text-white border-white/5' 
                    : 'bg-transparent text-white/10 border-transparent cursor-not-allowed'
                }`}
                aria-label="Previous"
            >
                <ArrowLeft size={20} />
            </button>

            {/* Play/Replay Button */}
            <button 
                onClick={handlePlay}
                className={`col-span-1 p-3 rounded-xl bg-morse-bg/50 hover:bg-white/10 border border-white/5 transition-colors flex items-center justify-center group ${isPlaying ? 'border-morse-accent/50' : ''}`}
                aria-label="Play Sound"
            >
                {isPlaying ? <Volume2 size={20} className="text-morse-accent animate-pulse" /> : <RotateCcw size={20} className="text-morse-muted group-hover:text-white" />}
            </button>
            
            {/* Next Button */}
            <button
                onClick={onNext}
                className="col-span-2 py-3 bg-morse-accent hover:bg-amber-400 text-morse-dark font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
                <span>下一个</span>
                <ArrowRight size={20} />
            </button>
        </div>

      </div>
    </div>
  );
};

export default LearningCard;