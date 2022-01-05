import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { newType } from "../entity/user/user.entity";

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
  entity: newType<T>,
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

        if (typeof body[key] !== entity[key].type) {
          throw new Error(`${key} must be ${entity[key].type}`);
        }

        if (!entity[key].condition(body[key])) {
          throw new Error(entity[key].error);
        }
        newObject[key] = body[key];
      }
      break;

    case "PUT":
      var keys = Object.keys(body);
      for (let key of keys) {
        if (key in entity) {
          if (typeof body[key] !== entity[key].type) {
            throw new Error(`${key} must be ${entity[key]}`);
          }

          if (!entity[key].condition(body[key])) {
            throw new Error(entity[key].error);
          }
          newObject[key] = body[key];
        }
      }
      break;
  }
  return newObject;
}

export { validateId, validateBody, validateSchema };
