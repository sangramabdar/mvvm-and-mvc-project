import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";
import { UsersController } from "./users.controller";

const UserRouter = Router();
const userController = container.resolve(UsersController);

UserRouter.get("/", userController.getUsers);
UserRouter.post("/", userController.addUser);
UserRouter.put("/", userController.updateUser);
UserRouter.delete("/", userController.deleteUser);

export default UserRouter;
