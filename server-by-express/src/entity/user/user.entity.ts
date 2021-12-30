import Joi, { number, string } from "joi";
import BaseEntity from "../baseEntity";

interface UserEntity extends BaseEntity {
  name: string;
  age: number;
  address: string;
}

const UserEntityKeys = {
  name: "string",
  age: "number",
  address: "string",
};

const UserSchema = Joi.object<UserEntity>({
  name: Joi.string().required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
});

function createUser(): UserEntity {
  return {
    age: 22,
    name: "",
    address: "",
  };
}

export { UserEntity, createUser, UserSchema, UserEntityKeys };
