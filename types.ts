export enum MorseCharType {
  LETTER = 'LETTER',
  NUMBER = 'NUMBER',
  SYMBOL = 'SYMBOL',
}

export interface VisualOverlayConfig {
  // x, y coordinates (0-100) and rotation for placing dots/dashes on the letter SVG
  elements: Array<{
    type: 'dot' | 'dash';
    x: number;
    y: number;
    rotation?: number; // degrees
    scale?: number;
  }>;
}

export interface MorseChar {
  char: string;
  code: string;
  type: MorseCharType;
  mnemonic: string; // Short memory hook (Chinese)
  description?: string; // Detailed visual description
  visualOverlay?: VisualOverlayConfig; // Configuration for the SVG overlay
}

export interface DayPlan {
  id: number;
  title: string;
  description: string;
  characters: string[]; // List of chars to learn this day
}

export enum AppMode {
  LEARN = 'LEARN',
  PRACTICE = 'PRACTICE',
  REFERENCE = 'REFERENCE', // New Mode: Knowledge Base
}

// Practice Mode Specifics
export enum PracticeType {
  VISUAL = 'VISUAL', // See code, type letter
  AUDIO = 'AUDIO',   // Hear code, type letter
  WORDS = 'WORDS',   // Hear/See word code, type word
}

export interface PracticeWord {
  text: string;
  code: string;
  category: 'ABBR' | 'COMMON' | 'EMERGENCY';
  difficulty: 1 | 2 | 3;
}