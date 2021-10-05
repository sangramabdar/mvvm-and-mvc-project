import { Router } from "express";
import { UsersController } from "./users.controller";

const UserRouter = Router();

UserRouter.get("/", UsersController.getUsers);
UserRouter.post("/", UsersController.addUser);
UserRouter.put("/", UsersController.updateUser);
UserRouter.delete("/", UsersController.deleteUser);

export default UserRouter;
