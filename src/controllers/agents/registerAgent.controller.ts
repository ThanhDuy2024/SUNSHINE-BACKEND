import { RegisterDto } from "../../dto/agents.dto";
import { Res } from "../../interfaces/reqAndReq.interface";
import { user } from "../../interfaces/user.interface";
import { registerService } from "../../services/agents/authentication.service";

export const registerAgentController = async (req: user, res: Res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        }
        const data: RegisterDto = req.body;

        const bool: any = registerService(data, req.user.id);

        if (bool === false) {
            return res.status(400).json({
                code: "error",
                message: "Each orther only one agents"
            })
        }
        res.status(200).json({
            code: "success",
            message: "Register agent successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "error",
            message: "Invalid agent!"
        })
    }
}