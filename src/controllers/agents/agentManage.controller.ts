import { Res } from "../../interfaces/reqAndReq.interface";
import { user } from "../../interfaces/user.interface";

export const getAgentController = async (req: user, res: Res) => {
    try {
        res.status(200).json({
            code: "success",
            data: ''
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "error",
            message: "Invalid token"
        })
    }
}