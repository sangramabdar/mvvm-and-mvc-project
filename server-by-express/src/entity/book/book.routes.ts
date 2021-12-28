import { Router } from "express";
import {
  idValidation,
  bodyValidation,
  schemaValidation,
} from "../../helper/validation";

import BookController from "./book.controller";
import { BookJoi } from "./book.entity";
import { BookEntity } from "./book.repository";

const BookRouter = Router();

BookRouter.get("/", BookController.getBooks);
BookRouter.get("/:id", idValidation, BookController.getBook);
BookRouter.post("/", bookValidation, BookController.addBook);
BookRouter.put("/:id", idValidation, bodyValidation, BookController.updateBook);
BookRouter.delete("/:id", idValidation, BookController.deleteBook);

async function bookValidation(httpRequest, httpResponse, next) {
  try {
    const book: BookEntity = httpRequest.body;
    await BookJoi.validateAsync(book);
    next();
  } catch (error) {
    next(error);
  }
}

export default BookRouter;
