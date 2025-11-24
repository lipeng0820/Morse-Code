import { MorseChar, MorseCharType } from './types';

export const DAY2_CHARS: Record<string, MorseChar> = {
  // === Day 2: 进阶 (Visual Logic) ===
  'D': { 
    char: 'D', code: '-..', type: MorseCharType.LETTER, 
    mnemonic: 'D = Door (门)', 
    description: '听声音像敲门：咚(长)—哒(短)哒(短)。视觉上：D的左侧长竖是门把手(—)，右侧圆弧上的两点分别是锁孔(·)和转轴(·)。',
    visualOverlay: { elements: [{ type: 'dash', x: 33, y: 55, rotation: 90 }, { type: 'dot', x: 65, y: 35 }, { type: 'dot', x: 65, y: 75 }] }
  },
  'K': { 
    char: 'K', code: '-.-', type: MorseCharType.LETTER, 
    mnemonic: 'K = Kangaroo (袋鼠)', 
    description: '发音 Kan-ga-roo (—·—)。视觉上：K 像站立的袋鼠，笔画对应：左侧长直背(—)、中间的小手/袋(·)、右下强壮的支撑腿(—)。',
    visualOverlay: { elements: [{ type: 'dash', x: 33, y: 40, rotation: 90 }, { type: 'dot', x: 48, y: 55 }, { type: 'dash', x: 66, y: 75, rotation: 59 }] }
  },
  'R': { 
    char: 'R', code: '.-.', type: MorseCharType.LETTER, 
    mnemonic: 'R = Racecar (赛车)', 
    description: 'R 是一辆赛车正面的特写。视觉结构对称：左边车灯(·)，中间进气格栅(—)，右边车灯(·)。',
    visualOverlay: { elements: [{ type: 'dot', x: 35, y: 30 }, { type: 'dash', x: 45, y: 58 }, { type: 'dot', x: 68, y: 80 }] }
  },
  'U': { 
    char: 'U', code: '..-', type: MorseCharType.LETTER, 
    mnemonic: 'U = Uncle Wang (王大叔)', 
    description: '发音 Un-cle-Wang (··—) 对应三个音节。视觉上：U形大脸，上面两只眼睛(··)下面一张阔嘴(—)。',
    visualOverlay: { elements: [{ type: 'dot', x: 30, y: 30 }, { type: 'dot', x: 70, y: 30 }, { type: 'dash', x: 50, y: 83 }] }
  },
  'W': { 
    char: 'W', code: '.--', type: MorseCharType.LETTER, 
    mnemonic: 'W = Waves (波浪)', 
    description: 'W 就是波浪的形状。左边起势一个小浪花(·)，紧接着涌起两道大浪(——)。',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 18, y: 30 }, // Top-Left Start
        { type: 'dash', x: 41, y: 55, rotation: -80 }, // First upward stroke
        { type: 'dash', x: 78, y: 55, rotation: -80 }  // Second upward stroke
      ] 
    }
  },
  'G': { 
    char: 'G', code: '--.', type: MorseCharType.LETTER, 
    mnemonic: 'G = Golf (高尔夫)', 
    description: 'G 像挥杆动作。画出上下两道长弧线(--)，最后收杆击中小球(.)。',
    visualOverlay: { elements: [{ type: 'dash', x: 50, y: 28 }, { type: 'dash', x: 50, y: 84 }, { type: 'dot', x: 70, y: 58 }] }
  },
  'B': { 
    char: 'B', code: '-...', type: MorseCharType.LETTER, 
    mnemonic: 'B = Bamboo (竹子)', 
    description: 'B的左边是一根长竹干(-)，右边长出了三片竹叶(...)。',
    visualOverlay: { elements: [{ type: 'dash', x: 34, y: 55, rotation: 90 }, { type: 'dot', x: 65, y: 30 }, { type: 'dot', x: 65, y: 55 }, { type: 'dot', x: 65, y: 80 }] }
  },
  'V': { 
    char: 'V', code: '...-', type: MorseCharType.LETTER, 
    mnemonic: 'V = Victory (胜利)', 
    description: 'Beethoven (命运交响曲): 噔噔噔—当！三短一长。视觉上：三点沿左侧爬坡，右侧一长划登顶。',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 30, y: 30 },  // Top-left of V stroke
        { type: 'dot', x: 36, y: 55 },  // Middle of left stroke
        { type: 'dot', x: 45, y: 82 },  // Bottom vertex
        { type: 'dash', x: 67, y: 40, rotation: -75 } // Along right stroke
      ] 
    }
  },
};
