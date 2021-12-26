import { Response } from "express";
import { ObjectId } from "mongodb";
import { createBook } from "../entity/book/book.repository";
import {
  BaseEntity,
  createUser,
  UserEntity,
} from "../entity/user/user.repository";
import {
  DataBaseConnectionError,
  EntityNotFound,
  WrongContent,
} from "./exceptions";
import ResponseBuilder from "./result";

function userValidation<T>(id: string, value: T) {
  if (!id || !value) {
    throw new WrongContent("plz provide id and value in request body");
  }

  if (value instanceof Object) {
    if (Object.keys(value).length == 0) {
      throw new WrongContent("value must not be empty or it must be object");
    }
  }
}

type entityTypes = "user" | "book";

function entityValidation<T extends BaseEntity>(
  entity: T,
  whichEntity: entityTypes
) {
  switch (whichEntity) {
    case "user":
      let user = createUser();
      var keys = Object.keys(user);
      keysValidation(keys, entity);
      break;
    case "book":
      let book = createBook();
      var keys = Object.keys(book);
      keysValidation(keys, entity);
      break;
  }
}

function keysValidation(keys: string[], entity: any) {
  let dataKeys = Object.keys(entity);
  if (dataKeys.length !== keys.length) {
    throw new Error(
      "schema of entity is not correct or extra information provided "
    );
  }

  for (let key of keys) {
    if (!entity[key]) {
      throw new Error("some information is not available");
    }
  }
}

function idValidaion(id: string) {
  const isValid = ObjectId.isValid(id);

  if (!isValid) {
    throw new WrongContent("id format is not correct");
  }
}

function statusCodeHandler(
  error: Error,
  res: ResponseBuilder<string>,
  httpResponse: Response
) {
  if (error instanceof DataBaseConnectionError) {
    res.setStatus(500);
    httpResponse.statusCode = 500;
  } else if (error instanceof EntityNotFound) {
    res.setStatus(404);
    httpResponse.statusCode = 404;
  } else {
    res.setStatus(400);
    httpResponse.statusCode = 400;
  }
}

export { userValidation, idValidaion, statusCodeHandler, entityValidation };
