import { Request, Response } from "express";
import Joi, { isSchema } from "joi";
import { ObjectId } from "mongodb";
import BaseEntity from "../entity/baseEntity";
import { createBook } from "../entity/book/book.entity";
import { createUser } from "../entity/user/user.entity";

import {
  DataBaseConnectionError,
  EntityNotFound,
  WrongContent,
} from "./exceptions";
import ResponseBuilder from "./responseBuilder";

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
    case "book":
      let book = createBook();
      var keys = Object.keys(book);
      return await keysValidation(keys, entity);
  }
}

async function keysValidation(keys: string[], entity: any) {
  let dataKeys = Object.keys(entity);

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

async function validateSchema<T extends BaseEntity>(
  request: Request,
  response,
  next
) {
  try {
    console.log(request.path);
    await schemaValidation<T>(request.body, "user");
  } catch (error) {
    next(error);
  }
}

function statusCodeHandler(
  error: Error,
  res: ResponseBuilder<string>,
  response: Response
) {
  if (error instanceof DataBaseConnectionError) {
    res.setStatus(500);
    response.statusCode = 500;
  } else if (error instanceof EntityNotFound) {
    res.setStatus(404);
    response.statusCode = 404;
  } else if (error instanceof WrongContent) {
    res.setStatus(422);
    response.statusCode = 422;
  } else {
    res.setStatus(400);
    response.statusCode = 400;
  }
}

async function validateId(request: Request, response: Response, next) {
  try {
    const id = request.params["id"];
    const isValid = ObjectId.isValid(id);
    if (!isValid) {
      throw new WrongContent("id format is not correct");
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function validateBody(request: Request, $: Response, next) {
  try {
    if (Object.keys(request.body).length == 0)
      throw new Error("body should not be empty");

    next();
  } catch (error) {
    next(error);
  }
}

export { statusCodeHandler, validateSchema, validateId, validateBody };
