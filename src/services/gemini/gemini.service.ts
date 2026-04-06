import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(String(process.env.AI_KEY));

export const recommendProductAI = async (userInput: string, products: any) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        Bạn là AI gợi ý sản phẩm cho website bán hàng.

        Danh sách sản phẩm:
        ${JSON.stringify(products)}

        Người dùng tìm: "${userInput}"

        Hãy chọn sản phẩm phù hợp và giải thích ngắn gọn.
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();

    } catch (error) {
        console.log(error);
        return false;
    }
}