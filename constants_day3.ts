import { MorseChar, MorseCharType } from './types';

export const DAY3_CHARS: Record<string, MorseChar> = {
  // === Day 3: 精通 (Complex) ===
  'C': { 
    char: 'C', code: '-.-.', type: MorseCharType.LETTER, 
    mnemonic: 'C = Chui (吹)', 
    description: '节奏记忆：“吹(—)呀(·)吹(—)呀(·)”。视觉上：C 的上半圆弧是长划，开口处是短促的气流点，下半圆弧是长划，末端是气流点。',
    visualOverlay: { 
      elements: [
        { type: 'dash', x: 50, y: 15 }, // Top arc
        { type: 'dot', x: 85, y: 30 },  // Top gap
        { type: 'dash', x: 50, y: 85 }, // Bottom arc
        { type: 'dot', x: 85, y: 70 }   // Bottom gap
      ] 
    }
  },
  'F': { 
    char: 'F', code: '..-.', type: MorseCharType.LETTER, 
    mnemonic: 'F = Flag (旗帜)', 
    description: 'F 像一面飘扬的旗帜。旗杆顶端的饰球(·)，飘动的旗角(·)，长长的旗杆(—)，地面的插孔(·)。',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 80, y: 15 },  // Finial
        { type: 'dot', x: 75, y: 45 },  // Flag corner
        { type: 'dash', x: 30, y: 50, rotation: 90 }, // Flag pole
        { type: 'dot', x: 30, y: 90 }   // Ground hole
      ] 
    }
  },
  'J': { 
    char: 'J', code: '.---', type: MorseCharType.LETTER, 
    mnemonic: 'J = Jet (喷气机)', 
    description: 'J 像一架喷气式飞机升空。起点(·)是机头，后面拖着三条长长的尾气流(———)。',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 65, y: 20 },  // Nose
        { type: 'dash', x: 65, y: 50, rotation: 90 }, // Body/Contrail
        { type: 'dash', x: 45, y: 84, rotation: 10 }, // Bottom curve (Adjusted position)
        { type: 'dash', x: 20, y: 70, rotation: 45 }  // Tail
      ] 
    }
  },
  'L': { 
    char: 'L', code: '.-..', type: MorseCharType.LETTER, 
    mnemonic: 'L = Leg (腿)', 
    description: 'L 的形状像一只靴子或腿。视觉对应：膝盖(·)、长长的小腿骨(—)、脚后跟(·)、脚尖(·)。',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 30, y: 15 },  // Knee
        { type: 'dash', x: 30, y: 55, rotation: 90 }, // Shin
        { type: 'dot', x: 55, y: 85 },  // Heel
        { type: 'dot', x: 85, y: 85 }   // Toe
      ] 
    }
  },
  'P': { 
    char: 'P', code: '.--.', type: MorseCharType.LETTER, 
    mnemonic: 'P = Parking (停车场)', 
    description: 'P 像停车场的双柱闸门。顶部转轴(·)，第一根竖立支架(—)，第二根竖立支架(—)，底部转轴(·)。',
    visualOverlay: { 
      elements: [
        { type: 'dot', x: 32, y: 18 },  // Top pivot
        { type: 'dash', x: 32, y: 40, rotation: 90, scale: 0.9 }, // Upper Vertical Stand
        { type: 'dash', x: 32, y: 65, rotation: 90, scale: 0.9 }, // Lower Vertical Stand
        { type: 'dot', x: 32, y: 88 }   // Bottom pivot
      ] 
    }
  },
  'Q': { 
    char: 'Q', code: '--.-', type: MorseCharType.LETTER, 
    mnemonic: 'Q = Qi-Qiu (气球)', 
    description: 'Q 像个系着绳子的大气球。上半球(—)和下半球(—)组成圆鼓鼓的球体，底部打个结(·)，拉根长绳(—)。',
    visualOverlay: { 
      elements: [
        { type: 'dash', x: 50, y: 20 }, // Top arc
        { type: 'dash', x: 35, y: 60, rotation: 45 }, // Bottom/Left arc logic
        { type: 'dot', x: 62, y: 72 },  // Knot (Start of tail)
        { type: 'dash', x: 80, y: 88, rotation: -45 } // Tail string
      ] 
    }
  },
  'X': { 
    char: 'X', code: '-..-', type: MorseCharType.LETTER, 
    mnemonic: 'X = X-ray (射线)', 
    description: 'X 像两道强力的射线(—)正在击穿中间的分子结构(··)。',
    visualOverlay: { 
      elements: [
        { type: 'dash', x: 20, y: 20, rotation: 45 }, // Top-left ray
        { type: 'dot', x: 40, y: 45 },  // Molecule 1
        { type: 'dot', x: 60, y: 55 },  // Molecule 2
        { type: 'dash', x: 80, y: 80, rotation: 45 }  // Bottom-right ray
      ] 
    }
  },
  'Y': { 
    char: 'Y', code: '-.--', type: MorseCharType.LETTER, 
    mnemonic: 'Y = Y-Shape (Y字形)', 
    description: '按笔画顺序拆解：第一笔左上分叉是长划(—)，中间汇聚点(·)，第二笔右上分叉长划(—)，第三笔底部竖线长划(—)。',
    visualOverlay: { 
      elements: [
        { type: 'dash', x: 20, y: 20, rotation: 45 }, // Left stroke
        { type: 'dot', x: 50, y: 50 },  // Center join
        { type: 'dash', x: 80, y: 20, rotation: -45 },// Right stroke
        { type: 'dash', x: 50, y: 80, rotation: 90 }  // Bottom stroke
      ] 
    }
  },
  'Z': { 
    char: 'Z', code: '--..', type: MorseCharType.LETTER, 
    mnemonic: 'Z = Zebra (斑马)', 
    description: 'Z 像一匹斑马。头顶鬃毛(—)，倾斜的背部(—)，两只前脚(··)着地。',
    visualOverlay: { 
      elements: [
        { type: 'dash', x: 50, y: 15 }, 
        { type: 'dash', x: 50, y: 50, rotation: -45 }, 
        { type: 'dot', x: 30, y: 85 }, 
        { type: 'dot', x: 70, y: 85 } 
      ] 
    }
  },
};