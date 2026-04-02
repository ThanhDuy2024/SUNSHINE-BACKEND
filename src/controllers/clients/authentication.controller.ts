import { loginDto, profileDto, registerDto } from "../../dto/authentication.dto";
import { Req, Res } from "../../interfaces/reqAndReq.interface";
import { user } from "../../interfaces/user.interface";
import { Users } from "../../Models/Users.model";
import { loginService, profileService, registerService, verifyOtp } from "../../services/clients/authentication.service";
import jwt from 'jsonwebtoken';
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

export const loginController = async (req: Req, res: Res) => {
    try {
        const data: loginDto = req.body;
        const bool: any = await loginService(data);

        if (bool === false) {
            return res.status(404).json({
                code: "error",
                message: "Email or password incorrected!"
            })
        }

        const token = jwt.sign({
            id: bool.id,
            fullName: bool.fullName
        }, String(process.env.JWT_PASSWORD2));

        res.cookie("userToken", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: String(process.env.ENVIROIMENT) == "dev" ? false : true,
            sameSite: "lax",
        });
        res.status(200).json({
            code: "success",
            message: "Login complete!"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            code: "error",
            message: "Email or password incorrected!"
        })
    }
}

export const getProfileController = async (req: user, res: Res) => {
    try {
        const account = await Users.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.user.id,
            }
        })
        res.status(200).json({
            code: "success",
            data: account?.dataValues
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "error",
            message: "Invalid token!"
        })
    }
}

export const putProfileController = async (req: user, res: Res) => {
    try {
        if(req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        }
        const data: profileDto = req.body;

        const bool: any = profileService(data, req.user.id);

        if (bool === false) {
            return res.status(400).json({
                code: "error",
                message: "Invalid token!"
            })
        };

        res.status(200).json({
            code: "success",
            message: "profile update successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "error",
            message: "Invalid token!"
        })
    }
}

export const logoutController = async (req: user, res: Res) => {
    res.clearCookie('userToken');
    res.status(200).json({
        code: "success",
        message: "Logout successfully!"
    })
}