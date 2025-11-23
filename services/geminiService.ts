import { GoogleGenAI } from "@google/genai";
import { MorseChar } from "../types";

const initGenAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // Fail silently in init, handle in calls
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getCreativeMnemonic = async (char: MorseChar): Promise<string> => {
  const ai = initGenAI();
  if (!ai) return char.description || "发挥想象力，把符号看作画！";

  try {
    const prompt = `
      帮助学生记忆摩斯密码 "${char.char}"。
      对应的代码是 "${char.code}"。
      现有的助记词是: "${char.mnemonic}"。
      
      请生成一个非常简短、富有创意且形象的中文句子（30字以内），帮助将字母的形状或读音与“点(.)”和“划(-)”联系起来。
      可以使用谐音梗、形状联想或有趣的场景。
      
      只返回这一句话。
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "把点想象成星星，把划想象成流星！";
  } catch (error: any) {
    // Graceful fallback for quota limits or network issues
    console.warn("Gemini API unavailable, using fallback:", error.message);
    
    // Fallback logic specific to the error type if needed
    if (error.status === 429 || error.message?.includes('429')) {
         return `(AI 额度耗尽) 小贴士：${char.description}`;
    }
    
    return char.description || "观察字母的形状，答案就在其中！";
  }
};

export const generatePracticeSentence = async (chars: string[]): Promise<string> => {
    const ai = initGenAI();
    // Fallback sentence if AI is not available
    if (!ai) return "SOS E T I M A";
  
    try {
      const charStr = chars.join(", ");
      const prompt = `
        Create a simple practice sentence using ONLY these letters: [${charStr}].
        Keep it short (max 5 words). English words are fine as they are standard for Morse.
        Return ONLY the sentence.
      `;
  
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
  
      return response.text || "SOS";
    } catch (error) {
      // Quiet fail for practice sentences
      return "SOS E E T T"; 
    }
  };