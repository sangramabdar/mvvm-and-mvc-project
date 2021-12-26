import { Router } from "express";
import BookController from "../controller/book.controller";
import { UserController } from "../controller/user.controller";

const BookRouter = Router();

BookRouter.get("/", BookController.getBooks);
BookRouter.get("/:id", BookController.getBook);
BookRouter.post("/", BookController.addBook);
BookRouter.put("/:id", BookController.updateBook);
BookRouter.delete("/:id", BookController.deleteBook);
BookRouter.use("*", BookController.wrongRoute);

export default BookRouter;
