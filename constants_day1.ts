import { MorseChar, MorseCharType } from './types';

export const DAY1_CHARS: Record<string, MorseChar> = {
  // === Day 1: 基础信号 (Basics & Symmetry) ===
  'E': { 
    char: 'E', code: '.', type: MorseCharType.LETTER, 
    mnemonic: 'E = Eye (眼睛)', 
    description: 'E 一只眼。E，也是“E（一）个点”。',
    visualOverlay: { elements: [{ type: 'dot', x: 38, y: 54}] }
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
    description: 'I 像一根冰柱，上下两端各凝结着一滴冰珠。冰块融化，“哒哒”落下两滴水。',
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
    mnemonic: 'N = Notification (通知中心)', 
    description: '（-·）仔细看像不像iPhone的刘海屏通知中心状态，-是通知栏，·是摄像头的位置。',
    visualOverlay: { elements: [{ type: 'dash', x: 30, y: 50, rotation: 90 }, { type: 'dot', x: 70, y: 80 }] }
  },
  'O': { 
    char: 'O', code: '---', type: MorseCharType.LETTER, 
    mnemonic: 'O = Oh-My-God (惊叹)', 
    description: '发音 O—M—G—，三个惊讶的长音节，嘴巴张得圆圆的。',
    visualOverlay: { elements: [{ type: 'dash', x: 28, y: 57, rotation: 90 }, { type: 'dash', x: 50, y: 28 }, { type: 'dash', x: 72, y: 57, rotation: 90 }] }
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
