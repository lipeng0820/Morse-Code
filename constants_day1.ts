import { MorseChar, MorseCharType } from './types';

export const DAY1_CHARS: Record<string, MorseChar> = {
  // === Day 1: 基础信号 (Basics & Symmetry) ===
  'E': { 
    char: 'E', code: '.', type: MorseCharType.LETTER, 
    mnemonic: 'E = Eye (眼睛)', 
    description: 'E 就像侧脸的一只眼睛。我们只取那炯炯有神的一点(瞳孔)。',
    visualOverlay: { elements: [{ type: 'dot', x: 45, y: 55}] }
  },
  'T': { 
    char: 'T', code: '-', type: MorseCharType.LETTER, 
    mnemonic: 'T = Table (桌子)', 
    description: 'T 的顶部就是一条平整的长桌面，对应一条长划。',
    visualOverlay: { elements: [{ type: 'dash', x: 50, y: 29}] }
  },
  'I': { 
    char: 'I', code: '..', type: MorseCharType.LETTER, 
    mnemonic: 'I = Ice (冰)', 
    description: 'I 像一根冰柱，上下两端各凝结着一滴冰珠。',
    visualOverlay: { elements: [{ type: 'dot', x: 50, y: 30 }, { type: 'dot', x: 50, y: 80 }] }
  },
  'M': { 
    char: 'M', code: '--', type: MorseCharType.LETTER, 
    mnemonic: 'M = Ma-Ma (妈妈)', 
    description: '喊一声“Ma-Ma”，两个饱满的长音节，刚好对应两段长划。',
    visualOverlay: { elements: [{ type: 'dash', x: 25, y: 50, rotation: 90}, { type: 'dash', x: 75, y: 50, rotation: 90}] }
  },
  'A': { 
    char: 'A', code: '.-', type: MorseCharType.LETTER, 
    mnemonic: 'A = Aim (瞄准)', 
    description: 'A 像个准星。先定点(.)瞄准，然后射出一支长箭(-)。',
    visualOverlay: { elements: [{ type: 'dot', x: 50, y: 30 }, { type: 'dash', x: 50, y: 68 }] }
  },
  'N': { 
    char: 'N', code: '-.', type: MorseCharType.LETTER, 
    mnemonic: 'N = Night (夜空)', 
    description: '漫长的黑夜(长划)，最后亮起了一颗星(点)。',
    visualOverlay: { elements: [{ type: 'dash', x: 30, y: 50, rotation: 90 }, { type: 'dot', x: 70, y: 80 }] }
  },
  'O': { 
    char: 'O', code: '---', type: MorseCharType.LETTER, 
    mnemonic: 'O = Oh-My-God (惊叹)', 
    description: '发音 O—M—G—，三个惊讶的长音节，嘴巴张得圆圆的。',
    visualOverlay: { elements: [{ type: 'dash', x: 12, y: 50, rotation: 90 }, { type: 'dash', x: 50, y: 12 }, { type: 'dash', x: 88, y: 50, rotation: 90 }] }
  },
  'S': { 
    char: 'S', code: '...', type: MorseCharType.LETTER, 
    mnemonic: 'S = Snake (蛇)', 
    description: 'S 像一条发出“斯斯斯”声的蛇，弯曲的身体有三个转折点。',
    visualOverlay: { elements: [{ type: 'dot', x: 65, y: 32 }, { type: 'dot', x: 50, y: 55 }, { type: 'dot', x: 35, y: 80 }] }
  },
  'H': { 
    char: 'H', code: '....', type: MorseCharType.LETTER, 
    mnemonic: 'H = Huts (四角屋)', 
    description: 'H 像一个小屋的平面图，四个顶点就是四个点。',
    visualOverlay: { elements: [{ type: 'dot', x: 30, y: 30 }, { type: 'dot', x: 70, y: 30 }, { type: 'dot', x: 30, y: 80 }, { type: 'dot', x: 70, y: 80 }] }
  },
};
