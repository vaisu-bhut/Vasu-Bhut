import express from "express";
import { env } from "./src/config.js";
import contactRoute from "./src/contact.js";

const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});


app.get("/", async (req, res, next) => {
  res.json(
    "Hey There. You are on a server of the my portfolio website."
  );
});

app.use("/api", contactRoute);

app.listen(env.port, () =>
  console.log(`🚀  API listening on http://localhost:${env.port}`)
);
