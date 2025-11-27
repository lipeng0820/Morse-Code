
import { Language, MorseChar, DayPlan, RefItem } from '../types';
import { CHAR_LOGIC, REF_LOGIC } from '../data/visual_config';
import { ZH_CONTENT } from '../locales/zh';
import { EN_CONTENT } from '../locales/en';

const CONTENT_MAP = {
  zh: ZH_CONTENT,
  en: EN_CONTENT,
};

export const getUI = (lang: Language) => {
  return CONTENT_MAP[lang].ui;
};

export const getCharData = (charKey: string, lang: Language): MorseChar => {
  const logic = CHAR_LOGIC[charKey];
  const content = CONTENT_MAP[lang].chars[charKey] || { mnemonic: '', description: '' };
  
  if (!logic) {
    // Fallback for unknown chars
    return {
        char: charKey,
        code: '',
        type: 'LETTER' as any,
        mnemonic: '',
        description: ''
    };
  }

  return {
    ...logic,
    ...content
  };
};

export const getDayPlans = (lang: Language): DayPlan[] => {
  const ui = CONTENT_MAP[lang].ui.dayPlans;
  
  // Logic defines which characters belong to which day
  const d1Chars = ['E', 'T', 'I', 'M', 'A', 'N', 'O', 'S', 'H'];
  const d2Chars = ['D', 'K', 'R', 'U', 'W', 'G', 'B', 'V'];
  const d3Chars = ['C', 'F', 'J', 'L', 'P', 'Q', 'X', 'Y', 'Z'];

  return [
    { id: 1, title: ui.d1_title, description: ui.d1_desc, characters: d1Chars },
    { id: 2, title: ui.d2_title, description: ui.d2_desc, characters: d2Chars },
    { id: 3, title: ui.d3_title, description: ui.d3_desc, characters: d3Chars },
  ];
};

export const getRefItems = (category: 'NUMBERS' | 'PUNCTUATION' | 'PROSIGNS' | 'ABBR', lang: Language): RefItem[] => {
  const logicList = REF_LOGIC[category];
  const refContent = CONTENT_MAP[lang].ref;

  return logicList.map(item => ({
    ...item,
    desc: refContent[item.label] || item.label // Fallback to label if no translation
  }));
};

export const getAllChars = (lang: Language): Record<string, MorseChar> => {
  const all: Record<string, MorseChar> = {};
  Object.keys(CHAR_LOGIC).forEach(key => {
    all[key] = getCharData(key, lang);
  });
  return all;
};
