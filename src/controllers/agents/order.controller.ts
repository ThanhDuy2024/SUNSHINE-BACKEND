import { agentCheck } from "../../helpers/agent.helper";
import { Res } from "../../interfaces/reqAndReq.interface";
import { user } from "../../interfaces/user.interface";
import * as orderService from '../../services/agents/order.service';
export const getAllOrderController = async (req: user, res: Res) => {
  try {
    const agent = await agentCheck(req.user.id);
    if (agent === false) {
      return res.status(404).json({
        code: "error",
        message: "Your agent not found!"
      })
    };

    const account = {
      userId: req.user.id,
      agentId: agent.id,
    };

    const filter = {
      status: req.query.status,
      page: Number(req.query.page),
      limit: Number(req.query.limit)
    }

    const bool: any = await orderService.getAllOrderService(account, filter);

    if (bool === false) {
      return res.status(404).json({
        code: "error",
        message: "Your agent not found!"
      })
    }
    res.status(200).json({
      code: "success",
      data: bool
    })
  } catch (error) {
    console.log(error);
    res.status(200).json({
      code: "error",
      message: "Invalid token!"
    })
  }
}

export const getOrderController = async (req: user, res: Res) => {
  try {
    res.status(200).json({
      code: "success",
      message: "order controller is here"
    })
  } catch (error) {
    console.log(error);
    res.status(200).json({
      code: "error",
      message: "Invalid token!"
    })
  }
}

export const putOrderController = async (req: user, res: Res) => {
  try {
    res.status(200).json({
      code: "success",
      message: "order controller is here"
    })
  } catch (error) {
    console.log(error);
    res.status(200).json({
      code: "error",
      message: "Invalid token!"
    })
  }
}