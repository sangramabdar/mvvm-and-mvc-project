import { Router } from "express";
import { dependencies } from "../../config/dependencies";
import { validateId, validateBody } from "../../helper/validation";

import BookController from "./book.controller";
import { validateBookSchema } from "./book.entity";

const BookRouter = Router();

BookRouter.get("/", dependencies.bookController.getBooks);
BookRouter.get("/:id", validateId, dependencies.bookController.getBook);
BookRouter.post(
  "/",
  validateBody,
  validateBookSchema,
  dependencies.bookController.addBook
);
BookRouter.put(
  "/:id",
  validateId,
  validateBody,
  validateBookSchema,
  dependencies.bookController.updateBook
);
BookRouter.delete("/:id", validateId, dependencies.bookController.deleteBook);

export default BookRouter;
