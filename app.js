import express, { json } from "express";
import routes from "./routes/index.js";
import cors from "cors";
import morgan from "morgan";

const logger = morgan("dev");

const app = express();

app.use(cors());
app.use(json());
app.use(logger);
app.use(routes);

app.use((err, req, res, next) => {
  const { status, message } = err;
  console.error(err);
  res.status(status || 500).json({ message });
});

export default app;
