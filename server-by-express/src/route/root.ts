import { Router } from "express";
import RootController from "../controller/root.controller";

const RootRouter = Router();

RootRouter.get("/", RootController.get);

export default RootRouter;
