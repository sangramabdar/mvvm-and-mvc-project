import { Request, Response, Router } from "express";

import {
  validateBody,
  validateId,
  validateKeys,
} from "../../helper/validation";
import { UserController } from "./user.controller";
import { UserSchema } from "./user.entity";

const UserRouter = Router();

UserRouter.get("/", UserController.getUsers);
UserRouter.get("/:id", validateId, UserController.getUser);
UserRouter.post("/", validateBody, validateSchema, UserController.addUser);
UserRouter.put(
  "/:id",
  validateId,
  validateBody,
  validateSchema,
  UserController.updateUser
);
UserRouter.delete("/:id", validateId, UserController.deleteUser);

async function validateSchema(request: Request, response: Response, next) {
  try {
    if (request.method === "POST") {
      request.body = await validateKeys(UserSchema, request.body, "POST");
    } else {
      request.body = await validateKeys(UserSchema, request.body, "PUT");
    }
    next();
  } catch (error) {
    next(error);
  }
}
export default UserRouter;
