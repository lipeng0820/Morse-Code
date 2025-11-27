
import React, { useState, useEffect, useRef } from 'react';
import { MORSE_DICTIONARY, PRACTICE_WORDS } from '../constants';
import { PracticeWord, PracticeType } from '../types';
import { morseAudio } from '../utils/audioUtils';
import { 
  Trophy, Volume2, Eye, Keyboard, Award, 
  Play, RotateCcw, ArrowLeft, Star, Zap, Check, X, Lightbulb 
} from 'lucide-react';

// Rank Logic
const RANKS = [
  { score: 0, title: '见习学员', color: 'text-gray-400' },
  { score: 100, title: '发报员', color: 'text-green-400' },
  { score: 500, title: '通信兵', color: 'text-blue-400' },
  { score: 1000, title: '士官长', color: 'text-purple-400' },
  { score: 2000, title: '王牌电报员', color: 'text-amber-400' },
];

const PracticeMode: React.FC = () => {
  // Game State
  const [gameState, setGameState] = useState<'MENU' | 'PLAYING' | 'SUMMARY'>('MENU');
  const [gameType, setGameType] = useState<PracticeType>(PracticeType.VISUAL);
  
  // Player Stats
  const [totalScore, setTotalScore] = useState(() => {
    const saved = localStorage.getItem('morse_score');
    return saved ? parseInt(saved) : 0;
  });
  
  // Current Session State
  const [queue, setQueue] = useState<(string | PracticeWord)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [sessionScore, setSessionScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [feedback, setFeedback] = useState<'NONE' | 'CORRECT' | 'WRONG'>('NONE');
  const [hintActive, setHintActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Determine Rank
  const currentRank = RANKS.slice().reverse().find(r => totalScore >= r.score) || RANKS[0];
  const nextRank = RANKS.find(r => r.score > totalScore);
  const progressToNext = nextRank 
    ? ((totalScore - currentRank.score) / (nextRank.score - currentRank.score)) * 100 
    : 100;

  // Persist Score
  useEffect(() => {
    localStorage.setItem('morse_score', totalScore.toString());
  }, [totalScore]);

  // Focus Input on Game Start
  useEffect(() => {
    if (gameState === 'PLAYING') {
      setTimeout(() => inputRef.current?.focus(), 100);
      playCurrentIfAudio();
    }
  }, [gameState, currentIndex]);

  const playCurrentIfAudio = () => {
    if (gameState !== 'PLAYING') return;
    
    // Auto play audio for AUDIO and WORDS modes
    if (gameType === PracticeType.AUDIO || gameType === PracticeType.WORDS) {
      const code = getCurrentCode();
      
      if (!isPlayingAudio) {
        setIsPlayingAudio(true);
        // Small delay to let user settle
        setTimeout(() => {
          morseAudio.playCode(code, () => setIsPlayingAudio(false));
        }, 500);
      }
    }
  };

  const startGame = (type: PracticeType) => {
    setGameType(type);
    setSessionScore(0);
    setStreak(0);
    setFeedback('NONE');
    setUserInput('');
    setHintActive(false);
    
    // Generate Queue based on type
    let newQueue: any[] = [];
    const allChars = Object.keys(MORSE_DICTIONARY);
    
    if (type === PracticeType.WORDS) {
      // Pick 10 random words
      const words = [...PRACTICE_WORDS].sort(() => 0.5 - Math.random());
      newQueue = words.slice(0, 10);
    } else {
      // Pick 15 random chars
      for (let i = 0; i < 15; i++) {
        newQueue.push(allChars[Math.floor(Math.random() * allChars.length)]);
      }
    }
    
    setQueue(newQueue);
    setCurrentIndex(0);
    setGameState('PLAYING');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    if (val.length > 0 && !/^[A-Z0-9\s]*$/.test(val)) return;
    setUserInput(val);
  };

  const handleHint = () => {
      setHintActive(true);
      // For visual mode, hint means playing the sound
      if (gameType === PracticeType.VISUAL) {
          const code = getCurrentCode();
          if (!isPlayingAudio) {
            setIsPlayingAudio(true);
            morseAudio.playCode(code, () => setIsPlayingAudio(false));
          }
      }
  };

  const checkAnswer = () => {
    const currentItem = queue[currentIndex];
    const target = typeof currentItem === 'string' ? currentItem : currentItem.text;
    
    if (userInput === target) {
      // Correct
      // If hint used, score is 0 and streak does not increase
      const points = hintActive ? 0 : (10 + (streak * 2));
      
      setSessionScore(prev => prev + points);
      if (!hintActive) setStreak(prev => prev + 1);
      
      setFeedback('CORRECT');
      setTimeout(nextQuestion, 800);
    } else {
      // Wrong
      setStreak(0);
      setFeedback('WRONG');
      setTimeout(() => {
        setFeedback('NONE');
        setUserInput('');
      }, 500);
    }
  };

  const nextQuestion = () => {
    setFeedback('NONE');
    setUserInput('');
    setHintActive(false);
    
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setTotalScore(prev => prev + sessionScore);
    setGameState('SUMMARY');
  };

  const getCurrentCode = () => {
    const item = queue[currentIndex];
    if (!item) return '';
    return typeof item === 'string' 
      ? MORSE_DICTIONARY[item].code 
      : (item as PracticeWord).code;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    } else if (e.key === ' ') {
      // Space replays audio if applicable
      if (gameType !== PracticeType.VISUAL) {
         playCurrentIfAudio();
      }
    }
  };

  // === RENDERERS ===

  if (gameState === 'SUMMARY') {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 animate-fade-in">
        <div className="bg-morse-card/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center shadow-2xl">
          <Trophy size={64} className="text-amber-400 mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold text-white mb-2">训练完成!</h2>
          <p className="text-morse-muted mb-8">本次得分</p>
          
          <div className="text-6xl font-black text-white mb-8">
            {sessionScore}
          </div>

          <div className="flex flex-col gap-3">
             <button 
                onClick={() => setGameState('MENU')}
                className="w-full py-4 bg-morse-accent text-morse-dark font-bold rounded-xl hover:scale-[1.02] transition-transform"
             >
               返回大厅
             </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'PLAYING') {
    const currentItem = queue[currentIndex];
    const isWord = typeof currentItem !== 'string';
    const code = getCurrentCode();
    const progressPct = ((currentIndex + 1) / queue.length) * 100;

    // Condition to show visual symbols:
    // 1. Always in Visual Mode
    // 2. Always in Words Mode (helps learning)
    // 3. In Audio Mode ONLY if Hint is active
    const showVisuals = gameType === PracticeType.VISUAL || gameType === PracticeType.WORDS || hintActive;

    return (
      <div className="w-full max-w-2xl mx-auto p-4 h-full flex flex-col">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-6">
           <button onClick={() => setGameState('MENU')} className="p-2 hover:bg-white/10 rounded-full text-morse-muted">
              <ArrowLeft size={20} />
           </button>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-400 font-mono">
                 <Zap size={16} fill="currentColor" />
                 <span>{streak} Streak</span>
              </div>
              <div className="px-3 py-1 bg-white/10 rounded-full text-white font-mono">
                 {sessionScore} pts
              </div>
           </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5 mb-8 rounded-full overflow-hidden">
           <div className="h-full bg-morse-accent transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>

        {/* Game Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
           
           {/* Stimulus Area */}
           <div className="mb-12 min-h-[128px] flex items-center justify-center">
              {showVisuals ? (
                 <div className="flex flex-wrap justify-center gap-3 transition-all duration-300 animate-fade-in">
                    {code.split(' ').map((charPart, i) => (
                       <div key={i} className="flex gap-1.5 p-3 bg-white/5 rounded-xl border border-white/5">
                          {charPart.split('').map((symbol, j) => (
                             <div 
                               key={j}
                               className={`
                                 ${symbol === '.' ? 'w-4 h-4 rounded-full' : 'w-12 h-4 rounded-md'}
                                 ${isPlayingAudio ? 'bg-morse-accent shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-morse-text'}
                               `}
                             />
                          ))}
                       </div>
                    ))}
                 </div>
              ) : (
                 // Audio Mode Placeholder Icon
                 <button 
                   onClick={playCurrentIfAudio}
                   className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${isPlayingAudio ? 'bg-morse-accent scale-110 shadow-[0_0_40px_rgba(245,158,11,0.4)]' : 'bg-white/10 hover:bg-white/20'}`}
                 >
                    <Volume2 size={48} className={isPlayingAudio ? 'text-morse-dark animate-pulse' : 'text-white'} />
                 </button>
              )}
           </div>
           
           {/* Hint Word Category (Only for WORDS mode if Hint Active) */}
           {gameType === PracticeType.WORDS && hintActive && (
              <div className="mb-6 px-4 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold animate-fade-in">
                 HINT: {(currentItem as PracticeWord).category}
              </div>
           )}

           {/* Feedback Overlay */}
           {feedback !== 'NONE' && (
              <div className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none animate-ping-once`}>
                 {feedback === 'CORRECT' ? (
                    <Check size={100} className="text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]" />
                 ) : (
                    <X size={100} className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                 )}
              </div>
           )}

           {/* Input Area */}
           <div className="w-full max-w-sm relative">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={isWord ? "输入单词..." : "输入字符..."}
                maxLength={isWord ? 10 : 1}
                className={`
                  w-full bg-black/30 text-center text-4xl font-black text-white py-6 rounded-2xl border-2 outline-none transition-all uppercase placeholder:text-white/10 font-mono tracking-widest
                  ${feedback === 'WRONG' ? 'border-red-500/50 shake' : 'border-white/10 focus:border-morse-accent/50'}
                `}
                autoFocus
                autoComplete="off"
              />
              <div className="absolute top-1/2 right-4 -translate-y-1/2 text-xs text-morse-muted pointer-events-none hidden sm:block">
                 按 Enter 确认
              </div>
              
              {/* Hint Button */}
              <button 
                onClick={handleHint}
                disabled={hintActive}
                className={`absolute -right-16 top-1/2 -translate-y-1/2 p-3 rounded-xl border transition-all hidden md:flex flex-col items-center gap-1 text-[10px] font-bold ${
                    hintActive 
                    ? 'bg-transparent text-white/20 border-white/5 cursor-default' 
                    : 'bg-white/5 text-morse-muted hover:text-morse-accent hover:border-morse-accent/30 hover:bg-morse-accent/10 border-white/10'
                }`}
                title="Use Hint (No Score)"
              >
                  <Lightbulb size={20} className={hintActive ? 'opacity-50' : ''} />
                  <span>提示</span>
              </button>
           </div>
           
           {/* Mobile Hint Button (visible only on small screens) */}
           <div className="mt-4 md:hidden">
              <button 
                onClick={handleHint}
                disabled={hintActive}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                     hintActive ? 'text-white/20' : 'text-morse-accent bg-morse-accent/10'
                }`}
              >
                 <Lightbulb size={16} /> 提示 (不计分)
              </button>
           </div>

           {/* Instructions */}
           <div className="mt-8 text-morse-muted text-sm flex items-center gap-6">
              {gameType !== PracticeType.VISUAL && (
                 <button onClick={playCurrentIfAudio} className="flex items-center gap-1 hover:text-white transition-colors">
                    <RotateCcw size={14} /> 重听
                 </button>
              )}
           </div>

        </div>
      </div>
    );
  }

  // === MENU RENDER ===
  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6 h-full overflow-y-auto">
       
       {/* Rank Header */}
       <div className="bg-gradient-to-r from-morse-card to-morse-bg rounded-3xl p-6 border border-white/10 shadow-lg flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-morse-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="flex items-center gap-6 relative z-10">
             <div className="w-20 h-20 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5">
                <Award size={40} className={currentRank.color} />
             </div>
             <div>
                <div className="text-xs text-morse-muted font-bold uppercase tracking-widest mb-1">Current Rank</div>
                <div className={`text-2xl md:text-3xl font-black ${currentRank.color} tracking-tight`}>
                   {currentRank.title}
                </div>
                <div className="text-white/50 text-sm mt-1 font-mono">
                   总积分: <span className="text-white">{totalScore}</span>
                </div>
             </div>
          </div>

          <div className="hidden md:block w-48">
              <div className="flex justify-between text-xs text-morse-muted mb-1">
                 <span>Next: {nextRank?.title || 'Max'}</span>
                 <span>{Math.round(progressToNext)}%</span>
              </div>
              <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                 <div className="h-full bg-morse-accent" style={{ width: `${progressToNext}%` }} />
              </div>
          </div>
       </div>

       {/* Mode Selection Grid */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          
          {/* Card 1: Sight Reading */}
          <button 
             onClick={() => startGame(PracticeType.VISUAL)}
             className="group bg-morse-card/80 hover:bg-morse-card border border-white/5 hover:border-morse-accent/30 rounded-2xl p-6 text-left transition-all hover:-translate-y-1 shadow-xl flex flex-col"
          >
             <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Eye className="text-blue-400" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">视觉瞬记</h3>
             <p className="text-sm text-morse-muted leading-relaxed mb-4 flex-1">
               看到符号，瞬间反应出对应的字符。训练大脑的视觉直觉链接。
             </p>
             <div className="flex items-center gap-2 text-xs font-mono text-blue-300/70">
                <Star size={12} fill="currentColor" />
                <span>DIFFICULTY: EASY</span>
             </div>
          </button>

          {/* Card 2: Audio Intercept */}
          <button 
             onClick={() => startGame(PracticeType.AUDIO)}
             className="group bg-morse-card/80 hover:bg-morse-card border border-white/5 hover:border-morse-accent/30 rounded-2xl p-6 text-left transition-all hover:-translate-y-1 shadow-xl flex flex-col"
          >
             <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <Volume2 className="text-green-400" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">听音破译</h3>
             <p className="text-sm text-morse-muted leading-relaxed mb-4 flex-1">
               像真正的发报员一样，只通过声音识别字符。这是最核心的技能。
             </p>
             <div className="flex items-center gap-2 text-xs font-mono text-green-300/70">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <span>DIFFICULTY: MEDIUM</span>
             </div>
          </button>

          {/* Card 3: Code Cracking */}
          <button 
             onClick={() => startGame(PracticeType.WORDS)}
             className="group bg-morse-card/80 hover:bg-morse-card border border-white/5 hover:border-morse-accent/30 rounded-2xl p-6 text-left transition-all hover:-translate-y-1 shadow-xl flex flex-col"
          >
             <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <Keyboard className="text-purple-400" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">单词解密</h3>
             <p className="text-sm text-morse-muted leading-relaxed mb-4 flex-1">
               实战演练！挑战 100 个高频词汇和缩写。包含 SOS, OK, THE 等。
             </p>
             <div className="flex items-center gap-2 text-xs font-mono text-purple-300/70">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <span>DIFFICULTY: HARD</span>
             </div>
          </button>

       </div>
    </div>
  );
};

export default PracticeMode;
