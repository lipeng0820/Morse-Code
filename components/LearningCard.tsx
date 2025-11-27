
import React, { useState, useEffect, useContext } from 'react';
import { MorseChar, CharContent } from '../types';
import { morseAudio } from '../utils/audioUtils';
import VisualMnemonic from './VisualMnemonic';
import { Volume2, ArrowRight, RotateCcw, Lightbulb, Sparkles, ArrowLeft, RefreshCw, Undo2, Check } from 'lucide-react';
import { getCreativeMnemonic } from '../services/geminiService';
import { LanguageContext } from '../App';

interface LearningCardProps {
  charData: MorseChar;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
}

const LearningCard: React.FC<LearningCardProps> = ({ charData, onNext, onPrev, hasPrev }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  // AI State
  const [userInput, setUserInput] = useState('');
  const [generatedResult, setGeneratedResult] = useState<CharContent | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [isReplaced, setIsReplaced] = useState(false);
  
  const { ui, lang } = useContext(LanguageContext);

  // Parse code length for visualization sync
  const codeSymbols = charData.code.split('');

  // Current Display Data (System Default or User Custom)
  const displayData = isReplaced && generatedResult 
    ? { ...charData, ...generatedResult } 
    : charData;

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
    setGeneratedResult(null);
    setUserInput('');
    setIsReplaced(false);
    setLoadingAi(false);
    setActiveIndex(-1);
    setIsPlaying(false);
    
    // Auto-play hint on mount
    const timer = setTimeout(() => {
        handlePlay();
    }, 500);
    return () => clearTimeout(timer);
  }, [charData.char]);

  const handleGenerateAi = async () => {
    if (loadingAi) return;
    setLoadingAi(true);
    try {
        const result = await getCreativeMnemonic(charData, lang, userInput);
        setGeneratedResult(result);
    } catch (e) {
        console.error(e);
    }
    setLoadingAi(false);
  };

  const handleReplace = () => {
    setIsReplaced(true);
  };

  const handleRestore = () => {
    setIsReplaced(false);
  };

  return (
    <div className="w-full max-w-4xl bg-morse-card/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/5 relative overflow-hidden flex flex-col md:flex-row h-auto min-h-[400px]">
      
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-morse-accent to-transparent opacity-75 md:hidden" />
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-morse-accent to-transparent opacity-75 hidden md:block" />
      
      {/* Left Panel: Visual (Top on mobile) */}
      <div className="flex-1 bg-black/20 p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-white/5">
         
         <div className="absolute top-4 left-4 text-morse-muted/50 font-mono text-[10px] tracking-widest uppercase flex items-center gap-1">
            <Sparkles size={10} /> {ui.card.visual}
         </div>

         <div 
          className="cursor-pointer transform transition-all hover:scale-105 active:scale-95 duration-500 relative z-10"
          onClick={handlePlay}
        >
            <div className="w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
                 <VisualMnemonic 
                    charData={displayData} 
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
        
        <div className="flex-1 overflow-y-auto pr-1">
            {/* Core Mnemonic */}
            <div className="mb-6 relative">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-morse-accent text-xs font-bold uppercase tracking-widest opacity-80">{ui.card.core}</h3>
                    {isReplaced && (
                        <button 
                            onClick={handleRestore}
                            className="text-[10px] flex items-center gap-1 text-morse-muted hover:text-white bg-white/5 px-2 py-1 rounded-full transition-colors"
                        >
                            <Undo2 size={10} /> {ui.card.ai_btn_restore}
                        </button>
                    )}
                </div>
                
                <div className="text-3xl text-white font-bold tracking-wide mb-3 break-words">
                    {displayData.mnemonic}
                </div>
                <div className="text-morse-muted text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 relative">
                    {displayData.description}
                    {isReplaced && <Sparkles size={14} className="absolute top-2 right-2 text-morse-accent/50" />}
                </div>
            </div>

            {/* AI Assistant Section */}
            <div className="bg-indigo-950/20 border border-indigo-500/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3 text-indigo-300">
                    <Lightbulb size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">{ui.card.ai_title}</span>
                </div>
                
                <div className="flex gap-2 mb-3">
                    <input 
                        type="text" 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={ui.card.ai_placeholder}
                        className="flex-1 bg-black/20 text-indigo-100 text-xs px-3 py-2 rounded-lg border border-indigo-500/20 focus:border-indigo-400 focus:outline-none placeholder:text-indigo-400/30"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateAi()}
                    />
                    <button 
                        onClick={handleGenerateAi}
                        disabled={loadingAi}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg disabled:opacity-50 transition-colors shrink-0"
                    >
                        {loadingAi ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    </button>
                </div>

                {generatedResult && (
                    <div className="bg-black/30 rounded-lg p-3 border border-indigo-500/20 animate-fade-in">
                        <div className="text-sm font-bold text-indigo-200 mb-1">{generatedResult.mnemonic}</div>
                        <p className="text-xs text-indigo-300/80 leading-relaxed mb-3">{generatedResult.description}</p>
                        
                        {!isReplaced && (
                            <button 
                                onClick={handleReplace}
                                className="w-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 py-1.5 rounded border border-indigo-500/20 transition-all"
                            >
                                <Check size={12} /> {ui.card.ai_btn_replace}
                            </button>
                        )}
                         {isReplaced && (
                            <div className="w-full text-center text-[10px] text-green-400 py-1.5 flex items-center justify-center gap-1">
                                <Check size={12} /> Applied
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-4 gap-3 shrink-0">
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
                <span>{ui.card.next}</span>
                <ArrowRight size={20} />
            </button>
        </div>

      </div>
    </div>
  );
};

export default LearningCard;
