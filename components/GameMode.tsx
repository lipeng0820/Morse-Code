import React, { useState, useEffect } from 'react';
import { MorseChar, MorseCharType } from '../types';
import { MORSE_DICTIONARY } from '../constants';
import { morseAudio } from '../utils/audioUtils';
import { Volume2, CheckCircle, XCircle, Trophy, ArrowRight, Play, RefreshCw } from 'lucide-react';

interface GameModeProps {
  characters: string[]; // Keys of characters learned today
  onComplete: (score: number, total: number) => void;
}

type QuestionType = 'AUDIO' | 'VISUAL';

interface Question {
  target: MorseChar;
  type: QuestionType;
  options: MorseChar[];
}

const GameMode: React.FC<GameModeProps> = ({ characters, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Initialize Game
  useEffect(() => {
    generateQuestions();
  }, [characters]);

  // Auto-play audio when switching to an audio question
  useEffect(() => {
    if (questions.length > 0 && !showSummary && !isAnswered) {
      const currentQ = questions[currentIndex];
      if (currentQ.type === 'AUDIO') {
        const timer = setTimeout(() => {
            playQuestionAudio(currentQ.target.code);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, questions, showSummary, isAnswered]);

  const generateQuestions = () => {
    // Create 10 questions or (2 * count) if count is small
    const qCount = Math.max(5, Math.min(10, characters.length * 2));
    const newQuestions: Question[] = [];
    const allKeys = Object.keys(MORSE_DICTIONARY);

    for (let i = 0; i < qCount; i++) {
      // Pick a random target from TODAY'S characters
      const targetKey = characters[i % characters.length];
      const target = MORSE_DICTIONARY[targetKey];
      
      // Randomize type
      const type: QuestionType = Math.random() > 0.5 ? 'AUDIO' : 'VISUAL';

      // Generate Options (1 correct + 3 wrong)
      const options = [target];
      while (options.length < 4) {
        const randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
        // Ensure unique options
        if (!options.find(o => o.char === randomKey)) {
          options.push(MORSE_DICTIONARY[randomKey]);
        }
      }

      // Shuffle options
      const shuffledOptions = options.sort(() => Math.random() - 0.5);

      newQuestions.push({
        target,
        type,
        options: shuffledOptions
      });
    }

    // Shuffle questions order so we don't just loop through the list linearly
    setQuestions(newQuestions.sort(() => Math.random() - 0.5));
  };

  const playQuestionAudio = (code: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    morseAudio.playCode(code, () => setIsPlaying(false));
  };

  const handleAnswer = (answerChar: string) => {
    if (isAnswered) return;

    const correct = questions[currentIndex].target.char === answerChar;
    setSelectedOption(answerChar);
    setIsAnswered(true);

    if (correct) {
      setScore(prev => prev + 1);
      // Play success sound logic could go here
    } else {
      // Play error sound logic could go here
    }

    // Auto advance after short delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsAnswered(false);
        setSelectedOption(null);
      } else {
        setShowSummary(true);
      }
    }, 1500);
  };

  const restartGame = () => {
      setScore(0);
      setCurrentIndex(0);
      setShowSummary(false);
      setIsAnswered(false);
      setSelectedOption(null);
      generateQuestions();
  };

  if (questions.length === 0) return <div className="text-white">Loading Game...</div>;

  if (showSummary) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 80;

    return (
      <div className="w-full max-w-lg mx-auto bg-morse-card p-8 rounded-[2rem] border border-white/10 shadow-2xl text-center animate-fade-in">
        <div className="mb-6 flex justify-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${passed ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                <Trophy size={48} />
            </div>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">{passed ? "训练完成！" : "继续加油！"}</h2>
        <p className="text-morse-muted mb-8">本次正确率</p>
        
        <div className="text-6xl font-black text-white mb-8 tracking-tighter">
            {percentage}<span className="text-3xl text-morse-muted/50">%</span>
        </div>

        <div className="space-y-3">
            <button 
                onClick={() => onComplete(score, questions.length)}
                className="w-full py-4 bg-morse-accent hover:bg-amber-400 text-morse-dark font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all flex items-center justify-center gap-2"
            >
                {passed ? '完成打卡' : '完成并继续'} <ArrowRight size={20} />
            </button>
            
            <button 
                onClick={restartGame}
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-morse-muted hover:text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
            >
                <RefreshCw size={18} /> 再练一次
            </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Game Header */}
      <div className="flex justify-between items-end mb-6 px-2">
        <div>
            <h2 className="text-morse-accent font-bold uppercase tracking-widest text-xs mb-1">强化训练</h2>
            <div className="text-white font-bold text-xl">
                {currentQ.type === 'AUDIO' ? '听音辨位' : '视觉破译'}
            </div>
        </div>
        <div className="text-morse-muted font-mono text-sm">
            {currentIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-morse-card/80 backdrop-blur-xl border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden relative min-h-[400px] flex flex-col">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5">
            <div 
                className="h-full bg-morse-accent transition-all duration-300"
                style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
            />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
            
            {/* The Stimulus */}
            <div className="mb-10 w-full flex justify-center">
                {currentQ.type === 'AUDIO' ? (
                    <button 
                        onClick={() => playQuestionAudio(currentQ.target.code)}
                        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-morse-accent scale-110 shadow-[0_0_40px_rgba(245,158,11,0.4)]' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        <Volume2 size={48} className={isPlaying ? 'text-morse-dark animate-pulse' : 'text-white'} />
                    </button>
                ) : (
                    <div className="flex items-center gap-2 transform scale-150 p-8 bg-white/5 rounded-2xl border border-white/5">
                         {currentQ.target.code.split('').map((symbol, idx) => (
                            <div
                            key={idx}
                            className={`
                                ${symbol === '.' ? 'w-4 h-4 rounded-full' : 'w-12 h-4 rounded-md'}
                                bg-morse-accent shadow-[0_0_15px_rgba(245,158,11,0.6)]
                            `}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
                {currentQ.options.map((option) => {
                    const isSelected = selectedOption === option.char;
                    const isTarget = option.char === currentQ.target.char;
                    
                    let btnStyle = "bg-morse-bg/50 border-white/10 hover:bg-white/10 hover:border-white/20";
                    let icon = null;

                    if (isAnswered) {
                        if (isTarget) {
                            btnStyle = "bg-green-500/20 border-green-500/50 text-green-100 shadow-[0_0_20px_rgba(34,197,94,0.3)]";
                            icon = <CheckCircle size={18} className="text-green-400" />;
                        } else if (isSelected && !isTarget) {
                            btnStyle = "bg-red-500/20 border-red-500/50 text-red-100";
                            icon = <XCircle size={18} className="text-red-400" />;
                        } else {
                            btnStyle = "bg-morse-bg/30 border-white/5 opacity-40";
                        }
                    }

                    return (
                        <button
                            key={option.char}
                            onClick={() => handleAnswer(option.char)}
                            disabled={isAnswered}
                            className={`relative h-20 rounded-xl border flex items-center justify-center text-2xl font-bold transition-all duration-200 ${btnStyle}`}
                        >
                            <span className="font-sans">{option.char}</span>
                            {icon && <div className="absolute right-3 top-1/2 -translate-y-1/2">{icon}</div>}
                        </button>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default GameMode;
