import * as express from "express";
import * as cors from "cors";
import { json } from "express";
import 'express-async-errors'
import { userRouter } from "./routes/user";
import './utils/db'


const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(json());

app.use('/user', userRouter)

app.listen(3001, '0.0.0.0', () => {
  console.log('server running on http://localhost:3001');
})