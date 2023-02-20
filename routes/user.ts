import * as express from "express";
import { Finance, FinancialData } from "../libs/finance";
import { Personal, PersonalData } from "../libs/personal";
import { User } from "../types/user";

export const userRouter = express.Router()
  .get('/', async (req, res) => {
    const data = await Personal.getAllUsers();
    res.json(data)
  })
  .post('/add', async (req, res) => {
    const user = new Personal(req.body);
    await user.addUser();
    res.json(user);
  })
  .delete('/delete', async (req, res) => {
    const user = await Personal.getUser(req.body.id);
    if (user) {
      user.deleteUser()
    }
  })