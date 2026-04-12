import { orderDto, orderUpdateDto } from "../../dto/order.dto";
import { Res } from "../../interfaces/reqAndReq.interface";
import { user } from "../../interfaces/user.interface";
import { deleteOrderService, getAllOrderService, getOrderService, postOrderService, putOrderService } from "../../services/clients/order.service";

export const postOrderController = async (req: user, res: Res) => {
  try {
    const orderData: orderDto = (req.body);
    const bool: any = await postOrderService(req.user.id, orderData);
    if (bool === false) {
      return res.status(400).json({
        code: "error",
        message: "Order false!"
      })
    }

    res.status(200).json({
      code: "success",
      message: "Order create successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "Invalid token"
    })
  }
}

export const getAllOrderController = async (req: user, res: Res) => {
  try {
    const filter: Record<string, number> = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
    }
    const bool: any = await getAllOrderService(req.user.id, filter);
    if (bool === false) {
      res.status(400).json({
        code: "error",
        message: "Invalid token"
      })
    }
    res.status(200).json({
      code: "success",
      data: bool.data,
      totalPage: bool.totalPage
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Invalid token"
    })
  }
}

export const getOrderController = async (req: user, res: Res) => {
  try {
    const bool: any = await getOrderService(req.user.id, Number(req.params.id));

    if (bool === false) {
      return res.status(404).json({
        code: "error",
        message: "Your order not found!"
      })
    }
    res.status(200).json({
      code: "success",
      data: bool
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Invalid token"
    })
  }
}

export const putOrderController = async (req: user, res: Res) => {
  try {
    const dataUpdate: orderUpdateDto = {
      id: Number(req.params.id),
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
    }
    const bool: any = await putOrderService(req.user.id, dataUpdate);

    if (bool === false) {
      return res.status(404).json({
        code: "error",
        message: "Your order not found!"
      })
    }
    res.status(200).json({
      code: "success",
      message: "Order update successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Invalid token"
    })
  }
}

export const deleteOrderController = async (req: user, res: Res) => {
  try {
    const bool: any = await deleteOrderService(req.user.id, Number(req.params.id));

    if (bool === false) {
      return res.status(400).json({
        code: "error",
        message: "Your order not found!"
      })
    }
    res.status(200).json({
      code: "success",
      message: "Order delete successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Invalid token"
    })
  }
}