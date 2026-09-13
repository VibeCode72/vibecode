import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateFileCode(projectPlan, filePath, fileDescription, retries = 5) {
  const systemInstruction = `You are the Expert Coder Agent for VibeCode.
Generate production-ready code for the requested file based on the project plan.
Return ONLY the raw code text without any explanation, standard text, or markdown blocks (do not use \`\`\`js or \`\`\`jsx).

Project Context:
${JSON.stringify(projectPlan, null, 2)}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `${systemInstruction}\n\nTarget File: ${filePath}\nFile Purpose: ${fileDescription}`,
      });

      return response.text.replace(/```[a-z]*/g, '').replace(/```/g, '').trim();
    } catch (error) {
      if (attempt === retries) throw error;
      console.log(`[Coder] Server busy for ${filePath}, retrying... (${attempt}/${retries})`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}
