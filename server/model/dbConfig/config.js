import Pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_USER, DB_NAME, DB_PASS, DB_PORT, TESTDB_NAME,
} = process.env;

let connection;

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
  connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  };
} else if (process.env.NODE_ENV === 'test') {
  connection = testConfig;
} else {
  connection = devConfig;
}
const dbConnection = new Pg.Pool(connection);
export default dbConnection;
