import express from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config.js";
import contactRoute from "./contact.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", contactRoute);

app.listen(env.port, () =>
  console.log(`🚀  API listening on http://localhost:${env.port}`)
);
