import { Request, Response } from "express";
import { validateSchema } from "../../helper/validation";
import { isNameValid } from "../../helper/validationFunctions";
import BaseEntity from "../baseEntity";

interface UserEntity extends BaseEntity {
  name: string;
  age: number;
  address: string;
  gender: "male" | "female";
}

interface Prop<T> {
  type: string;
  condition: (prop: T) => boolean;
  error: string;
}

type newType<T> = {
  [K in keyof T]: Prop<T[K]>;
};

const UserSchema: newType<Partial<UserEntity>> = {
  name: {
    type: "string",
    condition: isNameValid,
    error: "name should contain 5 to 12 character",
  },
  age: {
    type: "number",
    condition: (_age: number) => _age >= 18 && _age <= 100,
    error: "age should not be less than 18 or greater than 100",
  },
  address: {
    type: "string",
    condition: isNameValid,
    error: "address should not be empty",
  },
  gender: {
    type: "string",
    condition: _gender => _gender === "male" || _gender === "female",
    error: "gender must be male or female",
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
