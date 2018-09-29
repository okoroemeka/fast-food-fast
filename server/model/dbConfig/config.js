import Pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// let connectionString;

const {
  DB_USER, DB_NAME, DB_PASS, DB_PORT,
} = process.env;

const config = {
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
  max: 10,
  idleTimeoutMillis: 3000,
};

const dbConnection = new Pg.Pool(config);
export default dbConnection;
