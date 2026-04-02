import express from "express";
import authRoute from "./admin.route";
import agentRoute from "./agentManage.route";
const route = express.Router();

route.use('/auth', authRoute);
route.use('/agent', agentRoute);
export default route;