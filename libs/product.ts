import { pool } from '../utils/db';
import { ValidationError } from '../utils/errors';
import {v4 as uuid} from 'uuid';
import { FieldPacket } from 'mysql2';
import { financeProductRecord } from '../types/product';

type ProductType = [Product[], FieldPacket[]];
type ProductIdType = [financeProductRecord[], FieldPacket[]]

export interface ProductData {
  id: string,
  name: string,
  annualInterestRate: string,
  durationInDays: string,
  minContribution: string,
  maxContribution: string,
  description: string,
};

export class Product implements ProductData {
  id: string;
  name: string;
  annualInterestRate: string;
  durationInDays: string;
  minContribution: string;
  maxContribution: string;
  description: string;
  constructor(obj: ProductData) {
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

  static async getOne (id: string) {
    const [result] = await pool.execute('SELECT * FROM `product` WHERE `id`=:id', {
      id,
    }) as ProductType;
    return result.length === 0 ? null : new Product(result[0]);
  }

  static async getAllOfUser (financeId: string) {
    const [result] = await pool.execute('SELECT * FROM `finance_product` WHERE `financeId`=:financeId', {
      financeId,
    }) as ProductIdType;
    return result.length === 0 ? null : result;
  }

  static async addToUser (financeProduct: financeProductRecord) {
    await pool.execute('INSERT INTO `finance_product` (financeId, productId, startDate, resources) VALUES (:financeId, productId, :startDate, :resources)', {
      financeId: financeProduct.financeId,
      productId: financeProduct.productId,
      startDate: financeProduct.startDate,
      resources: financeProduct.resources,
    })
  }
};