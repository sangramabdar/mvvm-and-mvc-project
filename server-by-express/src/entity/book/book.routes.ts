import { Request, Response, Router } from "express";
import {
  validateId,
  validateBody,
  validateKeys,
} from "../../helper/validation";

import BookController from "./book.controller";
import { BookSchema } from "./book.entity";

const BookRouter = Router();

BookRouter.get("/", BookController.getBooks);
BookRouter.get("/:id", validateId, BookController.getBook);
BookRouter.post("/", validateBody, validateSchema, BookController.addBook);
BookRouter.put(
  "/:id",
  validateId,
  validateBody,
  validateSchema,
  BookController.updateBook
);
BookRouter.delete("/:id", validateId, BookController.deleteBook);

async function validateSchema(request: Request, response: Response, next) {
  try {
    if (request.method === "POST") {
      request.body = await validateKeys(BookSchema, request.body, "POST");
    } else {
      request.body = await validateKeys(BookSchema, request.body, "PUT");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export default BookRouter;
