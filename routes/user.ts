import * as express from "express";
import { Finance } from "../libs/finance";
import { Product } from "../libs/product";
import { User } from "../libs/user";
import { FinanceProduct } from "../libs/financeProduct";

export const userRouter = express.Router()
  .get('/', async (req, res) => {
    const data = await User.getAll();
    res.json(data)
  })
  .get('/:id', async (req, res) => {
    const user = await User.getOne(req.params.id);
    res.json(user);
  })
  .post('/', async (req, res) => {
    const user = new User(req.body);
    await user.add();
    res.json(user);
  })
  .delete('/:id', async (req, res) => {
    if (!req.params.id) {
      res.json(false);
      return;
    };
    const user = await User.getOne(req.params.id);
    if (!user) {
      res.json(false);
      return;
    };
    await FinanceProduct.deleteAllOfUser(user.financeId);
    await Finance.delete(user.financeId);
    await user.deleteUser();
    res.json(`User ${req.params.id} deleted`);
  })