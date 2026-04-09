import express from 'express';
import * as  productController from '../../controllers/agents/products.controller';
import multer from 'multer';
import { storage } from '../../helpers/cloudinary.helper';
const route = express.Router();
const upload = multer({
  storage: storage
})
route.post('/create', upload.single('image'), productController.postProductController);
route.get('/list', productController.getAllProductController);
route.get('/detail/:id', productController.getProductController);
route.put('/update/:id', upload.single('image'), productController.putProductController);
route.delete('/delete/:id', productController.deleteProductController);
export default route;