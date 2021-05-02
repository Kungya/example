import dotenv from "dotenv";
import * as mariadb from "mariadb";

dotenv.config();

const pool = mariadb.createPool({
  host: "localhost",
  port: 3306,
  user: "tester",
  password: "tester7",
  database: "main",
});

export default pool;
