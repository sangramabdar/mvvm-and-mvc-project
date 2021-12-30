import { Router } from "express";
import {
  validateId,
  validateBody,
  validateSchema,
} from "../../helper/validation";

import BookController from "./book.controller";
import { BookSchema } from "./book.entity";
import { BookEntity } from "./book.repository";

const BookRouter = Router();

BookRouter.get("/", BookController.getBooks);
BookRouter.get("/:id", validateId, BookController.getBook);
BookRouter.post("/", validateBook, BookController.addBook);
BookRouter.put("/:id", validateId, validateBody, BookController.updateBook);
BookRouter.delete("/:id", validateId, BookController.deleteBook);

async function validateBook(request, response, next) {
  try {
    const book: BookEntity = request.body;
    await BookSchema.validateAsync(book);
    next();
  } catch (error) {
    next(error);
  }
}

export default BookRouter;
