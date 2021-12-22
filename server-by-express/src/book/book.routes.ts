import { Router } from "express";
import BookController from "./book.controller";

const BookRouter = Router();

BookRouter.get("/", BookController.getBooks);

export default BookRouter;
