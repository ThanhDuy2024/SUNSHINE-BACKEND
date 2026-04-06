import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API_KEY) || '');
export const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview", // Dùng bản flash cho tốc độ nhanh và rẻ
  generationConfig: { temperature: 0.7 } // Độ sáng tạo vừa phải
}); 