import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Corrected model ID to the current, stable version
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
// If you want the highest performance, use "gemini-2.5-pro" instead.

export const geminiController = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    

    const result = await model.generateContent(prompt);
    const text = result.response.text();
 
    
    res.json({ reply: text });

  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};