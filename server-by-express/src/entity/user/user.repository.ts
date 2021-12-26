import { ObjectId } from "mongodb";

import {
  Repository,
  RepositoryImpl,
} from "../../genericComponents/Repository/repository";

interface BaseEntity {
  _id?: ObjectId;
}

interface UserEntity extends BaseEntity {
  name: string;
  age: number;
}

function createUser(): UserEntity {
  return {
    age: 22,
    name: "",
  };
}

interface UserRepository<T> extends Repository<UserEntity> {}

class UserRepositoryImpl
  extends RepositoryImpl<UserEntity>
  implements UserRepository<UserEntity>
{
  private static collection = "users";
  constructor() {
    super(UserRepositoryImpl.collection);
  }

  method() {
    console.log("method");
  }
}

export {
  UserRepository,
  UserRepositoryImpl,
  BaseEntity,
  UserEntity,
  createUser,
};
