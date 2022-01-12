import { Request, Response } from "express";
import { StringSchema } from "../../common/schemaValidation/schema";
import { validateSchema } from "../../helper/validation";
import BaseEntity from "../baseEntity";
import { newType } from "../user/user.entity";

interface BookEntity extends BaseEntity {
  name: string;
  isbn: string;
  date: Date;
}

const BookSchema: newType<Partial<BookEntity>> = {
  name: {
    schema: new StringSchema("name").max(12).min(2).onlyAplhabates(),
  },
  isbn: {
    schema: new StringSchema("isbn").min(10).max(20).onlyDigits(),
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
