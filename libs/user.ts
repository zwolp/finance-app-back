import { FieldPacket } from "mysql2";
import  {v4 as uuid} from "uuid"
import { UserType } from "../types/user";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";

type UserResult = [UserType[], FieldPacket[]];

export class User implements UserType{
  id?: string;
  name: string;
  surname: string;
  job: string;
  financeId: string;

  constructor(obj: UserType){
    if(!obj.name || obj.name.length > 100) {
      console.log(obj.name);
      throw new ValidationError('Nie prawidłowa wartość pola "imię"');
    };
    if(!obj.surname || obj.surname.length > 100) {
      throw new ValidationError('Nie prawidłowa wartość pola "nazwisko"');
    };
    if(!obj.job || obj.job.length > 100) {
      throw new ValidationError('Nie prawidłowa wartość pola "stanowisko"');
    };

    this.id = obj.id;
    this.name = obj.name;
    this.surname = obj.surname;
    this.job = obj.job;
    this.financeId = obj.financeId;
  };
  
  static async getAll (): Promise<User[] | null> {
    const [result] = await pool.execute('SELECT * FROM `user` ORDER BY `name` ASC') as UserResult;
    return result.length === 0 ? [] : result.map((obj) => new User(obj))
  };

  static async getOne (id: string): Promise<User | null> {
    const [result] = await pool.execute('SELECT * FROM `user` WHERE `id`=:id', {
      id,
    }) as UserResult;
    return result.length === 0 ? null : new User(result[0]);
  };

  async add (): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    };

    await pool.execute('INSERT INTO `user` (`id`, `name`, `surname`, `job`) VALUES (:id, :name, :surname, :job)', {
      id: this.id,
      name: this.name,
      surname: this.surname,
      job: this.job,
    });
    return this.id;
  };

  async deleteUser (): Promise<boolean> {
    await pool.execute('DELETE FROM `user` WHERE `id`=:id', {
      id: this.id,
    });
    return true
  }

  static async addFinance (userId: string, financeId: string): Promise<boolean> {
    await pool.execute('UPDATE `user` SET `financeId`=:financeId WHERE `id`=:userId', {
      userId,
      financeId,
    });
    return true
  };
};