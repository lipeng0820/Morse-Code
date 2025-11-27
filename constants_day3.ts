import { MorseChar, MorseCharType } from './types';

export const DAY3_CHARS: Record<string, MorseChar> = {
  // === Day 3: 精通 (Complex) ===
  'C': { 
    char: 'C', code: '-.-.', type: MorseCharType.LETTER, 
    mnemonic: 'C = Chui (吹)', 
    description: '音节记忆：“吹(—)呀(·)吹(—)呀(·)”。视觉上：C 的上方-·和下方-·分别代表嘴吹和吹气时喷出去的口水（·是口水）',
    visualOverlay: { 
      elements: [
        { type: 'dash', x: 45, y: 28 }, // Top arc
        { type: 'dot', x: 73, y: 28 },  // Top gap
        { type: 'dash', x: 45, y: 83 }, // Bottom arc
        { type: 'dot', x: 73, y: 83 }   // Bottom gap
      ] 
    }
  },
  'F': { 
    char: 'F', code: '..-.', type: MorseCharType.LETTER, 
    mnemonic: 'F = Flag (旗帜)', 
    description: 'F 像一面飘扬的旗帜。飘动的旗角(·)，旗杆顶端的饰球(·)，长长的旗杆(—)，地面的插孔(·)。',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 67, y: 27 },  // Finial
        { type: 'dot', x: 38, y: 27 },  // Flag corner
        { type: 'dash', x: 38, y: 53, rotation: 90 }, // Flag pole
        { type: 'dot', x: 38, y: 80 }   // Ground hole
      ] 
    }
  },
  'J': { 
    char: 'J', code: '.---', type: MorseCharType.LETTER, 
    mnemonic: 'J = Jet (喷气机)', 
    description: '横着看J 的摩斯码像一架喷气式飞机升空。起点(·)是机头，后面拖着三条长长的尾气流(———)。视觉图像是飞机驾驶座椅',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 61, y: 13 },  // Nose
        { type: 'dash', x: 61, y: 42, rotation: 90 }, // Body/Contrail
        { type: 'dash', x: 59, y: 76, rotation: 120 }, // Bottom curve (Adjusted position)
        { type: 'dash', x: 30, y: 76, rotation: 30 }  // Tail
      ] 
    }
  },
  'L': { 
    char: 'L', code: '.-..', type: MorseCharType.LETTER, 
    mnemonic: 'L = Leg (腿)', 
    description: 'L 的形状像一只腿（leg）。视觉对应：膝盖(·)、长长的小腿骨(—)、脚后跟(·)、脚尖(·)。',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 39, y: 28 },  // Knee
        { type: 'dash', x: 39, y: 55, rotation: 90 }, // Shin
        { type: 'dot', x: 39, y: 82 },  // Heel
        { type: 'dot', x: 66, y: 82 }   // Toe
      ] 
    }
  },
  'P': { 
    char: 'P', code: '.--.', type: MorseCharType.LETTER, 
    mnemonic: 'P = Parking (停车场)', 
    description: 'P 像停车场的双柱闸门。左边转轴(·)，左侧横档杆(—)，右侧横档杆(—)，右边转轴(·)。',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 34, y: 13 },  // Top pivot
        { type: 'dash', x: 34, y: 39, rotation: 90 }, // Upper Vertical Stand
        { type: 'dash', x: 34, y: 73, rotation: 90 }, // Lower Vertical Stand
        { type: 'dot', x: 34, y: 98 }   // Bottom pivot
      ] 
    }
  },
  'Q': { 
    char: 'Q', code: '--.-', type: MorseCharType.LETTER, 
    mnemonic: 'Q = Qi-Qiu (气球)', 
    description: 'Q 像个系着绳子的大气球。上面两个气球(—)和(—)，中间打个结(·)，拉根长绳(—)。',
    visualOverlay: { 
      elements: [
        { type: 'dash', x: 49, y: 27 }, // Top arc
        { type: 'dash', x: 72, y: 56, rotation: 90 }, // Bottom/Left arc logic
        { type: 'dot', x: 50, y: 84 },  // Knot (Start of tail)
        { type: 'dash', x: 69, y: 100, rotation: 196 } // Tail string
      ] 
    }
  },
  'X': { 
    char: 'X', code: '-..-', type: MorseCharType.LETTER, 
    mnemonic: 'X = X-ray (射线)', 
    description: 'X 像两道强力的射线，左边射线(-)、中间的分子结构(··)、右边射线(-)，两边的射线正在击穿分子。',
    visualOverlay: { 
      elements: [
        { type: 'dash', x: 33, y: 26, rotation: 62 }, // Top-left ray
        { type: 'dot', x: 45, y: 47 },  // Molecule 1
        { type: 'dot', x: 55, y: 60 },  // Molecule 2
        { type: 'dash', x: 67, y: 83, rotation: 62 }  // Bottom-right ray
      ] 
    }
  },
  'Y': { 
    char: 'Y', code: '-.--', type: MorseCharType.LETTER, 
    mnemonic: 'Y = ¥ (Y字形)', 
    description: '按照人民币符号记忆，“一点钱”-·（一点）--两道杠，组成人民币符号¥，就是-·--的Y',
    visualOverlay: { 
      elements: [
        { type: 'dash', x: 34, y: 32, rotation: 68 }, // Left stroke
        { type: 'dot', x: 50, y: 53 },  // Center join
        { type: 'dash', x: 50, y: 69 }, // Bottom stroke
        { type: 'dash', x: 50, y: 85, rotation: 180 }// Right stroke
        
      ] 
    }
  },
  'Z': { 
    char: 'Z', code: '--..', type: MorseCharType.LETTER, 
    mnemonic: 'Z = Zebra (斑马)', 
    description: 'Z 像动物园（ZZOO）里的一匹斑马。（--）是斑马在眯着眼，(··)是办法瘦小的身体。',
    visualOverlay: { 
      elements: [
        { type: 'dash', x: 51, y: 28 }, 
        { type: 'dash', x: 50, y: 55, rotation: 304 }, 
        { type: 'dot', x: 34, y: 82 }, 
        { type: 'dot', x: 67, y: 82 } 
      ] 
    }
  },
};