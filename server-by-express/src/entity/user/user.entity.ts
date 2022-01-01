import { isStringNotEmpty } from "../../helper/validationFunctions";
import BaseEntity from "../baseEntity";

interface UserEntity extends BaseEntity {
  name: string;
  age: number;
  address: string;
  gender: "male" | "female";
}

interface Prop<T> {
  type: string;
  condition: (prop: T) => boolean;
  error: string;
}

type newType<T> = {
  [K in keyof T]: Prop<T[K]>;
};

const UserSchema: newType<Partial<UserEntity>> = {
  name: {
    type: "string",
    condition: isStringNotEmpty,
    error: "name should not be empty",
  },
  age: {
    type: "number",
    condition: (_age: number) => _age >= 18 && _age <= 100,
    error: "age should not be less than 18 or greater than 100",
  },
  address: {
    type: "string",
    condition: isStringNotEmpty,
    error: "address should not be empty",
  },
  gender: {
    type: "string",
    condition: _gender => _gender === "male" || _gender === "female",
    error: "gender must be male or female",
  },
};

export { UserEntity, UserSchema, Prop, newType };
