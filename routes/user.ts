import * as express from "express";

export const userRouter = express.Router()
  .get('/:id', (req, res) => {
    const user = `użytkownik ${req.params.id}`;
    res.send(user)
  })