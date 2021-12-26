import { Router } from "express";
import { UserController } from "../controller/user.controller";

const UserRouter = Router();

UserRouter.get("/", UserController.getUsers);
UserRouter.get("/:id", UserController.getUser);
UserRouter.post("/", UserController.addUser);
UserRouter.put("/:id", UserController.updateUser);
UserRouter.delete("/:id", UserController.deleteUser);
UserRouter.use("*", UserController.wrongRoute);

export default UserRouter;
