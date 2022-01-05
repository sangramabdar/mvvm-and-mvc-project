import { Router } from "express";
import { validateId, validateBody } from "../../helper/validation";

import BookController from "./book.controller";
import { validateBookSchema } from "./book.entity";

const BookRouter = Router();

BookRouter.get("/", BookController.getBooks);
BookRouter.get("/:id", validateId, BookController.getBook);
BookRouter.post("/", validateBody, validateBookSchema, BookController.addBook);
BookRouter.put(
  "/:id",
  validateId,
  validateBody,
  validateBookSchema,
  BookController.updateBook
);
BookRouter.delete("/:id", validateId, BookController.deleteBook);

export default BookRouter;
