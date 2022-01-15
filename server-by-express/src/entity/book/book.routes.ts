import { Router } from "express";
import { dependencies } from "../../config/dependencies";
import { validateId, validateBody } from "../../helper/validation";
import { validateBookSchema } from "./book.entity";

const BookRouter = Router();

BookRouter.get("/", dependencies.bookController.getAllEntities);
BookRouter.get("/:id", validateId, dependencies.bookController.getEntity);
BookRouter.post(
  "/",
  validateBody,
  validateBookSchema,
  dependencies.bookController.addEntity
);
BookRouter.put(
  "/:id",
  validateId,
  validateBody,
  validateBookSchema,
  dependencies.bookController.updateEntity
);
BookRouter.delete("/:id", validateId, dependencies.bookController.deleteEntity);

export default BookRouter;
