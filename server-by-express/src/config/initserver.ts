import Express from "express";
import cors from "cors";

import initRoutes from "./initRoutes";

const app = Express();

async function initServer() {
  try {
    app.use(cors());
    app.use(Express.json());
    await initRoutes();
    console.log("server is initialized");
  } catch (error) {
    console.log(error.message);
    app.use("*", (req, res) => {
      return res.sendStatus(500);
    });
  }
}

export { initServer, app };
