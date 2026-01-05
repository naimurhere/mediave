import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  async generateStrategy(prompt: string) {
    if (!this.ai) {
      const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
      if (!apiKey) return "API Key not configured. Please set API_KEY in your environment.";
      this.ai = new GoogleGenAI({ apiKey });
    }

    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: `You are the Mediave AI Video Strategist. You specialize in high-retention, high-impact content strategy.
        
        CRITICAL STYLE RULES:
        1. BREVITY IS KING: Your responses must be short, punchy, and "hooked". Do not use filler words.
        2. HOOK-FIRST: Always start with a high-impact viral hook or a bold statement.
        3. DATA-DRIVEN: Use specific numbers (e.g., "3.5x retention", "the first 2 seconds") to sound authoritative.
        4. PREMIUM TONE: Sound like a world-class creative director at a high-end agency.
        
        FORMATTING RULES:
        - Use **bold text** for the most important "grabber" terms.
        - Use clean bullet points for tactical steps.
        - Limit responses to 2-3 short sections max.
        - No fluff intro or outro. Go straight to the value.`,
        temperature: 0.9,
      },
    });

    return response.text;
  }
}

export const gemini = new GeminiService();