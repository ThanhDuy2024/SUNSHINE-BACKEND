import 'dotenv/config';
import express from 'express';
import cookieParser from "cookie-parser"
import passport from './configs/auth02.config';
import adminRoute from "./routes/admins/index.route";
import clientRoute from './routes/clients/index.route';
import agentRoute from './routes/agents/index.route';
import aiRoute from './routes/gemini/index.route';
import { connectMySQL } from './configs/mySQL.database';
import { connectMongodb } from './configs/mongodb.database';
import { limiter } from './configs/rateLimit.config';
const app = express();
const port = process.env.PORT;
connectMongodb();
connectMySQL();

app.use(passport.initialize());

app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use('/api/admin', adminRoute);
app.use('/api/client', clientRoute);
app.use('/api/agent', agentRoute);
app.use('/api/ai', aiRoute);
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})