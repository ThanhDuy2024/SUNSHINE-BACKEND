import express from "express";
import { otpReceiveController, registerController } from "../../controllers/clients/authentication.controller";
const route = express.Router();

route.post('/register', registerController);
route.post('/otp', otpReceiveController);
export default route;