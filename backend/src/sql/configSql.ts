import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'postgres', 
  database: 'thegoodcorner',
  password: 'root',
  port: 5432,
});