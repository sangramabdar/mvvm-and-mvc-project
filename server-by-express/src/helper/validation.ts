import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { WrongContent } from "./exceptions";

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

async function validateId(request: Request, response: Response, next) {
  try {
    var id = request.params["id"];
    var isValid = ObjectId.isValid(id);
    if (!isValid) {
      throw new WrongContent("id is in wrong format");
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

async function validateSchema<T>(
  entity: any,
  body: {},
  method: "POST" | "PUT"
): Promise<{}> {
  let newObject = {};

  switch (method) {
    case "POST":
      var keys = Object.keys(entity);

      for (let key of keys) {
        if (!(key in body)) {
          throw new Error(`${key} must be there`);
        }
        entity[key].schema.validate(body[key]);
        newObject[key] = body[key];
      }
      break;

    case "PUT":
      var keys = Object.keys(body);
      for (let key of keys) {
        if (key in entity) {
          entity[key].schema.validate(body[key]);
          newObject[key] = body[key];
        }
      }
      break;
  }
  return newObject;
}

export { validateId, validateBody, validateSchema };
