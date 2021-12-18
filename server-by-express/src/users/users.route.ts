import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";
import { UsersController } from "./users.controller";

const UserRouter = Router();

UserRouter.get("/", UsersController.getUsers);
UserRouter.post("/", UsersController.addUser);
UserRouter.put("/", UsersController.updateUser);
UserRouter.delete("/", UsersController.deleteUser);

export default UserRouter;
