import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateProjectPlan(userPrompt, retries = 3) {
  const systemInstruction = `You are the Manager/Planner Agent for VibeCode.
Analyze the user's idea and generate a JSON architecture plan for a web app.
Return ONLY raw valid JSON text without markdown wrappers like \`\`\`json.
Exact format:
{
  "projectName": "string",
  "description": "string",
  "techStack": ["string"],
  "files": [
    { "path": "string", "description": "string" }
  ]
}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `${systemInstruction}\n\nUser Request: ${userPrompt}`,
      });

      const cleanText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanText);
    } catch (error) {
      if (attempt === retries) throw error;
      console.log(`[Planner] Server busy, retrying... (${attempt}/${retries})`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}
