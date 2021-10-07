import Express from "express";
import cors from "cors";
import { connectToDatabse } from "./db";
import initRoutes from "./initRoutes";
const app = Express();

async function initServer() {
  try {
    app.use(cors());
    app.use(Express.json());
    await connectToDatabse();
    await initRoutes();
  } catch (error) {
    app.use("*", (req, res) => {
      return res.sendStatus(500);
    });
  }
}

export { initServer, app };
