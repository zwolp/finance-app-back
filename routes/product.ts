import * as express from 'express';
import { Product } from '../libs/product';
import { FinanceProduct } from '../libs/financeProduct';

export const productRouter = express.Router()
.get('/', async (req, res) => {
  const products = await Product.getAll();
  res.json(products ? products : []);
})
.get('/:id', async (req, res) => {
  const product = await Product.getOne(req.params.id);
  res.json(product ? product : null);
})
.post('/', async (req, res) => {
  const product = new Product(req.body);
  const id = product.add();
  res.json(id);
})
.delete('/', async (req, res) => {
  const product = new Product(req.body)
  await product.delete();
  res.json('product is deleted');
})
// .get('/user/:financeId', async (req, res) => {
//   const products = await FinanceProduct.getAllOfUser(req.params.financeId);
//   res.json(products ? products : null)
// })
// .get('/used/:productId', async (req, res) => {
//   const users = await FinanceProduct.checkIfUsed(req.params.productId)
//   res.json(users);
// })
/* .post('/add-user-product', async (req, res) => {
  const product = await Product.addToUser(req.body)
  res.json(product ? product : null);
}) */
// .post('/add-user-product', async (req, res) => {
//   const product = new FinanceProduct(req.body)
//   const id = await product.add()
//   res.json(product ? product : null);
// })

// .delete('/:id', async (req, res) => {
//   const financeProduct = await FinanceProduct.getOne(req.params.id);
//   const id = financeProduct.delete()
//  /*  if (financeProduct) {
//     const id = await financeProduct.delete();
//     res.json(id)
//   } */
//   res.json(id)
// })
/* .delete('/:financeId/:productId', async (req, res) => {
  const {financeId, productId} = req.params;
  await Product.deleteFromUser(financeId, productId);
  res.json('record is deleted');
}) */
// .get('/getone/:id', async (req, res) => {
//   const financeProduct = await FinanceProduct.getOne(req.params.id)
//   res.json(financeProduct)
// })