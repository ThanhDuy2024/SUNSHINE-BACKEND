import { orderDto } from "../../dto/order.dto";
import { Res } from "../../interfaces/reqAndReq.interface";
import { user } from "../../interfaces/user.interface";
import { postOrderService } from "../../services/clients/order.service";

export const postOrderController = async (req: user, res: Res) => {
  try {
    const orderData: orderDto = (req.body);
    const bool: any = await postOrderService(req.user.id, orderData);
    if(bool === false) {
      return res.status(400).json({
        code: "error",
        message: "Order false!"
      })
    }

    res.status(200).json({
      code: "success",
      message: "Order successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "Invalid token"
    })
  }
}