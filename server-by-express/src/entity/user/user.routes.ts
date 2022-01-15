import { Router } from "express";
import { dependencies } from "../../config/dependencies";
import { validateBody, validateId } from "../../helper/validation";
import { UserController } from "./user.controller";
import { validateUserSchema } from "./user.entity";

const UserRouter = Router();

UserRouter.get("/", dependencies.userController.getUsers);
UserRouter.get("/:id", validateId, dependencies.userController.getUser);
UserRouter.post(
  "/",
  validateBody,
  validateUserSchema,
  dependencies.userController.addUser
);
UserRouter.put(
  "/:id",
  validateId,
  validateBody,
  validateUserSchema,
  dependencies.userController.updateUser
);
UserRouter.delete("/:id", validateId, dependencies.userController.deleteUser);

export default UserRouter;
