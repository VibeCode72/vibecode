import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testAI() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: 'Say hello to VibeCode project in one sentence.',
    });
    console.log('\n--- AI Response ---');
    console.log(response.text);
    console.log('-------------------\n');
  } catch (error) {
    console.error('Error connecting to Gemini API:', error.message);
  }
}

testAI();
