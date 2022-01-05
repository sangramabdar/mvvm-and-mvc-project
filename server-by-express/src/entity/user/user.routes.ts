import { Router } from "express";

import { validateBody, validateId } from "../../helper/validation";
import { UserController } from "./user.controller";
import { validateUserSchema } from "./user.entity";

const UserRouter = Router();

UserRouter.get("/", UserController.getUsers);
UserRouter.get("/:id", validateId, UserController.getUser);
UserRouter.post("/", validateBody, validateUserSchema, UserController.addUser);
UserRouter.put(
  "/:id",
  validateId,
  validateBody,
  validateUserSchema,
  UserController.updateUser
);
UserRouter.delete("/:id", validateId, UserController.deleteUser);

export default UserRouter;
