import { loginDto, registerDto } from "../../dto/authentication.dto";
import { Req, Res } from "../../interfaces/reqAndReq.interface";
import { registerService, verifyOtp } from "../../services/clients/authentication.service";

export const registerController = async (req: Req, res: Res) => {
    try {
        const data: registerDto = req.body;
        const bool: any = await registerService(data);

        if (bool === false) {
            return res.status(400).json({
                code: "error",
                message: "Your email is existed!"
            })
        }
        res.status(200).json({
            code: "success",
            message: "Your otp has been sended your email"
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            code: "error",
            message: "Your email is existed!"
        })
    }
}

export const otpReceiveController = async (req: Req, res: Res) => {
    try {
        const otp = req.body.otp;
        const bool: any = verifyOtp(otp);

        if (bool === false) {
            return res.status(400).json({
                code: "error",
                message: "Your otp incorrect!"
            })
        };

        res.status(200).json({
            code: "success",
            message: "Register complete"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "error",
            message: "Your otp incorrect!"
        })
    }
}