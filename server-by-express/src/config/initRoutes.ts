import BookRouter from "../entity/book/book.routes";
import RootRouter from "../entity/root/root.routes";
import RootController from "../entity/root/root.controller";
import UserRouter from "../entity/user/user.routes";
import { app } from "./initserver";

async function initRoutes() {
  app.use("/", RootRouter);
  app.use("/user", UserRouter);
  app.use("/book", BookRouter);
  app.use("*", RootController.wrongRoute);
}

export default initRoutes;
