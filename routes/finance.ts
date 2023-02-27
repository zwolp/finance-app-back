import * as express from "express";
import { Finance } from "../libs/finance";

export const financeRouter = express.Router()
  .get('/:id', async (req, res) => {
    const finance = await Finance.getFinance(req.params.id);
    res.json(finance)
  })
  .post('/:id', async (req, res) => {
    const finance = new Finance(req.body);
    await finance.addFinance()
  })