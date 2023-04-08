import * as express from "express";
import { Finance } from "../libs/finance";
import { User } from "../libs/user";
// import { Product } from "../libs/product";
// import { ForecastFinanceProductRecord } from "../types";
// import { FinanceProduct } from "../libs/financeProduct";

export const financeRouter = express.Router()
  .get('/:id', async (req, res) => {
    const finance = await Finance.getOne(req.params.id);
    res.json(finance)
  })
  .post('/:userId', async (req, res) => {
    const finance = new Finance(req.body);
    const financeId = await finance.add();
    await User.addFinance(req.params.userId, financeId);
    res.json(financeId)
  })
  .patch('/:id', async (req, res) => { 
    const finance = await Finance.getOne(req.params.id);
    const newFinance = new Finance({...finance, ...req.body});
    const bool = await newFinance.update(req.params.id);
    res.json(bool);
  })
  // .get('/forecast/:id', async (req, res) => {
  //   const financeAndProductsList = await FinanceProduct.getAllOfUser(req.params.id);
  //   const products = await Product.getAll(); 
  //   const userProductArray: ForecastFinanceProductRecord[] = [];
    
  //   if (financeAndProductsList) {
  //     /* const userProduct =  */financeAndProductsList.forEach(financeAndProduct => {
  //       const currentProduct = products.filter(product =>  product.id === financeAndProduct.productId);
  //       userProductArray.push({
  //         name: currentProduct[0].name,
  //         startDate: financeAndProduct.startDate,
  //         duration: Number(currentProduct[0].durationInDays),
  //         annualInterestRate: Number(currentProduct[0].annualInterestRate),
  //         resources: financeAndProduct.resources,
  //       })
  //     })
  //   }

  //   res.json(userProductArray)
  // })
