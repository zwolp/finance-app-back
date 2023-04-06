import * as express from 'express';
import { Product } from '../libs/product';

export const productRouter = express.Router()
.get('/', async (req, res) => {
  const products = await Product.getAll();
  res.json(products ? products : []);
})
.get('/:id', async (req, res) => {
  const product = await Product.getOne(req.params.id);
  res.json(product ? product : null);
})
.get('/user/:financeId', async (req, res) => {
  const products = await Product.getAllOfUser(req.params.financeId);
  res.json(products ? products : null)
})
.get('/used/:productId', async (req, res) => {
  const users = await Product.checkIfUsed(req.params.productId)
  res.json(users);
})
.post('/add-user-product', async (req, res) => {
  const product = await Product.addToUser(req.body)
  res.json(product ? product : null);
})
.delete('/', async (req, res) => {
  const product = new Product(req.body)
  await product.delete();
  res.json('product is deleted');
})
.delete('/:financeId/:productId', async (req, res) => {
  const {financeId, productId} = req.params;
  await Product.deleteFromUser(financeId, productId);
  res.json('record is deleted');
})