import { pool } from '../utils/db';
import { ValidationError } from '../utils/errors';
import {v4 as uuid} from 'uuid';
import { FieldPacket } from 'mysql2';

type ProductType = [Product[], FieldPacket[]];
type ProductIdType = [{productId: string}[], FieldPacket[]]

export interface ProductData {
  id: string,
  name: string,
  annualInterestRate: string,
  durationInMonths: string,
  minContribution: string,
  maxContribution: string,
  description: string,
};

export class Product implements ProductData {
  id: string;
  name: string;
  annualInterestRate: string;
  durationInMonths: string;
  minContribution: string;
  maxContribution: string;
  description: string;
  constructor(obj: ProductData) {
    this.id = obj.id;
    this.name = obj.name;
    this.annualInterestRate = obj.annualInterestRate;
    this.durationInMonths = obj.durationInMonths;
    this.minContribution = obj.minContribution;
    this.maxContribution = obj.maxContribution;
    this.description = obj.description;
  };

  static async getAllProducts (financeId: string) {
    const [result] = await pool.execute('SELECT * FROM `finance_product` WHERE `financeId`=:financeId', {
      financeId,
    }) as ProductIdType;
    return result.length === 0 ? null : result.map(obj => obj.productId);
  }

  static async getProduct (id: string) {
    const [result] = await pool.execute('SELECT * FROM `product` WHERE `id`=:id', {
      id,
    }) as ProductType;
    return result.length === 0 ? null : result[0];
  }
};