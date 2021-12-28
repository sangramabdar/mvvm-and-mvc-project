import { Router } from "express";
import { idValidation, schemaValidation, User } from "../../helper/validation";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.repository";

const UserRouter = Router();

UserRouter.get("/", UserController.getUsers);
UserRouter.get("/:id", idValidation, UserController.getUser);
UserRouter.post("/", userValidator, UserController.addUser);
UserRouter.put("/:id", idValidation, UserController.updateUser);
UserRouter.delete("/:id", idValidation, UserController.deleteUser);
UserRouter.use("*", UserController.wrongRoute);

async function userValidator(httpRequest, httpResponse, next) {
  try {
    const user: UserEntity = httpRequest.body;
    const validatedUser = await schemaValidation<UserEntity>(user, "user");
    await User.validateAsync(validatedUser);
    next();
  } catch (error) {
    next(error);
  }
}

export default UserRouter;
