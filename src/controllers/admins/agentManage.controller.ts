import { actionDto } from "../../dto/agents.dto";
import { admin } from "../../interfaces/admin.interface";
import { Res } from "../../interfaces/reqAndReq.interface";
import { actionService, getAllAgentService } from "../../services/admins/agentManager.service";

export const getAllAgentController = async (req: admin, res: Res) => {
    try {
        const data = await getAllAgentService();
        res.status(200).json({
            code: "success",
            data: data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "error",
            message: "server error"
        })
    }
}

export const acceptOrDenyController = async (req: admin, res: Res) => {
    try {
        const data: actionDto = req.body;

        const bool: any = await actionService(data, req.admin.id);

        if (bool === false) {
            res.status(400).json({
                code: "error",
                message: "server error"
            })
        }

        res.status(200).json({
            code: "success",
            data: "Action is successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "error",
            message: "server error"
        })
    }
}