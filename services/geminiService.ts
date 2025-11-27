
import { GoogleGenAI } from "@google/genai";
import { MorseChar, Language } from "../types";

const initGenAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getCreativeMnemonic = async (char: MorseChar, lang: Language): Promise<string> => {
  const ai = initGenAI();
  const fallback = lang === 'zh' ? "发挥想象力，把符号看作画！" : "Use your imagination!";
  
  if (!ai) return char.description || fallback;

  try {
    const prompt = lang === 'zh' 
    ? `
      帮助学生记忆摩斯密码 "${char.char}"。
      对应的代码是 "${char.code}"。
      现有的助记词是: "${char.mnemonic}"。
      
      请生成一个非常简短、富有创意且形象的中文句子（30字以内），帮助将字母的形状或读音与“点(.)”和“划(-)”联系起来。
      可以使用谐音梗、形状联想或有趣的场景。
      
      只返回这一句话。
    `
    : `
      Help a student memorize Morse code for "${char.char}".
      The code is "${char.code}".
      Current mnemonic: "${char.mnemonic}".
      
      Generate a short, creative, visual or rhythmic sentence (under 20 words) in English to link the letter to the dots (.) and dashes (-).
      
      Return ONLY the sentence.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || fallback;
  } catch (error: any) {
    console.warn("Gemini API unavailable, using fallback:", error.message);
    const msg = lang === 'zh' ? "(AI 额度耗尽)" : "(AI Quota Limit)";
    return `${msg} ${char.description}`;
  }
};