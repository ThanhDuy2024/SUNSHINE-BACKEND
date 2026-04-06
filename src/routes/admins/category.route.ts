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
route.put('/update/:id', upload.single('image'), categoryController.putCategory);
route.get('/detail/:id', categoryController.getCategory);
route.delete('/delete/:id', categoryController.deleteCategory);
export default route;