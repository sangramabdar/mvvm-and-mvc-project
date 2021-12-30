import { Router } from "express";
import {
  validateId,
  validateBody,
  validateKeys,
} from "../../helper/validation";

import BookController from "./book.controller";
import { BookEntityKeys, BookSchema } from "./book.entity";
import { BookEntity } from "./book.repository";

const BookRouter = Router();

BookRouter.get("/", BookController.getBooks);
BookRouter.get("/:id", validateId, BookController.getBook);
BookRouter.post(
  "/",
  validateBody,
  validateSchemaForPost,
  BookController.addBook
);
BookRouter.put(
  "/:id",
  validateId,
  validateBody,
  validateSchemaForPut,
  BookController.updateBook
);
BookRouter.delete("/:id", validateId, BookController.deleteBook);

async function validateSchemaForPut(request, response, next) {
  try {
    const body = await validateKeys(BookEntityKeys, request.body, "PUT");
    request.body = body;
    next();
  } catch (error) {
    next(error);
  }
}

async function validateSchemaForPost(request, response, next) {
  try {
    const body = await validateKeys(BookEntityKeys, request.body, "POST");
    request.body = body;
    next();
  } catch (error) {
    next(error);
  }
}

export default BookRouter;
