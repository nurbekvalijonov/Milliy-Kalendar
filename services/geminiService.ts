import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are the official AI Assistant for "Milliy Kalendar", a B2G/E-Gov startup in Uzbekistan.
Your goal is to explain the platform to investors and government officials.
Key Features:
- Unified digital time infrastructure for Uzbekistan.
- 3D Interactive Calendar & Map.
- Modules for National Holidays, Religious dates (Ramadan), and Mahalla community events.
- Ticketing system with 3% commission.
- Analytics dashboard for the government.

Languages: Fluent in Uzbek, English, and Russian. Answer in the language the user speaks.
Tone: Professional, Futuristic, Welcoming, Investor-friendly.
Restrictions: This is a demo. Do not make up real personal data.
`;

export const initializeChat = async () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 1024 } // Enable thinking for complex query handling
      },
    });
    return true;
  } catch (error) {
    console.error("Failed to init chat", error);
    return false;
  }
};

export const sendMessageToGemini = async (message: string): Promise<AsyncGenerator<string, void, unknown>> => {
  if (!chatSession) {
    await initializeChat();
  }
  
  if (!chatSession) throw new Error("Chat session not initialized");

  try {
    const result = await chatSession.sendMessageStream({ message });
    
    async function* streamGenerator() {
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          yield c.text;
        }
      }
    }
    return streamGenerator();

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
