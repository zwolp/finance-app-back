import  {v4 as uuid} from "uuid"
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
export interface FinancialData {
  salary: number,
  savings: number,
  monthlyExpanse: number,
  id?: string,
}
export class Finance implements FinancialData{
  id?: string;
  salary: number;
  savings: number;
  monthlyExpanse: number;
  constructor(obj: FinancialData){
    if(!obj.salary || obj.salary > 9999999) {
      throw new ValidationError('Nie prawidłowa wartość pola "wynagrodzenie"');
    };
    if(!obj.savings || obj.savings > 9999999) {
      throw new ValidationError('Nie prawidłowa wartość pola "oszczędnośći"');
    };
    if(!obj.monthlyExpanse || obj.monthlyExpanse > 9999999) {
      throw new ValidationError('Nie prawidłowa wartość pola "miesięczne wydatki"');
    };
    if(!obj.id) {
      obj.id = uuid();
    }

    this.id = obj.id;
    this.salary = obj.salary;
    this.savings = obj.savings;
    this.monthlyExpanse = obj.monthlyExpanse;
  }

  static async getFinanceUser (id: string): Promise<any> {
    const [result] = await pool.execute('SELECT `salary`, `savings`, `monthly expanse` FROM `finance` WHERE `id`=:id', {
      id,
    })
  }
}