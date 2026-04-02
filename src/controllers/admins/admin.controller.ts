import { Op } from "sequelize";
import { loginDto, profileDto, registerDto } from "../../dto/authentication.dto";
import { admin } from "../../interfaces/admin.interface";
import { Req, Res } from "../../interfaces/reqAndReq.interface";
import { Admin } from "../../Models/Admins.model";
import { loginService, profileService, registerService } from "../../services/admins/authentication.service";
import jwt from "jsonwebtoken";
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

        const token = jwt.sign({
            id: bool.id,
            fullName: bool.fullName
        }, String(process.env.JWT_PASSWORD));

        res.cookie("adminToken", token, {
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
        res.status(400).json({
            code: "error",
            message: "Email or password incorrect!"
        })
    }
}

export const getProfileController = async (req: admin, res: Res) => {
    try {
        const data = await Admin.findOne({
            attributes: { exclude: ['password', 'status', 'role'] },
            where: {
                id: req.admin.id,
            }
        });

        res.status(200).json({
            code: "success",
            data: data?.dataValues,
        })
    } catch (error) {
        res.status(400).json({
            code: "error",
            message: "Invalid token"
        })
    }
}

export const putProfileController = async (req: admin, res: Res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        };

        const data: profileDto = req.body;

        const bool: any = await profileService(data, req.admin.id);
        if (bool === false) {
            return res.status(400).json({
                code: "error",
                message: "Your email you want to update is existed!"
            })
        }
        res.status(200).json({
            code: "success",
            message: "Profile update successfully!"
        })
    } catch (error) {
        res.status(400).json({
            code: "error",
            message: "Invalid token"
        })
    }
}