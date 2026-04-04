import express from 'express';
import * as categoryController from '../../controllers/admins/categories.controller';
import multer from 'multer';
import { storage } from '../../helpers/cloudinary.helper';
const route = express.Router();
const upload = multer({
    storage: storage,
})
route.post('/create', upload.single('image'), categoryController.postCategory);
route.get('/list', categoryController.getAllCategory);
export default route;