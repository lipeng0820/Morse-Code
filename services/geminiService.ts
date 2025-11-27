
import { GoogleGenAI } from "@google/genai";
import { MorseChar, Language } from "../types";

const initGenAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getCreativeMnemonic = async (
  char: MorseChar, 
  lang: Language, 
  userInput?: string
): Promise<{ mnemonic: string; description: string }> => {
  const ai = initGenAI();
  const fallback = {
    mnemonic: lang === 'zh' ? `${char.char} = 创意联想` : `${char.char} = Creative Idea`,
    description: lang === 'zh' ? "AI 暂时无法连接，请发挥你的想象力！" : "AI is unavailable. Use your imagination!"
  };
  
  if (!ai) return fallback;

  try {
    const context = userInput ? `User Context: "${userInput}"` : "No specific context.";

    const prompt = lang === 'zh' 
    ? `
      任务：为摩斯密码字符 "${char.char}" (代码: "${char.code}") 创建一个助记。
      ${context}
      
      要求：
      1. 核心助记词(mnemonic)：简短有力(10字内)，结合 "${char.char}" 和用户提供的线索(如果有)。
      2. 详细描述(description)：解释如何通过线索或 "${char.char}" 的形状/发音，联想到点(.)和划(-)。必须包含点划的对应关系。
      
      请严格返回合法的 JSON 格式，不要包含 Markdown 代码块标记：
      { "mnemonic": "...", "description": "..." }
    `
    : `
      Task: Create a mnemonic for Morse code "${char.char}" (Code: "${char.code}").
      ${context}
      
      Requirements:
      1. Mnemonic (mnemonic): Short and punchy (under 5 words), combining "${char.char}" and user context (if any).
      2. Description (description): Explain the link between the context/shape/sound and the dots(.)/dashes(-).
      
      Return STRICTLY valid JSON, no markdown code blocks:
      { "mnemonic": "...", "description": "..." }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "";
    // Clean up potential markdown formatting if API doesn't strictly obey responseMimeType in all cases (defensive)
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(jsonStr);

  } catch (error: any) {
    console.warn("Gemini API error:", error.message);
    return {
        mnemonic: fallback.mnemonic,
        description: `${lang === 'zh' ? '(AI 额度耗尽或解析错误) ' : '(AI Error) '} ${char.description}`
    };
  }
};
