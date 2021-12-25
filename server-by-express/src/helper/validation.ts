import { Response } from "express";
import { ObjectId } from "mongodb";
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

function idValidaion(id: string) {
  const isValid = ObjectId.isValid(id);

  if (!isValid) {
    throw new Error("id format is not correct");
  }
}

function errorHandler(
  error: Error,
  res: ResponseBuilder<string>,
  httpResponse: Response
) {
  if (error instanceof DataBaseConnectionError) {
    res.setStatus(500);
    httpResponse.status(500);
  } else if (error instanceof EntityNotFound) {
    res.setStatus(404);
    httpResponse.status(404);
  } else if (error instanceof WrongContent) {
    res.setStatus(422);
    httpResponse.status(422);
  }
}

export { userValidation, idValidaion, errorHandler };
