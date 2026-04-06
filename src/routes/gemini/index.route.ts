import express from 'express';
import { recommendController } from '../../controllers/gemini/recommend.controller';
const route = express.Router();

route.post('/recommend', recommendController);
export default route;