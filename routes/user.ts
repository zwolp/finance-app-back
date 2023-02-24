import * as express from "express";
import { Finance, FinancialData } from "../libs/finance";
import { User, UserData } from "../libs/user";

export const userRouter = express.Router()
  .get('/', async (req, res) => {
    const data = await User.getAllUsers();
    res.json(data)
  })
  .get('/:id', async (req, res) => {
    const user = await User.getUser(req.params.id);
    res.json(user);
  })
  .post('/add', async (req, res) => {
    const user = new User(req.body);
    await user.addUser();
    res.json(user);
  });
/*   .delete('/delete', async (req, res) => {
    const user = await Personal.getUser(req.body.id);
    if (user) {
      user.deleteUser()
    }
  }) */