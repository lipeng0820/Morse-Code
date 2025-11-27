import { MorseChar, DayPlan, PracticeWord } from './types';
import { DAY1_CHARS } from './constants_day1';
import { DAY2_CHARS } from './constants_day2';
import { DAY3_CHARS } from './constants_day3';

// Combine all days into the master dictionary
export const MORSE_DICTIONARY: Record<string, MorseChar> = {
  ...DAY1_CHARS,
  ...DAY2_CHARS,
  ...DAY3_CHARS,
};

export const DAY_PLANS: DayPlan[] = [
  {
    id: 1,
    title: '第一天：基础信号',
    description: '从最简单的对称图形和基本点划开始，建立摩斯密码的直觉。',
    characters: Object.keys(DAY1_CHARS)
  },
  {
    id: 2,
    title: '第二天：进阶逻辑',
    description: '学习通过视觉形状和声音节奏强关联的字符。',
    characters: Object.keys(DAY2_CHARS)
  },
  {
    id: 3,
    title: '第三天：精通复杂',
    description: '攻克最复杂的字符，完成字母表拼图。',
    characters: Object.keys(DAY3_CHARS)
  }
];

// Helper to generate code for words
const getCode = (word: string) => word.toUpperCase().split('').map(c => MORSE_DICTIONARY[c]?.code || '').join(' ');

export const PRACTICE_WORDS: PracticeWord[] = [
  // === 1. Emergency & Standard Abbreviations (Difficulty 1) ===
  { text: 'SOS', code: '... --- ...', category: 'EMERGENCY', difficulty: 1 },
  { text: 'OK', code: '--- -.-', category: 'ABBR', difficulty: 1 },
  { text: 'HI', code: '.... ..', category: 'COMMON', difficulty: 1 },
  { text: 'NO', code: '-. ---', category: 'COMMON', difficulty: 1 },
  { text: 'GO', code: '--. ---', category: 'COMMON', difficulty: 1 },
  { text: 'ME', code: '-- .', category: 'COMMON', difficulty: 1 },
  { text: 'IT', code: '.. -', category: 'COMMON', difficulty: 1 },
  { text: 'US', code: '..- ...', category: 'COMMON', difficulty: 1 },
  { text: 'UP', code: '..- .--.', category: 'COMMON', difficulty: 1 },
  { text: 'CQ', code: '-.-. --.-', category: 'ABBR', difficulty: 1 }, // Calling all stations

  // === 2. Very Common English Words (Difficulty 1-2) ===
  { text: 'THE', code: '- .... .', category: 'COMMON', difficulty: 1 },
  { text: 'AND', code: '.- -. -..', category: 'COMMON', difficulty: 1 },
  { text: 'YOU', code: '-.-- --- ..-', category: 'COMMON', difficulty: 2 },
  { text: 'FOR', code: '..-. --- .-.', category: 'COMMON', difficulty: 2 },
  { text: 'NOT', code: '-. --- -', category: 'COMMON', difficulty: 1 },
  { text: 'YES', code: '-.-- . ...', category: 'COMMON', difficulty: 1 },
  { text: 'MAN', code: '-- .- -.', category: 'COMMON', difficulty: 1 },
  { text: 'CAT', code: '-.-. .- -', category: 'COMMON', difficulty: 1 },
  { text: 'DOG', code: '-.. --- --.', category: 'COMMON', difficulty: 1 },
  { text: 'RUN', code: '.-. ..- -.', category: 'COMMON', difficulty: 1 },
  
  // === 3. Code Abbreviations (Difficulty 2) ===
  { text: 'GM', code: '--. --', category: 'ABBR', difficulty: 2 }, // Good Morning
  { text: 'GN', code: '--. -.', category: 'ABBR', difficulty: 2 }, // Good Night
  { text: 'TU', code: '- ..-', category: 'ABBR', difficulty: 2 }, // Thank You
  { text: '73', code: '--... ...--', category: 'ABBR', difficulty: 3 }, // Best Regards (Numbers not fully taught but good for challenge)
  { text: 'RPT', code: '.-. .--. -', category: 'ABBR', difficulty: 2 }, // Repeat
  { text: 'PSE', code: '.--. ... .', category: 'ABBR', difficulty: 2 }, // Please
  { text: 'UR', code: '..- .-.', category: 'ABBR', difficulty: 2 }, // Your
  
  // === 4. Common Verbs & Nouns (Difficulty 2) ===
  { text: 'SEE', code: '... . .', category: 'COMMON', difficulty: 1 },
  { text: 'SAY', code: '... .- -.--', category: 'COMMON', difficulty: 2 },
  { text: 'EAT', code: '. .- -', category: 'COMMON', difficulty: 1 },
  { text: 'BIG', code: '-... .. --.', category: 'COMMON', difficulty: 2 },
  { text: 'NOW', code: '-. --- .--', category: 'COMMON', difficulty: 2 },
  { text: 'WAY', code: '.-- .- -.--', category: 'COMMON', difficulty: 2 },
  { text: 'DAY', code: '-.. .- -.--', category: 'COMMON', difficulty: 2 },
  { text: 'NEW', code: '-. . .--', category: 'COMMON', difficulty: 2 },
  { text: 'GET', code: '--. . -', category: 'COMMON', difficulty: 2 },
  { text: 'GOT', code: '--. --- -', category: 'COMMON', difficulty: 2 },
  
  // === 5. More Complex (Difficulty 3) ===
  { text: 'HELP', code: '.... . .-.. .--.', category: 'EMERGENCY', difficulty: 3 },
  { text: 'LOVE', code: '.-.. --- ...- .', category: 'COMMON', difficulty: 3 },
  { text: 'GOOD', code: '--. --- --- -..', category: 'COMMON', difficulty: 3 },
  { text: 'WORK', code: '.-- --- .-. -.-', category: 'COMMON', difficulty: 3 },
  { text: 'TIME', code: '- .. -- .', category: 'COMMON', difficulty: 2 },
  { text: 'LIFE', code: '.-.. .. ..-. .', category: 'COMMON', difficulty: 3 },
  { text: 'HOPE', code: '.... --- .--. .', category: 'COMMON', difficulty: 2 },
  { text: 'TEST', code: '- . ... -', category: 'COMMON', difficulty: 2 },
  { text: 'ZERO', code: '--.. . .-. ---', category: 'COMMON', difficulty: 3 },
  { text: 'COPY', code: '-.-. --- .--. -.--', category: 'ABBR', difficulty: 3 },
];
