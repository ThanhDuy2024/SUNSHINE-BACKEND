import { NextFunction } from "express";
import { Res } from "../../interfaces/reqAndReq.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { user } from "../../interfaces/user.interface";
export const clientMiddleware = (req: user, res: Res, next: NextFunction) => {
    try {
        const token = req.cookies.userToken;
        const decode = jwt.verify(token, String(process.env.JWT_PASSWORD2)) as JwtPayload;
        req.user = decode
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "error",
            message: "Invalid token"
        })
    }
}