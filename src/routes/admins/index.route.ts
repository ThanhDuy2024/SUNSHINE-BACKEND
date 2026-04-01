import express from "express";
import authRoute from "./admin.route";
const route = express.Router();

route.use('/auth', authRoute);

export default route;