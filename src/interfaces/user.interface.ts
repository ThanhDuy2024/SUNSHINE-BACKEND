import { Request } from "express";

export interface user extends Request {
    user?: any
}