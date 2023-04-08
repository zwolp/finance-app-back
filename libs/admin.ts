import { FieldPacket } from "mysql2";
import { v4 as uuid } from "uuid"
import { pool } from "../utils/db";
import { Article } from "../types";


type AdminType = [Admin[], FieldPacket[]];
type ArticleType = [Article[], FieldPacket[]];

export class Admin {
  name: string;
  password: string;

  static async get (name: string): Promise<Admin | null> {
    const [result] =  await pool.execute('SELECT `name`, `password` FROM `admin` WHERE `name`=:name', {
      name,
    }) as AdminType;
    return result.length === 0 ? null : result[0];
  }
  static async getArticles (): Promise<Article[] | []> {
    const [result] = await pool.execute('SELECT `id`, `title`, `description`, `date` FROM `article` ORDER BY `date` ASC') as ArticleType;
    return result.length === 0 ? [] : result;
  }

  static async addArticle (title: string, description: string, date: string): Promise<string> {
    const id = uuid();
    await pool.execute('INSERT INTO `article` (id, title, description, date) VALUES (:id, :title, :description, :date)', {
      id,
      title,
      description,
      date,
    });
    return id;
  }

  static async deleteArticle (id: string) {
    await pool.execute('DELETE FROM `article` WHERE `id`=:id', {
      id,
    })
    return id;
  }
}
