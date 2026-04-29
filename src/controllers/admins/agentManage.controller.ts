import { actionDto } from "../../dto/agents.dto";
import { admin } from "../../interfaces/admin.interface";
import { Res } from "../../interfaces/reqAndReq.interface";
import { actionService, getAllAgentService } from "../../services/admins/agentManager.service";

export const getAllAgentController = async (req: admin, res: Res) => {
    try {
        const status = String(req.query.status)
        const search = req.query.search
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const data: any = await getAllAgentService(status, search, page, limit);
        res.status(200).json({
            code: "success",
            data: data.data,
            totalPage: data.totalPage
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