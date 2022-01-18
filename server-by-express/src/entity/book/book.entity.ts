import { Request, Response } from "express";
import {
  SchemaObject,
  StringSchema,
  validateSchema,
} from "../../common/schemaValidation/schema";
import BaseEntity from "../baseEntity";
import {  UserEntity } from "../user/user.entity";

interface BookEntity extends BaseEntity {
  name: string;
  isbn: string;
  date: Date;
}

const BookSchema = SchemaObject<UserEntity>({

})

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
