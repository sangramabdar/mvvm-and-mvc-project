import AppController from "../app.controller";
import AppRouter from "../app.route";
import BookRouter from "../book/book.routes";
import UserRouter from "../user/user.route";
import { app } from "./initserver";

async function initRoutes() {
  app.use("/", AppRouter);
  app.use("/user", UserRouter);
  app.use("/book", BookRouter);
  app.use("*", AppController.wrongRoute);
}

export default initRoutes;
