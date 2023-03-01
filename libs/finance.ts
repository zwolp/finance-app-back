import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { FieldPacket } from "mysql2";
import  {v4 as uuid} from "uuid"

type FinanceResult = [Finance[], FieldPacket[]];

export interface FinancialData {
  id?: string,
  salary: number,
  savings: number,
  monthlyExpanse: number,
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

    this.id = obj.id;
    this.salary = obj.salary;
    this.savings = obj.savings;
    this.monthlyExpanse = obj.monthlyExpanse;
  }

  static async getFinance (id: string): Promise<Finance | null> {
    const [result] = await pool.execute('SELECT `salary`, `savings`, `monthly expanse` FROM `finance` WHERE `id`=:id', {
      id,
    }) as FinanceResult;
    return result.length === 0 ? null : result[0]
  }

  async addFinance (): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }

    await pool.execute('INSERT INTO `finance` (`id`, `salary`, `savings`, `monthly expanse`) VALUES (:id, :salary, :savings, :monthlyExpanse)', {
      id: this.id,
      salary: this.salary,
      savings: this.savings,
      monthlyExpanse: this.monthlyExpanse,
    })

    return this.id
  }
}