import { MorseChar, MorseCharType } from './types';

export const DAY2_CHARS: Record<string, MorseChar> = {
  // === Day 2: 进阶 (Visual Logic) ===
  'D': { 
    char: 'D', code: '-..', type: MorseCharType.LETTER, 
    mnemonic: 'D = Door (门)', 
    description: '听声音像敲门：咚(长)—哒(短)哒(短)。视觉上：D的左侧长竖是门把手(—)，右侧圆弧上的两点分别是锁孔(·)和转轴(·)。',
    visualOverlay: { elements: [{ type: 'dash', x: 30, y: 50, rotation: 90 }, { type: 'dot', x: 75, y: 30 }, { type: 'dot', x: 75, y: 70 }] }
  },
  'K': { 
    char: 'K', code: '-.-', type: MorseCharType.LETTER, 
    mnemonic: 'K = Kangaroo (袋鼠)', 
    description: '发音 Kan-ga-roo (—·—)。视觉上：K 像站立的袋鼠，笔画对应：左侧长直背(—)、中间的小手/袋(·)、右下强壮的支撑腿(—)。',
    visualOverlay: { elements: [{ type: 'dash', x: 28, y: 50, rotation: 90 }, { type: 'dot', x: 52, y: 50 }, { type: 'dash', x: 75, y: 75, rotation: 45 }] }
  },
  'R': { 
    char: 'R', code: '.-.', type: MorseCharType.LETTER, 
    mnemonic: 'R = Racecar (赛车)', 
    description: 'R 是一辆赛车正面的特写。视觉结构对称：左边车灯(·)，中间进气格栅(—)，右边车灯(·)。',
    visualOverlay: { elements: [{ type: 'dot', x: 25, y: 20 }, { type: 'dash', x: 60, y: 35, scale: 0.9 }, { type: 'dot', x: 75, y: 80 }] }
  },
  'U': { 
    char: 'U', code: '..-', type: MorseCharType.LETTER, 
    mnemonic: 'U = Uncle Wang (王大叔)', 
    description: '发音 Un-cle-Wang (··—) 对应三个音节。视觉上：U形大脸，上面两只眼睛(··)下面一张阔嘴(—)。',
    visualOverlay: { elements: [{ type: 'dot', x: 25, y: 35 }, { type: 'dot', x: 75, y: 35 }, { type: 'dash', x: 50, y: 80, scale: 1.2 }] }
  },
  'W': { 
    char: 'W', code: '.--', type: MorseCharType.LETTER, 
    mnemonic: 'W = Waves (波浪)', 
    description: 'W 就是波浪的形状。左边起势一个小浪花(·)，紧接着涌起两道大浪(——)。',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 15, y: 15 }, // Top-Left Start
        { type: 'dash', x: 38, y: 55, rotation: -65 }, // First upward stroke
        { type: 'dash', x: 82, y: 55, rotation: -65 }  // Second upward stroke
      ] 
    }
  },
  'G': { 
    char: 'G', code: '--.', type: MorseCharType.LETTER, 
    mnemonic: 'G = Golf (高尔夫)', 
    description: 'G 像挥杆动作。画出上下两道长弧线(--)，最后收杆击中小球(.)。',
    visualOverlay: { elements: [{ type: 'dash', x: 50, y: 15 }, { type: 'dash', x: 50, y: 85 }, { type: 'dot', x: 85, y: 55 }] }
  },
  'B': { 
    char: 'B', code: '-...', type: MorseCharType.LETTER, 
    mnemonic: 'B = Bamboo (竹子)', 
    description: 'B的左边是一根长竹干(-)，右边长出了三片竹叶(...)。',
    visualOverlay: { elements: [{ type: 'dash', x: 25, y: 50, rotation: 90 }, { type: 'dot', x: 65, y: 20 }, { type: 'dot', x: 65, y: 50 }, { type: 'dot', x: 65, y: 80 }] }
  },
  'V': { 
    char: 'V', code: '...-', type: MorseCharType.LETTER, 
    mnemonic: 'V = Victory (胜利)', 
    description: 'Beethoven (命运交响曲): 噔噔噔—当！三短一长。视觉上：三点沿左侧爬坡，右侧一长划登顶。',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 22, y: 25 },  // Top-left of V stroke
        { type: 'dot', x: 36, y: 55 },  // Middle of left stroke
        { type: 'dot', x: 50, y: 85 },  // Bottom vertex
        { type: 'dash', x: 72, y: 40, rotation: -65 } // Along right stroke
      ] 
    }
  },
};
