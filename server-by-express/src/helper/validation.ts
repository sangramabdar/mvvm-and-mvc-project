import { Request, Response } from "express";
import Joi from "joi";
import { ObjectId } from "mongodb";
import { join } from "path";
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

async function schemaValidation<T extends BaseEntity>(
  entity: T,
  whichEntity: entityTypes
) {
  switch (whichEntity) {
    case "user":
      let user = createUser();
      var keys = Object.keys(user);
      return await keysValidation(keys, entity);
      break;
    case "book":
      let book = createBook();
      var keys = Object.keys(book);
      return await keysValidation(keys, entity);
  }
}

async function keysValidation(keys: string[], entity: any) {
  let dataKeys = Object.keys(entity);

  if (dataKeys.length !== keys.length) {
    throw new WrongContent(
      "complete information is not provided or some extra information is provided"
    );
  }
  let newData = {};
  dataKeys.forEach(key => {
    newData[key.toLowerCase()] = entity[key];
  });

  for (let key of keys) {
    if (!newData[key]) {
      throw new WrongContent("some information is not provided");
    }
  }
  return newData;
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
  } else if (error instanceof WrongContent) {
    res.setStatus(422);
    httpResponse.statusCode = 422;
  } else {
    res.setStatus(400);
    httpResponse.statusCode = 400;
  }
}

const User = Joi.object<UserEntity, false, UserEntity>({
  name: Joi.string().required(),
  age: Joi.number().integer().required(),
  address: Joi.string().required(),
});

const Book = Joi.object({
  name: Joi.string().required(),
  isbn: Joi.number().integer().required(),
});

function genderValidation(gender: string) {
  if (gender === "male" || gender === "female") {
    return;
  }
  throw new WrongContent("gender is not correct ");
}

async function idValidation(
  httpRequest: Request,
  httpResponse: Response,
  next
) {
  try {
    const id = httpRequest.params["id"];
    const isValid = ObjectId.isValid(id);

    if (!isValid) {
      throw new WrongContent("id format is not correct");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export {
  statusCodeHandler,
  schemaValidation,
  User,
  Book,
  genderValidation,
  idValidation,
};
