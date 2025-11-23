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
  TRANSLATOR = 'TRANSLATOR',
}