import { updateAgent } from "../../dto/agents.dto";
import { Res } from "../../interfaces/reqAndReq.interface";
import { user } from "../../interfaces/user.interface";
import { deleteAgentService, getAgentService, putAgentService } from "../../services/agents/agentManage.service";

export const getAgentController = async (req: user, res: Res) => {
    try {
        const user = req.user.id;
        const bool: any = await getAgentService(user);

        if (bool === false) {
            return res.status(404).json({
                code: "error",
                message: "You not create agent"
            })
        }

        if (bool === "banned") {
            return res.status(400).json({
                code: "error",
                message: "Your agent has been banned"
            })
        }

        if (bool === "inactive") {
            return res.status(400).json({
                code: "error",
                message: "Your agent has not been active"
            })
        }

        if (bool === "delete") {
            return res.status(400).json({
                code: "error",
                message: "Your agent has been delete by you"
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

export const putAgentController = async (req: user, res: Res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        };

        const id = req.user.id;
        const data: updateAgent = req.body;

        const bool: any = putAgentService(data, id);

        if (bool === false) {
            return res.status(404).json({
                code: "error",
                message: "You not create agent"
            })
        }

        res.status(200).json({
            code: "success",
            message: "Your agent update successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "success",
            message: "Invalid token"
        })
    }
}

export const deleteAgentController = async (req: user, res: Res) => {
    try {
        const bool: any = deleteAgentService(req.user.id);
        if (bool === false) {
            return res.status(404).json({
                code: "error",
                message: "You not create agent"
            })
        }
        res.status(200).json({
            code: "success",
            message: "Your agent delete successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "success",
            message: "Invalid token"
        })
    }
}