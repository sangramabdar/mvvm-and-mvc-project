import Express from "express";
import cors from "cors";

import initRoutes from "./initRoutes";
import { dependencies, initDependencies } from "./dependencies";

const app = Express();

async function initServer() {
  app.use(cors());
  app.use(
    Express.json({
      type: ["json"],
    })
  );
  await initDependencies();
  await initRoutes();
  console.log("server is initialized");
  console.log(dependencies);
}

export { initServer, app };
