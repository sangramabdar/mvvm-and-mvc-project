import Express from "express";
import cors from "cors";

import initRoutes from "./initRoutes";

const app = Express();

async function initServer() {
  app.use(cors());
  app.use(
    Express.json({
      type: ["json"],
    })
  );
  await initRoutes();
  console.log("server is initialized");
}

export { initServer, app };
