import { shippingDto } from "../../dto/shipping.dto";
import { admin } from "../../interfaces/admin.interface";
import { Res } from "../../interfaces/reqAndReq.interface";
import * as shippingService from '../../services/admins/shipping.service';

export const postShippingController = async (req: admin, res: Res) => {
  try {
    const data: shippingDto = req.body
    const ans: any = await shippingService.postShippingController(req.admin.id, data);

    if (ans === false) {
      res.status(200).json({
        code: "success",
        message: "Shipping create false!"
      })
    }
    res.status(200).json({
      code: "success",
      message: "Shipping create successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Invalid token!"
    })
  }
}

export const getAllShippingController = async (req: admin, res: Res) => {
  try {
    const filter: Record<string, any> = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      search: String(req.query.search),
      status: String(req.query.status)
    }

    const ans: any = await shippingService.getAllShippingController(filter);
    res.status(200).json({
      code: "success",
      data: ans.data,
      totalPage: ans.totalPage
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Invalid token!"
    })
  }
}

export const getShippingController = async (req: admin, res: Res) => {
  try {
    const id = Number(req.params.id);
    const ans: any = await shippingService.getShippingController(id);

    if (ans === false) {
      return res.status(404).json({
        code: "error",
        message: "Shipping not found!"
      })
    }
    res.status(200).json({
      code: "success",
      data: ans
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Invalid token!"
    })
  }
}

export const putShippingController = async (req: admin, res: Res) => {
  try {
    const ans: any = await shippingService.putShippingController(req.admin.id, Number(req.params.id), req.body);
    if (ans === false) {
      return res.status(404).json({
        code: "error",
        message: "Shipping not found!"
      })
    }
    res.status(200).json({
      code: "success",
      message: "Shipping create successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Invalid token!"
    })
  }
}