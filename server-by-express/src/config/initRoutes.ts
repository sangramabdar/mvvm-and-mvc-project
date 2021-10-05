import AppRouter from "../app.route";
import UserRouter from "../users/users.route";
import { app } from "./initserver";

async function initRoutes() {
  app.use("/", AppRouter);
  app.use("/users", UserRouter);
}

export default initRoutes;
