import express, { Request, Response } from "express";
import { getUser } from "./controllers/users-controller";

function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", getUser);

  return app;
}

export default createApp;
