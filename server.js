import dotenv from "dotenv";
import * as http from "http";
import app from "./app.js";
import pool from "./db/index.js";

dotenv.config();

const server = http.createServer(app);
const { PORT } = process.env;

const start = async () => {
  try {
    server.listen(PORT | 3000, () => console.log(`Server is listening on ${PORT | 3000}`));
  } catch (err) {
    console.error(err);
    await pool.end();
  }
};

start();
