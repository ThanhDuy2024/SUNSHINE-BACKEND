import express from 'express';
import * as shippingController from '../../controllers/admins/shipping.controller';
const route = express.Router();

route.post('/create', shippingController.postShippingController);
route.get('/detail/:id', shippingController.getShippingController);
route.put('/update/:id', shippingController.putShippingController);
route.get('/list', shippingController.getAllShippingController);
export default route;