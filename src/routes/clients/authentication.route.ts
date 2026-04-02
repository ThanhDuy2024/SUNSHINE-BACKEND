import express from "express";
import { otpReceiveController, registerController, loginController} from "../../controllers/clients/authentication.controller";
const route = express.Router();

route.post('/register', registerController);
route.post('/otp', otpReceiveController);
route.post('/login', loginController);
export default route;