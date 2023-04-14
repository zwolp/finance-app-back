import { FieldPacket } from "mysql2";
import {v4 as uuid} from "uuid"
import { FinanceProductRecord, financeId } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";

type FinanceProductResult = [FinanceProductRecord[], FieldPacket[]];
type IdType = [financeId[], FieldPacket[]];

export class FinanceProduct implements FinanceProductRecord {
  id: string;
  financeId: string;
  productId: string;
  startDate: string;
  resources: number;
  constructor(obj: FinanceProductRecord){
    if (!obj.financeId || obj.financeId.length > 36) {
      console.log('1 correct');
      throw new ValidationError('Wrong financeId value');
    }
    if (!obj.productId || obj.productId.length > 36) {
      console.log('2 correct');
      throw new ValidationError('Wrong productId value');
    }
    if (!obj.startDate) {
      console.log('3 correct');
      throw new ValidationError('Wrong startDate value');
    }
    if (obj.resources < 0 || obj.resources > 99999999999) {
      console.log('4 correct');
      throw new ValidationError('Wrong startDate value');
    }

    this.id = obj.id;
    this.financeId = obj.financeId;
    this.productId = obj.productId;
    this.startDate = obj.startDate;
    this.resources = obj.resources;
  }
  static async getOne (id: string): Promise<FinanceProduct | null> {
    const [result] = await pool.execute('SELECT * FROM `finance_product` WHERE `id`=:id', {
      id,
    }) as FinanceProductResult;
    return result.length === 0 ? null : new FinanceProduct(result[0])
  }

  static async getAllOfUser (financeId: string): Promise< FinanceProduct[] | null> {
    const [result] = await pool.execute('SELECT * FROM `finance_product` WHERE `financeId`=:financeId', {
      financeId,
    }) as FinanceProductResult;
    return result.length === 0 ? [] : result.map(obj => new FinanceProduct(obj))
  };

  async add (): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    } 

    await pool.execute('INSERT INTO `finance_product` (`id`, `financeId`, `productId`, `startDate`, `resources`) VALUES (:id, :financeId, :productId, :startDate, :resources)', {
      id: this.id,
      financeId: this.financeId,
      productId: this.productId,
      startDate: this.startDate,
      resources: this.resources,
    });
    return this.id;
  };

  static async checkIfUsed (productId: string): Promise<{financeId: string}[] | []> {
    const [result] = await pool.execute('SELECT `financeId` FROM `finance_product` WHERE `productId`=:productId', {
      productId,
    })as IdType;
    return result;
  };
  
  async delete (): Promise<string> {
    await pool.execute('DELETE FROM `finance_product` WHERE `id`=:id', {
      id: this.id,
    });
    return this.id;
  };

  static async deleteAllOfUser (financeId: string): Promise<boolean> {
    await pool.execute('DELETE FROM `finance_product` WHERE `financeId`=:financeId', {
      financeId,
    });
    return true;
  };
}