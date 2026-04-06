import express from "express";
import { otpReceiveController, registerController, loginController, getProfileController, putProfileController, logoutController} from "../../controllers/clients/authentication.controller";
import { clientMiddleware } from "../../middlewares/clients/client.middleware";
import multer from "multer";
import { storage } from "../../helpers/cloudinary.helper";
import { googleCallback, googleLogin } from "../../controllers/clients/authentication02.controller";
const route = express.Router();
const upload = multer({
    storage: storage,
})
route.post('/register', registerController);
route.post('/otp', otpReceiveController);
route.post('/login', loginController);
route.get('/profile', clientMiddleware, getProfileController);
route.put('/profile', clientMiddleware, upload.single("image"), putProfileController);
route.get('/logout', clientMiddleware, logoutController);

route.get('/google', googleLogin);
route.get('/google/callback', googleCallback);
export default route;