import "reflect-metadata";
import { Router } from "express";

import { UserController } from "./users.controller";

const UserRouter = Router();

UserRouter.get("/getuser", UserController.getUser);
UserRouter.get("/getusers", UserController.getUsers);
UserRouter.post("/adduser", UserController.addUser);
UserRouter.put("/updateuser", UserController.updateUser);
UserRouter.delete("/deleteuser", UserController.deleteUser);
UserRouter.use("*", UserController.wrongRoute);

export default UserRouter;
