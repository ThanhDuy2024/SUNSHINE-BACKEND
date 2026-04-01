import 'dotenv/config';
import express from 'express';
import adminRoute from "./routes/admins/index.route";
import cookieParser from "cookie-parser"
import { connectMySQL } from './configs/mySQL.database';
const app = express();
const port = 4000;
connectMySQL();

app.use(express.json());
app.use(cookieParser());
app.use('/api/admin', adminRoute);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})