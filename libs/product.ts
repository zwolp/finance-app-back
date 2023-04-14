import { pool } from '../utils/db';
import { ValidationError } from '../utils/errors';
import {v4 as uuid} from 'uuid';
import { FieldPacket } from 'mysql2';

type ProductType = [Product[], FieldPacket[]];

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
    if (Number(obj.minContribution) < 0 || Number(obj.minContribution) > 99999999999) {
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
  
  static async getOne (id: string): Promise<Product | null> {
    const [result] = await pool.execute('SELECT * FROM `product` WHERE `id`=:id', {
      id,
    }) as ProductType;
    return result.length === 0 ? null : new Product(result[0]);
  };

  static async getAll (): Promise<Product[] | null> {
    const [result] = await pool.execute('SELECT * FROM `product` ORDER BY `annualInterestRate` ASC') as ProductType;
    return result.length === 0 ? null : result.map(obj => new Product(obj));
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
  
  async delete (): Promise<string> {
    await pool.execute('DELETE FROM `product` WHERE `id`=:id', {
      id: this.id,
    });
    return this.id
  };
};