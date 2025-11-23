import React, { useState } from 'react';
import { DAY_PLANS, MORSE_DICTIONARY } from './constants';
import { AppMode } from './types';
import LearningCard from './components/LearningCard';
import TranslatorMode from './components/TranslatorMode';
import GameMode from './components/GameMode';
import { Radio, BarChart2, BookOpen, Terminal, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.LEARN);
  const [selectedDayId, setSelectedDayId] = useState<number>(1);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedChars, setCompletedChars] = useState<string[]>([]);
  const [isReviewing, setIsReviewing] = useState(false); // New state for review phase

  // Get current plan data
  const currentPlan = DAY_PLANS.find(d => d.id === selectedDayId) || DAY_PLANS[0];
  const currentCharKey = currentPlan.characters[currentCharIndex];
  const currentCharData = MORSE_DICTIONARY[currentCharKey];

  const handleNextChar = () => {
    // Add to global completed list if unique
    if (!completedChars.includes(currentCharKey)) {
        setCompletedChars(prev => [...prev, currentCharKey]);
    }

    // Logic: If not last char, go next. If last char, enter Review Mode.
    if (currentCharIndex < currentPlan.characters.length - 1) {
      setCurrentCharIndex(prev => prev + 1);
    } else {
      // End of list, trigger review game
      setIsReviewing(true);
    }
  };

  const handleGameComplete = () => {
    // Proceed to next day logic
    const nextDayId = selectedDayId + 1;
    const hasNextDay = DAY_PLANS.some(d => d.id === nextDayId);
    
    if (hasNextDay) {
        // Direct transition to next day
        setSelectedDayId(nextDayId);
        setCurrentCharIndex(0);
        setIsReviewing(false);
    } else {
        // End of all days
        setIsReviewing(false);
        setMode(AppMode.TRANSLATOR);
        // Small timeout to allow UI to render the change before alerting
        setTimeout(() => {
            alert("太棒了！你已经完成了所有课程。去“自由练习场”试试身手吧！");
        }, 100);
    }
  };

  const progress = Math.round((completedChars.length / Object.keys(MORSE_DICTIONARY).length) * 100);

  return (
    <div className="min-h-screen bg-morse-bg text-morse-text flex flex-col font-sans selection:bg-morse-accent selection:text-morse-bg">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Header */}
      <header className="border-b border-white/5 bg-morse-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-morse-accent flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Radio className="text-morse-dark w-6 h-6" />
            </div>
            <div>
                <h1 className="font-bold text-lg tracking-tight text-white leading-tight">Morse<span className="text-morse-accent">Mastery</span></h1>
                <p className="text-[10px] text-morse-muted uppercase tracking-widest font-mono">3-Day Fast Track</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
                <BarChart2 size={14} className="text-morse-accent" />
                <span className="text-xs font-mono text-morse-muted">掌握度: <span className="text-white font-bold">{progress}%</span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 relative z-10 w-full max-w-5xl mx-auto">
        
        {/* Navigation Tabs */}
        <div className="flex p-1 bg-morse-card rounded-xl mb-10 border border-white/5 shadow-xl">
            <button 
                onClick={() => setMode(AppMode.LEARN)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === AppMode.LEARN ? 'bg-morse-accent text-morse-dark shadow-lg' : 'text-morse-muted hover:text-white'}`}
            >
                <BookOpen size={16} />
                学习模式
            </button>
            <button 
                onClick={() => setMode(AppMode.TRANSLATOR)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === AppMode.TRANSLATOR ? 'bg-morse-accent text-morse-dark shadow-lg' : 'text-morse-muted hover:text-white'}`}
            >
                <Terminal size={16} />
                自由练习场
            </button>
        </div>

        {mode === AppMode.LEARN && (
            <div className="w-full max-w-4xl flex flex-col items-center">
                
                {/* Day Selectors */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-10">
                    {DAY_PLANS.map(day => {
                        const isSelected = selectedDayId === day.id;
                        return (
                            <button
                                key={day.id}
                                onClick={() => {
                                    setSelectedDayId(day.id);
                                    setCurrentCharIndex(0);
                                    setIsReviewing(false);
                                }}
                                className={`relative group flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 ${isSelected ? 'bg-morse-card border-morse-accent ring-1 ring-morse-accent/50 shadow-lg shadow-amber-500/10' : 'bg-morse-card/50 border-white/5 hover:bg-morse-card hover:border-white/10'}`}
                            >
                                <span className={`text-xs uppercase tracking-widest font-bold mb-1 ${isSelected ? 'text-morse-accent' : 'text-morse-muted'}`}>Day {day.id}</span>
                                <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-morse-muted'}`}>
                                    {day.id === 1 ? '基础' : day.id === 2 ? '进阶' : '精通'}
                                </span>
                                {isSelected && <div className="absolute -bottom-1 w-8 h-1 bg-morse-accent rounded-full" />}
                            </button>
                        );
                    })}
                </div>

                {!isReviewing ? (
                    <>
                        <div className="text-center mb-8 max-w-xl animate-fade-in-up">
                            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">{currentPlan.title}</h2>
                            <p className="text-morse-muted text-sm md:text-base leading-relaxed">{currentPlan.description}</p>
                        </div>

                        {/* Progress Bar for Current Day */}
                        <div className="w-full max-w-lg flex items-center gap-3 mb-8">
                            <span className="text-xs font-mono text-morse-muted">学习进度</span>
                            <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                                <div 
                                    className="bg-morse-accent h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                    style={{ width: `${((currentCharIndex) / currentPlan.characters.length) * 100}%` }}
                                />
                            </div>
                            <span className="text-xs font-mono text-morse-muted">{currentCharIndex + 1}/{currentPlan.characters.length}</span>
                        </div>

                        {/* Main Learning Card */}
                        <div className="w-full animate-fade-in perspective-1000">
                            <LearningCard 
                                key={currentCharKey} // Force re-render on change
                                charData={currentCharData} 
                                onNext={handleNextChar} 
                            />
                        </div>
                    </>
                ) : (
                    <div className="w-full animate-fade-in">
                        <GameMode 
                            characters={currentPlan.characters}
                            onComplete={handleGameComplete}
                        />
                    </div>
                )}
            </div>
        )}

        {mode === AppMode.TRANSLATOR && (
            <TranslatorMode />
        )}

      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 bg-morse-bg/50">
        <p className="text-morse-muted text-xs">
            Visual Mnemonics & Spaced Repetition System
            <br/>
            Designed for efficient learning.
        </p>
      </footer>
    </div>
  );
};

export default App;