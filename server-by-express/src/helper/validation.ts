import { ObjectId } from "mongodb";

function userValidation<T>(id: string, value: T) {
  if (!id || !value) {
    throw new Error("plz provide id and value in request body");
  }

  if (value instanceof Object) {
    if (Object.keys(value).length == 0) {
      throw new Error("value must not be empty or it must be object");
    }
    return;
  }

  throw new Error("value must not be empty or it must be object");
}

function idValidaion(id: string) {
  const isValid = ObjectId.isValid(id);

  if (!isValid) {
    throw new Error("id format is not correct");
  }
}

export { userValidation, idValidaion };
