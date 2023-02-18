import * as express from "express";
import { Finance, FinancialData } from "../libs/finance";
import { Personal, PersonalData } from "../libs/personal";
import { User } from "../types/user";

export const userRouter = express.Router()
  .get('/', async (req, res) => {
    const data = await Personal.getAllUsers()
    
  })