import * as express from "express";
import { Finance } from "../libs/finance";
import { Product } from "../libs/product";
import { User } from "../libs/user";

export const financeRouter = express.Router()
  .get('/:id', async (req, res) => {
    const finance = await Finance.getFinance(req.params.id);
    res.json(finance)
  })
  .post('/:userId', async (req, res) => {
    const finance = new Finance(req.body);
    const financeId = await finance.addFinance();
    await User.addUserFinance(req.params.userId, financeId);
  })