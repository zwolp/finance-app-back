import express from "express";
import cors from "cors";
import { json } from "express";
import 'express-async-errors';
import rateLimit from 'express-rate-limit'
import { userRouter } from "./routes/user";
import './utils/db';
import { financeRouter } from "./routes/finance";
import { productRouter } from "./routes/product";
import { adminRouter } from "./routes/admin";
import { financeProductRouter } from "./routes/finance-product";

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(limiter);

/* app.use(cors({
  origin: '*',
})); */
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(json()); 

app.use('/api/user', userRouter);
app.use('/api/finance', financeRouter);
app.use('/api/product', productRouter);
app.use('/api/finance-product', financeProductRouter);
app.use('/api/admin', adminRouter);

app.listen(3001, '0.0.0.0', () => {
  console.log('server running on http://localhost:3001');
});