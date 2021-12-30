import { Router } from "express";

import {
  validateBody,
  validateId,
  validateKeysForPost,
  validateKeysForPut,
} from "../../helper/validation";
import { UserController } from "./user.controller";
import { UserEntityKeys } from "./user.entity";

const UserRouter = Router();

UserRouter.get("/", UserController.getUsers);
UserRouter.get("/:id", validateId, UserController.getUser);
UserRouter.post(
  "/",
  validateBody,
  validateSchemaForPost,
  UserController.addUser
);
UserRouter.put(
  "/:id",
  validateId,
  validateBody,
  validateSchemaForPut,
  UserController.updateUser
);
UserRouter.delete("/:id", validateId, UserController.deleteUser);

async function validateSchemaForPut(request, response, next) {
  try {
    const body = await validateKeysForPut(UserEntityKeys, request.body);
    request.body = { ...body };
    next();
  } catch (error) {
    next(error);
  }
}

async function validateSchemaForPost(request, response, next) {
  try {
    const body = await validateKeysForPost(UserEntityKeys, request.body);
    request.body = { ...body };
    next();
  } catch (error) {
    next(error);
  }
}
export default UserRouter;
