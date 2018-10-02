import Pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_USER, DB_NAME, DB_PASS, DB_PORT, DATABASE_URL,TESTDB_NAME,
} = process.env;

let connectionString;
const ssl = true;

const devConfig = {
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
  max: 10,
  idleTimeoutMillis: 3000,
};
const testConfig = {
  user: DB_USER,
  database: TESTDB_NAME,
  password: DB_PASS,
  port: DB_PORT,
  max: 10,
  idleTimeoutMillis: 3000,
};
if (process.env.NODE_ENV === 'production') {
  connectionString = { DATABASE_URL, ssl };
} else if (process.env.NODE_ENV === 'test') {
  connectionString = testConfig;
} else {
  connectionString = devConfig;
}
const dbConnection = new Pg.Pool(connectionString);
export default dbConnection;
