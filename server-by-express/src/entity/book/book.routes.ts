import { Router } from "express";
import { Book, idValidation, schemaValidation } from "../../helper/validation";
import BookController from "./book.controller";
import { BookEntity } from "./book.repository";

const BookRouter = Router();

BookRouter.get("/", BookController.getBooks);
BookRouter.get("/:id", idValidation, BookController.getBook);
BookRouter.post("/", bookValidator, BookController.addBook);
BookRouter.put("/:id", idValidation, BookController.updateBook);
BookRouter.delete("/:id", idValidation, BookController.deleteBook);
BookRouter.use("*", BookController.wrongRoute);

async function bookValidator(httpRequest, httpResponse, next) {
  try {
    const book: BookEntity = httpRequest.body;
    const validatedBook = await schemaValidation(book, "book");
    await Book.validateAsync(validatedBook);
    next();
  } catch (error) {
    next(error);
  }
}

export default BookRouter;
