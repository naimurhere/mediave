import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: any = null;

  private init() {
    if (this.ai) return true;
    
    // Look for key in window.process (shimmed) or native process.env
    const apiKey = (window as any).process?.env?.API_KEY || (typeof process !== 'undefined' ? process.env.API_KEY : '');
    
    if (apiKey && apiKey !== '') {
      this.ai = new GoogleGenAI({ apiKey });
      return true;
    }
    return false;
  }

  async generateStrategy(prompt: string) {
    const isReady = this.init();
    
    if (!isReady) {
      return "Strategy Engine offline. Please ensure the API_KEY environment variable is set in your hosting dashboard.";
    }

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          systemInstruction: `You are the Mediave AI Video Strategist. You specialize in high-retention, high-impact content strategy.
          
          CRITICAL STYLE RULES:
          1. BREVITY IS KING: Your responses must be short, punchy, and "hooked".
          2. HOOK-FIRST: Always start with a high-impact viral hook.
          3. PREMIUM TONE: Sound like a world-class creative director.
          
          FORMATTING:
          - Use **bold text** for grabber terms.
          - Use clean bullet points.
          - Max 2-3 short sections.`,
          temperature: 0.9,
        },
      });

      return response.text;
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      if (error.message?.includes("API key not valid")) {
        return "Invalid API Key. Please verify your Gemini API Key in the environment settings.";
      }
      return "The connection is choppy. Please try again in a moment.";
    }
  }
}

export const gemini = new GeminiService();