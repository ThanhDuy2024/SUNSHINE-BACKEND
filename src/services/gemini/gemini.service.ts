import { model } from '../../configs/gemini.config';

export const recommendProductAI = async (userInput: string, products: any[]) => {
    try {
        // 1. Chỉ lọc ra các thông tin cần thiết để tiết kiệm Token
        const simplifiedProducts = products.map(p => ({
            name: p.name,
            price: p.price,
        }));

        const prompt = `
        Bạn là một chuyên gia tư vấn bán hàng thông minh. 
        Dựa trên danh sách sản phẩm sau: ${JSON.stringify(simplifiedProducts)}

        Người dùng đang yêu cầu: "${userInput}"

        Nhiệm vụ:
        - Chọn ra tối đa 3 sản phẩm phù hợp nhất.
        - Trả lời bằng tiếng Việt, giọng văn thân thiện.
        - Với mỗi sản phẩm, nêu rõ lý do tại sao nó phù hợp.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text();

    } catch (error) {
        console.error("Lỗi AI Recommend:", error);
        return "Xin lỗi, hiện tại tôi không thể đưa ra gợi ý. Vui lòng thử lại sau!";
    }
}