import { Request, Response } from "express";
import ResponseBodyBuilder from "../../helper/responseBodyBuilder";
import { BookService, BookServiceImpl } from "./book.service";
import { BookEntity } from "./book.repository";

class BookController {
  private bookService: BookService;
  constructor() {
    this.bookService = new BookServiceImpl();
  }

  getBooks = async (request: Request, response: Response, next) => {
    try {
      const result = await this.bookService.getAllEntities();
      let responseBody = new ResponseBodyBuilder<BookEntity[]>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  addBook = async (request: Request, response: Response, next) => {
    try {
      const book = request.body;
      const result = await this.bookService.addEntity(book);
      let responseBody = new ResponseBodyBuilder<string>("", result);
      return response.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  updateBook = async (request: Request, response: Response, next) => {
    try {
      const id = request.params["id"];
      const book: BookEntity = request.body;
      const result = await this.bookService.updateEntity(id, book);
      const responseBody = new ResponseBodyBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  deleteBook = async (request: Request, response: Response, next) => {
    try {
      const id = request.params["id"];
      const result = await this.bookService.deleteEntity(id);
      const responseBody = new ResponseBodyBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  getBook = async (request: Request, response: Response, next) => {
    try {
      const id = request.params["id"];
      const result = await this.bookService.getEntity(id);
      const responseBody = new ResponseBodyBuilder<BookEntity>().setPayload(
        result
      );
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  wrongRoute = async (request: Request, response: Response) => {
    console.log("wrong");
    return response.status(404).json({ result: "wrong route" });
  };
}

export default BookController;
