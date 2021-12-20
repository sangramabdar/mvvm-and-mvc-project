import "reflect-metadata";
import { Router } from "express";

import { UserController } from "./users.controller";

const UserRouter = Router();

UserRouter.get("/", UserController.getUsers);
UserRouter.post("/", UserController.addUser);
UserRouter.put("/", UserController.updateUser);
UserRouter.delete("/", UserController.deleteUser);

export default UserRouter;
