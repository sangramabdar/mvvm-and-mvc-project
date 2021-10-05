import { Router } from "express";
import AppController from "./app.controller";

const AppRouter = Router();

AppRouter.get("/", AppController.get);
AppRouter.post("/");
AppRouter.put("/");
AppRouter.delete("/");

export default AppRouter;
