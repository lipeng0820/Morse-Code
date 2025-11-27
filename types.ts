
export enum MorseCharType {
  LETTER = 'LETTER',
  NUMBER = 'NUMBER',
  SYMBOL = 'SYMBOL',
}

export type Language = 'zh' | 'en';

export interface VisualOverlayConfig {
  elements: Array<{
    type: 'dot' | 'dash';
    x: number;
    y: number;
    rotation?: number;
    scale?: number;
  }>;
}

// Immutable Logic (Code, Type, SVG)
export interface CharLogic {
  char: string;
  code: string;
  type: MorseCharType;
  visualOverlay?: VisualOverlayConfig;
}

// Translatable Content (Mnemonic, Description)
export interface CharContent {
  mnemonic: string;
  description: string;
}

// Combined Object for Components
export interface MorseChar extends CharLogic, CharContent {}

export interface DayPlan {
  id: number;
  title: string;
  description: string;
  characters: string[];
}

export enum AppMode {
  LEARN = 'LEARN',
  PRACTICE = 'PRACTICE',
  REFERENCE = 'REFERENCE',
}

export enum PracticeType {
  VISUAL = 'VISUAL',
  AUDIO = 'AUDIO',
  WORDS = 'WORDS',
}

export interface PracticeWord {
  text: string;
  code: string;
  category: 'ABBR' | 'COMMON' | 'EMERGENCY';
  difficulty: 1 | 2 | 3;
}

export interface RefItemLogic {
  label: string;
  code: string;
}

export interface RefItem extends RefItemLogic {
  desc?: string;
}
