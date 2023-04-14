import * as express from 'express';
import { FinanceProduct } from '../libs/financeProduct';
import { ForecastFinanceProductRecord } from '../types';
import { Product } from '../libs/product';

export const financeProductRouter = express.Router()
.get('/:id', async (req, res) => {
  const financeProduct = await FinanceProduct.getOne(req.params.id)
  res.json(financeProduct)
})
.get('/user/:financeId', async (req, res) => {
  const products = await FinanceProduct.getAllOfUser(req.params.financeId);
  res.json(products ? products : null)
})
.get('/used/:productId', async (req, res) => {
  const users = await FinanceProduct.checkIfUsed(req.params.productId)
  res.json(users);
})
.get('/forecast/:id', async (req, res) => {
  const financeAndProductsList = await FinanceProduct.getAllOfUser(req.params.id);
  const products = await Product.getAll(); 
  const userProductArray: ForecastFinanceProductRecord[] = [];
  
  if (financeAndProductsList) {
    /* const userProduct =  */financeAndProductsList.forEach(financeAndProduct => {
      const currentProduct = products.filter(product =>  product.id === financeAndProduct.productId);
      userProductArray.push({
        name: currentProduct[0].name,
        startDate: financeAndProduct.startDate,
        duration: Number(currentProduct[0].durationInDays),
        annualInterestRate: Number(currentProduct[0].annualInterestRate),
        resources: financeAndProduct.resources,
      })
    })
  }

  res.json(userProductArray)
})
.post('/', async (req, res) => {
  const product = new FinanceProduct(req.body)
  const id = await product.add()
  res.json(product ? product : null);
})
.delete('/:id', async (req, res) => {
  const financeProduct = await FinanceProduct.getOne(req.params.id);
  const id = financeProduct.delete()
  res.json(id)
})