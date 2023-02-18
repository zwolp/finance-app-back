import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  database: 'finance_app',
  namedPlaceholders: true,
  decimalNumbers: true,
})