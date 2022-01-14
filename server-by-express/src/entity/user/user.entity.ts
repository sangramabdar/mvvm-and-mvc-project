import { Request, Response } from "express";

import {
  StringSchema,
  NumberSchema,
  Schema,
} from "../../common/schemaValidation/schema";
import { validateSchema } from "../../helper/validation";

import BaseEntity from "../baseEntity";

interface UserEntity extends BaseEntity {
  name: string;
  age: number;
  address: string;
  gender: string;
  email: string;
}

interface Prop<T> {
  schema: Schema<T>;
}

type newType<T> = {
  [K in keyof T]: Schema<T[K]>;
};

const UserSchema: newType<Partial<UserEntity>> = {
  name: new StringSchema("name").max(12).min(2).onlyAplhabates(),
  age: new NumberSchema("age").notNegative().max(100).min(18),
};

async function validateUserSchema(request: Request, response: Response, next) {
  try {
    if (request.method === "POST") {
      request.body = await validateSchema(UserSchema, request.body, "POST");
    } else {
      request.body = await validateSchema(UserSchema, request.body, "PUT");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { UserEntity, UserSchema, Prop, newType, validateUserSchema };
