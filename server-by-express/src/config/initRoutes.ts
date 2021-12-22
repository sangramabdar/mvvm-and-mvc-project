import { Request, Response } from "express";
import AppController from "../app.controller";
import AppRouter from "../app.route";
import UserRouter from "../users/users.route";
import { app } from "./initserver";

async function initRoutes() {
  app.use("/", AppRouter);
  app.use("/user", UserRouter);
  app.use("*", AppController.wrongRoute);
}

export default initRoutes;
