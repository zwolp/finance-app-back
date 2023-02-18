import { FinancialData } from "../libs/finance";
import { Personal } from "./personal";

export interface User {
  personal: Personal,
  finance: FinancialData,
}