import { NextFunction } from "express";
import { Req, Res } from "../../interfaces/reqAndReq.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { admin } from "../../interfaces/admin.interface";
export const adminMiddleware = async (req: admin, res: Res, next: NextFunction) => {
    try {
        const token = req.cookies.adminToken;
        const decode = jwt.verify(token, String(process.env.JWT_PASSWORD)) as JwtPayload;
        req.admin = decode
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "error",
            message: "Token is expired!"
        })
    }
}