import * as express from "express";
import { Finance } from "../libs/finance";
import { User } from "../libs/user";

export const userRouter = express.Router()
  .get('/', async (req, res) => {
    const data = await User.getAll();
    res.json(data)
  })
  .get('/:id', async (req, res) => {
    const user = await User.getOne(req.params.id);
    res.json(user);
  })
  .post('/add', async (req, res) => {
    const user = new User(req.body);
    await user.add();
    res.json(user);
  })
/*   .delete('/delete', async (req, res) => {
    const user = await Personal.getUser(req.body.id);
    if (user) {
      user.deleteUser()
    }
  }) */