
import { PracticeWord } from './types';


// This file is kept for backward compatibility imports, 
// but most logic is moved to data/ and locales/.
// Components should preferentially use the hooks from utils/contentHelper


// Practice words are universal for now (English codes), 
// but categories could be translated in the UI layer.
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
  { text: 'CQ', code: '-.-. --.-', category: 'ABBR', difficulty: 1 },

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
  { text: 'GM', code: '--. --', category: 'ABBR', difficulty: 2 },
  { text: 'GN', code: '--. -.', category: 'ABBR', difficulty: 2 },
  { text: 'TU', code: '- ..-', category: 'ABBR', difficulty: 2 },
  { text: '73', code: '--... ...--', category: 'ABBR', difficulty: 3 },
  { text: 'RPT', code: '.-. .--. -', category: 'ABBR', difficulty: 2 },
  { text: 'PSE', code: '.--. ... .', category: 'ABBR', difficulty: 2 },
  { text: 'UR', code: '..- .-.', category: 'ABBR', difficulty: 2 },
  
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

// Helper to generate code for words (Legacy support)
export const MORSE_DICTIONARY: any = {}; // Deprecated in favor of dynamic loading