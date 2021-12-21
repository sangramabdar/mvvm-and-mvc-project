import { Request, Response } from "express";
import AppRouter from "../app.route";
import UserRouter from "../users/users.route";
import { app } from "./initserver";

async function initRoutes() {
  app.use("/", AppRouter);
  app.use("/user", UserRouter);
  app.use("*", async (req: Request, res: Response) => {
    return res.json({ result: "wrong route" });
  });
}

export default initRoutes;
