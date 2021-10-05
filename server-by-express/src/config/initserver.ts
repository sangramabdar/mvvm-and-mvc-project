import Express from "express";
import cors from "cors";
import { connectToDatabse } from "./db";
import initRoutes from "./initRoutes";
const app = Express();

async function initServer() {
  app.use(cors());
  app.use(Express.json());
  await connectToDatabse();
  await initRoutes();
}

export { initServer, app };
