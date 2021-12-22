import { Router } from "express";

import { UserController } from "./user.controller";

const UserRouter = Router();

UserRouter.get("/", UserController.getUsers);
UserRouter.get("/getuser", UserController.getUser);
UserRouter.get("/getusers", UserController.getUsers);
UserRouter.post("/adduser", UserController.addUser);
UserRouter.put("/updateuser", UserController.updateUser);
UserRouter.delete("/deleteuser", UserController.deleteUser);

export default UserRouter;
