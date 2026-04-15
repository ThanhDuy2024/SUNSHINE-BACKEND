import { Req, Res } from "../../interfaces/reqAndReq.interface";
import * as productService from "../../services/clients/product.service";

export const getAllProductController = async (req: Req, res: Res) => {
  try {
    //search, filter theo price, category, agentId, pagination
    const filter: any = {
      search: req.query.search,
      price: String(req.query.price),
      category: Number(req.query.category),
      page: Number(req.query.page),
      limit: Number(req.query.limit)
    }
    const data: any = await productService.getAllProductService(filter);

    if(data === false) {
      return res.status(400).json({
        code: "error",
        data: []
      })
    }
    res.status(200).json({
      code: "success",
      data: data.products,
      totalPage: data.totalPage
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      code: "error",
      message: "product error"
    })
  }
}

export const detailProductController = async (req: Req, res: Res) => {
  try {    
    const data: any = await productService.detailProductService(Number(req.params.id));

    if(data === false) {
      return res.status(404).json({
        code: "error",
        message: "Product not found!"
      })
    }
    res.status(200).json({
      code: "success",
      data: data,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      code: "error",
      message: "product error"
    })
  }
}