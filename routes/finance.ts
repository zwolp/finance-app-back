import * as express from "express";
import { Finance } from "../libs/finance";
import { User } from "../libs/user";

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
    const {id} = req.params; 
    const finance = await Finance.getOne(id);
    const newFinance = new Finance({...finance, ...req.body});
    const bool = await newFinance.update(id);
    res.json(bool);
  })