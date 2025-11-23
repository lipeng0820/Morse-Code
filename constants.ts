import { MorseChar, DayPlan } from './types';
import { DAY1_CHARS } from './constants_day1';
import { DAY2_CHARS } from './constants_day2';
import { DAY3_CHARS } from './constants_day3';

// Combine all days into the master dictionary
export const MORSE_DICTIONARY: Record<string, MorseChar> = {
  ...DAY1_CHARS,
  ...DAY2_CHARS,
  ...DAY3_CHARS,
};

export const DAY_PLANS: DayPlan[] = [
  {
    id: 1,
    title: '第一天：基础信号',
    description: '从最简单的对称图形和基本点划开始，建立摩斯密码的直觉。',
    characters: Object.keys(DAY1_CHARS)
  },
  {
    id: 2,
    title: '第二天：进阶逻辑',
    description: '学习通过视觉形状和声音节奏强关联的字符。',
    characters: Object.keys(DAY2_CHARS)
  },
  {
    id: 3,
    title: '第三天：精通复杂',
    description: '攻克最复杂的字符，完成字母表拼图。',
    characters: Object.keys(DAY3_CHARS)
  }
];
