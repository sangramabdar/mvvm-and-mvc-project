import { Router } from "express";
import {
  bodyValidation,
  idValidation,
  schemaValidation,
} from "../../helper/validation";
import { UserController } from "./user.controller";
import { UserEntity, UserJoi } from "./user.entity";

const UserRouter = Router();

UserRouter.get("/", UserController.getUsers);
UserRouter.get("/:id", idValidation, UserController.getUser);
UserRouter.post("/", userValidation, UserController.addUser);
UserRouter.put("/:id", idValidation, bodyValidation, UserController.updateUser);
UserRouter.delete("/:id", idValidation, UserController.deleteUser);

async function userValidation(httpRequest, httpResponse, next) {
  try {
    const user: UserEntity = httpRequest.body;
    await UserJoi.validateAsync(user);
    next();
  } catch (error) {
    next(error);
  }
}

export default UserRouter;
