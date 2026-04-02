import express from "express";
import { getProfileController, loginController, putProfileController, registerController } from "../../controllers/admins/admin.controller";
import { adminMiddleware } from "../../middlewares/admins/admins.middleware";
import multer from "multer";
import { storage } from "../../helpers/cloudinary.helper";
const route = express.Router();
const upload = multer({
    storage: storage,
});
route.post('/register', registerController);
route.post('/login', loginController);
route.get('/profile', adminMiddleware, getProfileController);
route.put('/profile', adminMiddleware, upload.single('image'), putProfileController);
export default route;