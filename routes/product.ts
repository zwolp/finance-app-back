import * as express from 'express';
import { Product } from '../libs/product';

export const productRouter = express.Router()
.get('/user/:financeId', async (req, res) => {
  const products = await Product.getAllProducts(req.params.financeId);
  res.json(products)
})
.get('/:id', async (req, res) => {
  const product = await Product.getProduct(req.params.id);
  res.json(product)
})