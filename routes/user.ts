import * as express from "express";
import { Finance, FinancialData } from "../libs/finance";
import { Personal, PersonalData } from "../libs/personal";

export const userRouter = express.Router()
  .get('/', async (req, res) => {
    const data = await Personal.getAllPersonal();
    res.json(data)
  })
  .get('/:id', async (req, res) => {
    const record = await Personal.getUser(req.params.id);
    const user = {
      personal: await Personal.getPersonal(record.userId),
      finance: await Finance.getFinance(record.financeId),
    };
    res.json(user);
  })
  .post('/add', async (req, res) => {
    const user = new Personal(req.body);
    await user.addUser();
    res.json(user);
  });
/*   .delete('/delete', async (req, res) => {
    const user = await Personal.getUser(req.body.id);
    if (user) {
      user.deleteUser()
    }
  }) */