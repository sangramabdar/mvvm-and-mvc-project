import { Router } from "express";
import {
  validateBody,
  validateId,
  validateSchema,
} from "../../helper/validation";
import { UserController } from "./user.controller";
import { UserEntity, UserSchema } from "./user.entity";

const UserRouter = Router();

UserRouter.get("/", UserController.getUsers);
UserRouter.get("/:id", validateId, UserController.getUser);
UserRouter.post("/", validateUser, UserController.addUser);
UserRouter.put("/:id", validateId, validateBody, UserController.updateUser);
UserRouter.delete("/:id", validateId, UserController.deleteUser);

async function validateUser(request, response, next) {
  try {
    const user: UserEntity = request.body;
    await UserSchema.validateAsync(user);
    next();
  } catch (error) {
    next(error);
  }
}

export default UserRouter;
