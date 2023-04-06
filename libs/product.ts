import { pool } from '../utils/db';
import { ValidationError } from '../utils/errors';
import {v4 as uuid} from 'uuid';
import { FieldPacket } from 'mysql2';
import { FinanceProductRecord, financeId } from '../types';

type ProductType = [Product[], FieldPacket[]];
type ProductIdType = [FinanceProductRecord[], FieldPacket[]];
type IdType = [financeId[], FieldPacket[]];

export interface ProductData {
  id?: string,
  name: string,
  annualInterestRate: string,
  durationInDays: string,
  minContribution: string,
  maxContribution: string,
  description: string,
};

export class Product implements ProductData {
  id?: string;
  name: string;
  annualInterestRate: string;
  durationInDays: string;
  minContribution: string;
  maxContribution: string;
  description: string;
  constructor(obj: ProductData) {
    if (!obj.name || obj.name.length > 50) {
      throw new ValidationError('Nie prawidłowa wartość pola "nazwa"');
    }
    if (!obj.annualInterestRate || Number(obj.annualInterestRate) <= 0 || Number(obj.annualInterestRate) > 99.99) {
      throw new ValidationError('Nie prawidłowa wartość pola "roczne oprocentowanie"');
    }
    if (!obj.durationInDays || Number(obj.durationInDays) <= 0 || Number(obj.durationInDays) > 99999999999) {
      throw new ValidationError('Nie prawidłowa wartość pola "okres trwania"');
    }
    if (!obj.minContribution || Number(obj.minContribution) <= 0 || Number(obj.minContribution) > 99999999999) {
      throw new ValidationError('Nie prawidłowa wartość pola "minimalny wkład"');
    }
    if (!obj.maxContribution || Number(obj.maxContribution) <= 0 || Number(obj.maxContribution) > 99999999999) {
      throw new ValidationError('Nie prawidłowa wartość pola "maksymalny wkład"');
    }
    if (!obj.name || obj.name.length > 300) {
      throw new ValidationError('Nie prawidłowa wartość pola "opis"');
    }

    this.id = obj.id;
    this.name = obj.name;
    this.annualInterestRate = obj.annualInterestRate;
    this.durationInDays = obj.durationInDays;
    this.minContribution = obj.minContribution;
    this.maxContribution = obj.maxContribution;
    this.description = obj.description;
  };
  static async getAll (): Promise<Product[] | null> {
    const [result] = await pool.execute('SELECT * FROM `product` ORDER BY `annualInterestRate` ASC') as ProductType;
    return result.length === 0 ? null : result.map(obj => new Product(obj));
  };

  static async getOne (id: string): Promise<Product | null> {
    const [result] = await pool.execute('SELECT * FROM `product` WHERE `id`=:id', {
      id,
    }) as ProductType;
    return result.length === 0 ? null : new Product(result[0]);
  };

  static async getAllOfUser (financeId: string): Promise<FinanceProductRecord[] | null> {
    const [result] = await pool.execute('SELECT * FROM `finance_product` WHERE `financeId`=:financeId', {
      financeId,
    }) as ProductIdType;
    return result.length === 0 ? null : result;
  };

  static async checkIfUsed (productId: string): Promise<{financeId: string}[] | []> {
    const [result] = await pool.execute('SELECT `financeId` FROM `finance_product` WHERE `productId`=:productId', {
      productId,
    })as IdType;
    return result;
  };

  async add (): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    };
    await pool.execute('INSERT INTO `product` (id, name, annualInterestRate, durationInDays, minContribution, maxContribution, description) VALUES (:id, :name, :annualInterestRate, :durationInDays, :minContribution, :maxContribution, :description)', {
      id: this.id,
      name: this.name,
      annualInterestRate: this.annualInterestRate,
      durationInDays: this.durationInDays,
      minContribution: this.minContribution,
      maxContribution: this.maxContribution,
      description: this.description
    });
    return this.id;
  };

  static async addToUser (financeProduct: FinanceProductRecord): Promise<boolean> {
    await pool.execute('INSERT INTO `finance_product` (financeId, productId, startDate, resources) VALUES (:financeId, :productId, :startDate, :resources)', {
      financeId: financeProduct.financeId,
      productId: financeProduct.productId,
      startDate: financeProduct.startDate,
      resources: financeProduct.resources,
    });
    return true;
  };

  async delete () {
    await pool.execute('DELETE FROM `product` WHERE `id`=:id', {
      id: this.id,
    });
  };
  
  static async deleteFromUser (financeId: string, productId: string): Promise<boolean> {
    await pool.execute('DELETE FROM `finance_product` WHERE `financeId`=:financeId AND `productId`=:productId', {
      financeId,
      productId,
    });
    return true;
  };

  static async deleteAllOfUser (financeId: string): Promise<boolean> {
    await pool.execute('DELETE FROM `finance_product` WHERE `financeId`=:financeId', {
      financeId,
    });
    return true;
  };
};