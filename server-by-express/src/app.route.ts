import { Router } from "express";
import RootController from "./app.controller";

const RootRouter = Router();

RootRouter.get("/", RootController.get);

export default RootRouter;
