import React, { useState, useEffect } from 'react';
import { MorseChar } from '../types';
import { morseAudio } from '../utils/audioUtils';
import VisualMnemonic from './VisualMnemonic';
import { Volume2, ArrowRight, RotateCcw, Lightbulb, Sparkles } from 'lucide-react';
import { getCreativeMnemonic } from '../services/geminiService';

interface LearningCardProps {
  charData: MorseChar;
  onNext: () => void;
}

const LearningCard: React.FC<LearningCardProps> = ({ charData, onNext }) => {
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
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto bg-morse-card/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/5 relative overflow-hidden group">
      
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-morse-accent to-transparent opacity-75" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[80px]" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-600/10 rounded-full blur-[80px]" />

      <div className="w-full p-8 flex flex-col items-center z-10">
        
        {/* Header Section */}
        <div className="w-full flex justify-between items-center mb-2">
            <span className="text-morse-muted/70 font-mono text-xs tracking-widest uppercase flex items-center gap-1">
              <Sparkles size={12} /> Visual Memory
            </span>
            {/* SVG Morse Display */}
            <div className="flex items-center gap-1.5 h-8">
              {charData.code.split('').map((symbol, idx) => (
                <svg
                  key={idx}
                  width={symbol === '.' ? 14 : 36}
                  height={14}
                  className="overflow-visible"
                >
                  <rect
                    x={0}
                    y={0}
                    width={symbol === '.' ? 14 : 36}
                    height={14}
                    rx={7}
                    className="fill-morse-accent drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]"
                  />
                </svg>
              ))}
            </div>
        </div>

        {/* Visual Mnemonic Area */}
        <div 
          className="cursor-pointer transform transition-all hover:scale-105 active:scale-95 duration-500 py-4"
          onClick={handlePlay}
        >
            <VisualMnemonic 
                charData={charData} 
                isActive={isPlaying} 
                activeElementIndex={activeIndex} 
            />
        </div>

        {/* Audio Control */}
        <button
          onClick={handlePlay}
          className="mt-4 mb-8 flex items-center gap-3 px-8 py-2.5 bg-morse-bg/60 hover:bg-morse-bg text-white rounded-full border border-white/10 transition-all hover:border-morse-accent/50 group shadow-lg"
        >
          <Volume2 size={20} className={`text-morse-accent ${isPlaying ? 'animate-pulse' : ''}`} />
          <span className="text-sm font-medium group-hover:text-morse-accent transition-colors">
            {isPlaying ? "播放中..." : "点击听声音"}
          </span>
        </button>

        {/* Memory Hook Section */}
        <div className="w-full space-y-4">
            <div className="bg-gradient-to-br from-morse-dark/60 to-morse-card rounded-2xl p-6 border border-white/5 text-center shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                <h3 className="text-morse-accent text-xs font-bold uppercase tracking-widest mb-3 opacity-80">核心助记</h3>
                <p className="text-2xl text-white font-bold tracking-wide mb-3">{charData.mnemonic}</p>
                <p className="text-morse-muted text-sm leading-relaxed border-t border-white/5 pt-3 mt-3">{charData.description}</p>
            </div>

            {/* AI Hint Section */}
            {!aiTip ? (
                <button 
                    onClick={fetchAiTip}
                    disabled={loadingAi}
                    className="w-full py-3 flex items-center justify-center gap-2 text-xs font-medium text-morse-muted hover:text-morse-accent border border-dashed border-white/10 hover:border-morse-accent/30 rounded-xl hover:bg-morse-accent/5 transition-all"
                >
                    <Lightbulb size={14} />
                    {loadingAi ? "AI 正在联想..." : "记不住？让 AI 讲个故事"}
                </button>
            ) : (
                <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-4 animate-fade-in relative overflow-hidden text-left">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50" />
                    <div className="flex gap-3">
                        <Lightbulb size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-indigo-100 leading-relaxed">{aiTip}</p>
                    </div>
                </div>
            )}
        </div>

        {/* Action Bar */}
        <div className="w-full mt-8 pt-6 border-t border-white/5 flex gap-4">
            <button 
                onClick={handlePlay} 
                className="p-4 rounded-xl bg-morse-bg/50 hover:bg-white/10 text-morse-muted hover:text-white transition-colors border border-white/5"
                aria-label="Replay"
            >
                <RotateCcw size={20} />
            </button>
            <button
                onClick={onNext}
                className="flex-1 py-4 bg-morse-accent hover:bg-amber-400 text-morse-dark font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
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