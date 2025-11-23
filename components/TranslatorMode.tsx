import React, { useState } from 'react';
import { MORSE_DICTIONARY } from '../constants';
import { morseAudio } from '../utils/audioUtils';
import { Play, Mic, Volume2 } from 'lucide-react';

const TranslatorMode: React.FC = () => {
  const [input, setInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const translate = (text: string) => {
    return text.toUpperCase().split('').map(char => {
      return MORSE_DICTIONARY[char]?.code || (char === ' ' ? '/' : '?');
    }).join(' ');
  };

  const output = translate(input);

  const handlePlay = async () => {
    if (isPlaying || !input) return;
    setIsPlaying(true);
    
    const words = input.toUpperCase().split(' ');
    
    // Simple sequencer 
    for (const word of words) {
        for (const char of word.split('')) {
            const code = MORSE_DICTIONARY[char]?.code;
            if (code) {
                 await new Promise<void>(resolve => morseAudio.playCode(code, resolve));
                 // Wait between letters
                 await new Promise(r => setTimeout(r, 200)); 
            }
        }
        // Wait between words
        await new Promise(r => setTimeout(r, 600));
    }
    
    setIsPlaying(false);
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
       <div className="bg-morse-card rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-morse-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <h2 className="text-2xl font-bold text-white mb-2 relative z-10">文本转摩斯码</h2>
          <p className="text-morse-muted text-sm mb-6 relative z-10">输入英文或数字，立即转换为信号并播放。</p>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="在此输入文本 (支持 A-Z, 0-9)..."
            className="w-full bg-morse-bg/50 text-white p-5 rounded-xl border border-white/10 focus:border-morse-accent/50 focus:ring-1 focus:ring-morse-accent/50 outline-none min-h-[140px] mb-4 text-lg font-mono placeholder:text-morse-muted/50 resize-none transition-all"
          />

          <div className="bg-black/20 p-5 rounded-xl min-h-[100px] font-mono text-morse-accent text-xl break-words mb-8 tracking-widest border border-white/5 flex items-center">
            {output || <span className="text-morse-muted/30 italic">等待输入...</span>}
          </div>

          <div className="flex justify-end gap-3">
             <button 
                onClick={handlePlay}
                disabled={isPlaying || !input}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                    isPlaying || !input 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed shadow-none' 
                    : 'bg-morse-accent text-morse-dark hover:bg-amber-400 hover:shadow-amber-500/25 transform hover:-translate-y-0.5'
                }`}
             >
                {isPlaying ? <Volume2 className="animate-pulse" /> : <Play fill="currentColor" size={18} />}
                {isPlaying ? "正在发送信号..." : "发送音频信号"}
             </button>
          </div>
       </div>
    </div>
  );
};

export default TranslatorMode;