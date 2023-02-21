import { FieldPacket } from "mysql2";
import  {v4 as uuid} from "uuid"
import { User } from "../types/user";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { Finance } from "./finance";

type UserResult = [User[], FieldPacket[]];
type PersonalResult = [Personal[], FieldPacket[]];

export interface PersonalData {
  name: string,
  surname: string,
  job: string,
  id?: string,
}
export class Personal implements PersonalData{
  id?: string;
  name: string;
  surname: string;
  job: string;

  constructor(obj: PersonalData){
    if(!obj.name || obj.name.length > 100) {
      throw new ValidationError('Nie prawidłowa wartość pola "imię"');
    };
    if(!obj.surname || obj.surname.length > 100) {
      throw new ValidationError('Nie prawidłowa wartość pola "nazwisko"');
    };
    if(!obj.job || obj.job.length > 100) {
      throw new ValidationError('Nie prawidłowa wartość pola "stanowisko"');
    };
/*     if(!obj.id) {
      obj.id = uuid();
    } */

    this.id = obj.id;
    this.name = obj.name;
    this.surname = obj.surname;
    this.job = obj.job;
  }
  static async getAllPersonal (): Promise<Personal[]> {
    const [result] = await pool.execute('SELECT * FROM `user` ORDER BY `name` ASC') as PersonalResult;
    return result.map((obj) => new Personal(obj))
  };
  static async getPersonal (id: string): Promise<Personal | null> {
    const [result] = await pool.execute('SELECT `name`, `surname`, `job` FROM `user` WHERE `id`=:id', {
      id,
    }) as PersonalResult;
    return result.length === 0 ? null : new Personal(result[0]);
  };

  static async getUser (id: string): Promise<User | null> {
    const [result] = await pool.execute('SELECT `userId`, `financeId` FROM `user_finance` WHERE `userId`=:id', {
      id,
    }) as UserResult;

    return result.length === 0 ? null : result[0];
  };

  async addUser (): Promise<string> {
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

  async deleteUser (): Promise<void> {
    await pool.execute('DELETE FROM `user` WHERE `id`=:id', {
      id: this.id,
    })
  };
}