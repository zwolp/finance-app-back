import * as express from "express";
import * as cors from "cors";
import { json } from "express";
import 'express-async-errors';
import { userRouter } from "./routes/user";
import './utils/db';
import { financeRouter } from "./routes/finance";
import { productRouter } from "./routes/product";
import { adminRouter } from "./routes/admin";
import { financeProductRouter } from "./routes/finance-product";

const app = express();

app.use(cors({
  origin: '*',
}));
/* app.use(cors({
  origin: 'http://localhost:3000/',
})); */
/* app.use(cors({
  origin: 'https://d3a7-5-173-172-24.eu.ngrok.io',
})); */
app.use(json()); 

app.use('/user', userRouter);
app.use('/finance', financeRouter);
app.use('/product', productRouter);
app.use('/finance-product', financeProductRouter);
app.use('/admin', adminRouter);

app.listen(3001, '0.0.0.0', () => {
  console.log('server running on http://localhost:3001');
});