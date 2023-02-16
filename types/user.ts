import { FinancialData } from "../libs/finance";
import { PersonalData } from "../libs/personal";

export interface User {
  personal: PersonalData,
  finance: FinancialData,
}