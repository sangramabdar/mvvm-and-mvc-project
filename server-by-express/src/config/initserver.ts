import Express from "express";
import cors from "cors";
import initRoutes from "./initRoutes";
import Database from "./db";
const app = Express();

async function initServer() {
  try {
    app.use(cors());
    app.use(Express.json());
    await Database.connectToDatabse();
    await initRoutes();
    console.log("server is initialized");
  } catch (error) {
    app.use("*", (req, res) => {
      return res.sendStatus(500);
    });
  }
}

export { initServer, app };
