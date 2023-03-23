import * as express from 'express';
import { Product } from '../libs/product';

export const productRouter = express.Router()
.get('/', async (req, res) => {
  const products = await Product.getAll();
  res.json(products)
})
.get('/:id', async (req, res) => {
  const product = await Product.getOne(req.params.id);
  res.json(product)
})
.get('/user/:financeId', async (req, res) => {
  const products = await Product.getAllOfUser(req.params.financeId);
  res.json(products)
})
.post('/add-product', async (req, res) => {
  const product = await Product.addToUser(req.body)
  res.json(product);
})
.delete('/:financeId/:productId', async (req, res) => {
  const {financeId, productId} = req.params;
  await Product.deleteFromUser(financeId, productId);
  res.json('record is deleted');
})