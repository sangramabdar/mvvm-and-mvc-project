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
  } else if (error instanceof WrongContent) {
    res.setStatus(400);
    httpResponse.statusCode = 400;
  }
}

export { userValidation, idValidaion, statusCodeHandler };
