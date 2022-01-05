import { Request, Response } from "express";
import { validateSchema } from "../../helper/validation";
import { isNameValid } from "../../helper/validationFunctions";
import BaseEntity from "../baseEntity";
import { newType } from "../user/user.entity";

interface BookEntity extends BaseEntity {
  name: string;
  isbn: string;
  date: Date;
}

const BookSchema: newType<Partial<BookEntity>> = {
  name: {
    type: "string",
    condition: isNameValid,
    error: "name should contain 5 to 12 characters",
  },
  isbn: {
    type: "string",
    condition: isNameValid,
    error: "isbn should contain 5 to 12 characters",
  },
};

async function validateBookSchema(request: Request, response: Response, next) {
  try {
    if (request.method === "POST") {
      request.body = await validateSchema(BookSchema, request.body, "POST");
    } else {
      request.body = await validateSchema(BookSchema, request.body, "PUT");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { BookEntity, BookSchema, validateBookSchema };
