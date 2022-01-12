import { Request, Response } from "express";

import {
  StringSchema,
  NumberSchema,
  GenderSchema,
  Schema,
} from "../../helper/DataSchema";
import { validateSchema } from "../../helper/validation";

import BaseEntity from "../baseEntity";

interface UserEntity extends BaseEntity {
  name: string;
  age: number;
  address: string;
  gender: string;
}

interface Prop<T> {
  schema: Schema<T>;
}

type newType<T> = {
  [K in keyof T]: Prop<T[K]>;
};

const UserSchema: newType<Partial<UserEntity>> = {
  name: {
    schema: new StringSchema("address").max(12).min(2).required(),
  },
  age: {
    schema: new NumberSchema("age").notNegative(),
  },
  gender: {
    schema: new GenderSchema("gender").maleOrfemale(),
  },
  address: {
    schema: new StringSchema("address").max(12).min(2).required(),
  },
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
