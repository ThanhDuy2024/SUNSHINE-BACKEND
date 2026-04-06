import { Req, Res } from "../../interfaces/reqAndReq.interface";
import { recommendProductAI } from "../../services/gemini/gemini.service";

export const recommendController = async (req: Req, res: Res) => {
  try {
    const products = [
      { name: "iPhone 15", price: 20000000 },
      { name: "Samsung S24", price: 18000000 },
      { name: "Xiaomi 13", price: 12000000 },
      { name: "Laptop Dell XPS", price: 30000000 }
    ];
    const dataRecommend = await recommendProductAI(req.body.keywords, products);
    res.status(200).json({
      code: "success",
      data: dataRecommend
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "gemini error"
    })
  }
}