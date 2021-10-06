function userValidation<T>(id: string, user: T) {
  if (!id || !user) {
    throw new Error("plz provide id and value in request body");
  }

  if (typeof user === "object") {
    if (Object.keys(user).length == 0) {
      throw new Error("value must not be empty or it must be object");
    }
    return;
  }

  throw new Error("value must not be empty or it must be object");
}

export { userValidation };
