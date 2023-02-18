import { FieldPacket } from "mysql2";
import  {v4 as uuid} from "uuid"
import { User } from "../types/user";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";

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
    if(!obj.id) {
      obj.id = uuid();
    }

    this.id = obj.id;
    this.name = obj.name;
    this.surname = obj.surname;
    this.job = obj.job;
  }
  static async getAllUsers (): Promise<Personal[]> {
    const [result] = await pool.execute('SELECT * FROM `user_finance` ORDER BY `name` ASC') as PersonalResult;
    return result.map((obj) => new Personal(obj))
  };

  static async getPersonalUser (id: string): Promise<Personal | null> {
    const [result] = await pool.execute('SELECT `name`, `surname`, `job` FROM `user` WHERE `id`=:id', {
      id,
    }) as PersonalResult;
    return result.length === 0 ? null : new Personal(result[0]);
  };
}