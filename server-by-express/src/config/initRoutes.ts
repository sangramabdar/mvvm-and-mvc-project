import RootController from "../controller/root.controller";
import BookRouter from "../route/book";
import RootRouter from "../route/root";
import UserRouter from "../route/user";
import { app } from "./initserver";

async function initRoutes() {
  app.use("/", RootRouter);
  app.use("/user", UserRouter);
  app.use("/book", BookRouter);
  app.use("*", RootController.wrongRoute);
}

export default initRoutes;
