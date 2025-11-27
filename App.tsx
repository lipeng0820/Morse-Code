
import React, { useState, createContext, useContext, useEffect } from 'react';
import { AppMode, Language } from './types';
import { getDayPlans, getUI, getCharData } from './utils/contentHelper';
import LearningCard from './components/LearningCard';
import PracticeMode from './components/PracticeMode';
import GameMode from './components/GameMode';
import ReferenceMode from './components/ReferenceMode';
import { Radio, BarChart2, BookOpen, Joystick, Library, Languages } from 'lucide-react';

// === Language Context ===
export const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  ui: any;
}>({ 
  lang: 'zh', 
  setLang: () => {},
  ui: {}
});

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.LEARN);
  const [selectedDayId, setSelectedDayId] = useState<number>(1);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedChars, setCompletedChars] = useState<string[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [lang, setLang] = useState<Language>('zh'); // Default Language

  const ui = getUI(lang);
  const dayPlans = getDayPlans(lang);

  // Update document title based on language
  useEffect(() => {
    document.title = lang === 'zh' ? "摩斯密码 3日通 | MorseMastery" : "MorseMastery | Learn Morse in 3 Days";
  }, [lang]);

  // Get current plan data
  const currentPlan = dayPlans.find(d => d.id === selectedDayId) || dayPlans[0];
  const currentCharKey = currentPlan.characters[currentCharIndex];
  const currentCharData = getCharData(currentCharKey, lang);

  const handleNextChar = () => {
    // Add to global completed list if unique
    if (!completedChars.includes(currentCharKey)) {
        setCompletedChars(prev => [...prev, currentCharKey]);
    }

    // Logic: If not last char, go next. If last char, enter Review Mode.
    if (currentCharIndex < currentPlan.characters.length - 1) {
      setCurrentCharIndex(prev => prev + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const handlePrevChar = () => {
    if (currentCharIndex > 0) {
      setCurrentCharIndex(prev => prev - 1);
    }
  };

  const handleGameComplete = () => {
    const nextDayId = selectedDayId + 1;
    const hasNextDay = dayPlans.some(d => d.id === nextDayId);
    
    if (hasNextDay) {
        setSelectedDayId(nextDayId);
        setCurrentCharIndex(0);
        setIsReviewing(false);
    } else {
        setIsReviewing(false);
        setMode(AppMode.PRACTICE);
        setTimeout(() => {
            alert(lang === 'zh' ? "太棒了！你已经完成了所有课程。去“实战演练”试试身手吧！" : "Amazing! You've finished all lessons. Try the Practice Arena!");
        }, 100);
    }
  };

  // Total chars across all plans
  const totalCharsCount = dayPlans.reduce((acc, plan) => acc + plan.characters.length, 0);
  const progress = Math.round((completedChars.length / totalCharsCount) * 100);

  return (
    <LanguageContext.Provider value={{ lang, setLang, ui }}>
      <div className="h-screen bg-morse-bg text-morse-text flex flex-col font-sans overflow-hidden selection:bg-morse-accent selection:text-morse-bg">
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>

        {/* === Primary Header === */}
        <header className="bg-morse-bg/90 backdrop-blur-md border-b border-white/5 shrink-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-morse-accent flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Radio className="text-morse-dark w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                  {lang === 'zh' ? (
                     <h1 className="font-bold text-base tracking-tight text-white leading-tight">摩斯密码 <span className="text-morse-accent">3日通</span></h1>
                  ) : (
                     <h1 className="font-bold text-base tracking-tight text-white leading-tight">Morse<span className="text-morse-accent">Mastery</span></h1>
                  )}
              </div>
            </div>

            {/* Mode Switcher (Nav) */}
            <nav className="flex items-center bg-white/5 p-1 rounded-full border border-white/5">
              <button 
                  onClick={() => setMode(AppMode.LEARN)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${mode === AppMode.LEARN ? 'bg-morse-accent text-morse-dark shadow-sm' : 'text-morse-muted hover:text-white'}`}
              >
                  <BookOpen size={14} />
                  <span className="hidden sm:inline">{ui.modes.learn}</span>
              </button>
              <button 
                  onClick={() => setMode(AppMode.PRACTICE)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${mode === AppMode.PRACTICE ? 'bg-morse-accent text-morse-dark shadow-sm' : 'text-morse-muted hover:text-white'}`}
              >
                  <Joystick size={14} />
                  <span className="hidden sm:inline">{ui.modes.practice}</span>
              </button>
              <button 
                  onClick={() => setMode(AppMode.REFERENCE)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${mode === AppMode.REFERENCE ? 'bg-morse-accent text-morse-dark shadow-sm' : 'text-morse-muted hover:text-white'}`}
              >
                  <Library size={14} />
                  <span className="hidden sm:inline">{ui.modes.reference}</span>
              </button>
            </nav>
            
            {/* Right Side: Lang & Progress */}
            <div className="flex items-center gap-3">
              {/* Language Switch */}
              <button 
                onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-morse-muted transition-colors border border-white/5"
              >
                <Languages size={14} />
                <span>{lang === 'zh' ? 'EN' : '中'}</span>
              </button>

              {/* Progress */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  <BarChart2 size={14} className="text-morse-accent" />
                  <span className="text-xs font-mono text-morse-muted"><span className="text-white font-bold">{progress}%</span></span>
              </div>
            </div>
          </div>
        </header>

        {/* === Secondary Header (Day Selection) - Only in Learn Mode === */}
        {mode === AppMode.LEARN && (
          <div className="bg-morse-card/50 border-b border-white/5 shrink-0">
              <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-center sm:justify-start gap-1 overflow-x-auto no-scrollbar">
                  {dayPlans.map(day => {
                      const isSelected = selectedDayId === day.id;
                      const dayLabel = day.id === 1 ? ui.days.d1 : day.id === 2 ? ui.days.d2 : ui.days.d3;
                      const subLabel = day.id === 1 ? ui.days.d1_sub : day.id === 2 ? ui.days.d2_sub : ui.days.d3_sub;
                      return (
                          <button
                              key={day.id}
                              onClick={() => {
                                  setSelectedDayId(day.id);
                                  setCurrentCharIndex(0);
                                  setIsReviewing(false);
                              }}
                              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                                  isSelected 
                                  ? 'bg-white/10 text-morse-accent ring-1 ring-morse-accent/30' 
                                  : 'text-morse-muted hover:text-white hover:bg-white/5'
                              }`}
                          >
                              <span>{dayLabel}</span>
                              <span className="opacity-50">|</span>
                              <span>{subLabel}</span>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-morse-accent ml-1 animate-pulse" />}
                          </button>
                      );
                  })}
              </div>
          </div>
        )}

        {/* === Main Content Area === */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 relative z-10 w-full flex flex-col items-center">
          
          {mode === AppMode.LEARN && (
              <div className="w-full max-w-5xl flex flex-col items-center h-full justify-center min-h-[500px]">
                  
                  {!isReviewing ? (
                      <>
                          {/* Day Progress (Compact) */}
                          <div className="w-full max-w-4xl flex items-center justify-between mb-4 px-2">
                              <div className="flex flex-col">
                                  <h2 className="text-lg font-bold text-white tracking-tight">{currentPlan.title}</h2>
                                  <p className="text-xs text-morse-muted hidden sm:block">{currentPlan.description}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                  <span className="text-xs font-mono text-morse-muted">{currentCharIndex + 1}/{currentPlan.characters.length}</span>
                                  <div className="w-24 sm:w-32 bg-white/5 h-1.5 rounded-full overflow-hidden">
                                      <div 
                                          className="bg-morse-accent h-full transition-all duration-500 ease-out"
                                          style={{ width: `${((currentCharIndex + 1) / currentPlan.characters.length) * 100}%` }}
                                      />
                                  </div>
                              </div>
                          </div>

                          {/* Main Learning Card */}
                          <div className="w-full h-full max-h-[750px] flex items-center justify-center">
                              <LearningCard 
                                  key={currentCharKey} 
                                  charData={currentCharData} 
                                  onNext={handleNextChar} 
                                  onPrev={handlePrevChar}
                                  hasPrev={currentCharIndex > 0}
                              />
                          </div>
                      </>
                  ) : (
                      <div className="w-full max-w-lg animate-fade-in mt-10">
                          <GameMode 
                              characters={currentPlan.characters}
                              onComplete={handleGameComplete}
                          />
                      </div>
                  )}
              </div>
          )}

          {mode === AppMode.PRACTICE && (
              <div className="w-full h-full flex items-center justify-center">
                  <PracticeMode />
              </div>
          )}

          {mode === AppMode.REFERENCE && (
              <div className="w-full h-full flex items-center justify-center">
                  <ReferenceMode />
              </div>
          )}

        </main>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
