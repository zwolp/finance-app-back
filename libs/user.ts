import { FieldPacket } from "mysql2";
import  {v4 as uuid} from "uuid"
import { UserType } from "../types/user";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { Finance } from "./finance";

type UserResult = [UserType[], FieldPacket[]];

export interface UserData {
  name: string,
  surname: string,
  job: string,
  finance: string,
  id?: string,
}
export class User implements UserData{
  id?: string;
  name: string;
  surname: string;
  job: string;
  finance: string;

  constructor(obj: UserData){
    if(!obj.name || obj.name.length > 100) {
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
    this.finance = obj.finance;
  }
  
  static async getAllUsers (): Promise<User[]> {
    const [result] = await pool.execute('SELECT * FROM `user` ORDER BY `name` ASC') as UserResult;
    return result.map((obj) => new User(obj))
  };
  static async getUser (id: string): Promise<User | null> {
    const [result] = await pool.execute('SELECT * FROM `user` WHERE `id`=:id', {
      id,
    }) as UserResult;
    return result.length === 0 ? null : new User(result[0]);
  };

  async addUser (): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    };
/*     if (!this.finance) {
      this.finance = uuid();
    } */
    await pool.execute('INSERT INTO `user` (`id`, `name`, `surname`, `job`) VALUES (:id, :name, :surname, :job)', {
      id: this.id,
      name: this.name,
      surname: this.surname,
      job: this.job,
    });
    return this.id;
  };

  async deleteUser (): Promise<void> {
    await pool.execute('DELETE FROM `user` WHERE `id`=:id', {
      id: this.id,
    })
  };
}