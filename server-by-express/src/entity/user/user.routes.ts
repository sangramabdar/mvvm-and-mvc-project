import { Router } from "express";
import { dependencies } from "../../config/dependencies";
import { validateBody, validateId } from "../../helper/validation";
import { validateUserSchema } from "./user.entity";

const UserRouter = Router();

UserRouter.get("/", dependencies.userController.getAllEntities);
UserRouter.get("/:id", validateId, dependencies.userController.getEntity);
UserRouter.post(
  "/",
  validateBody,
  validateUserSchema,
  dependencies.userController.addEntity
);
UserRouter.put(
  "/:id",
  validateId,
  validateBody,
  validateUserSchema,
  dependencies.userController.updateEntity
);
UserRouter.delete("/:id", validateId, dependencies.userController.deleteEntity);

export default UserRouter;
