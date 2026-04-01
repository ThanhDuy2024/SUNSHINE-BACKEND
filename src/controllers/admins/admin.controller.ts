import { loginDto, registerDto } from "../../dto/authentication.dto";
import { Req, Res } from "../../interfaces/reqAndReq.interface";
import { loginService, registerService } from "../../services/admins/authentication.service";

export const registerController = async (req: Req, res: Res) => {
    try {
        const data: registerDto = req.body;

        const bool: boolean = await registerService(data);

        if (bool === false) {
            return res.status(400).json({
                code: "error",
                message: "Your email is existed!"
            })
        }
        res.status(200).json({
            code: "success",
            message: "Register complete!"
        })
    } catch (error) {
        res.status(400).json({
            code: "error",
            message: "Your email is existed!"
        })
    }
}

export const loginController = async (req: Req, res: Res) => {
    try {
        const data: loginDto = req.body;

        const bool: any = await loginService(data);

        if (bool === false) {
            res.status(400).json({
                code: "error",
                message: "Email or password incorrect!"
            })
        }

        console.log(bool);
        res.status(200).json({
            code: "success",
            message: "Login complete!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "error",
            message: "Email or password incorrect!"
        })
    }
}