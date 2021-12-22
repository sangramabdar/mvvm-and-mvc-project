import { ObjectId } from "mongodb";
import Database from "../config/db";
import { Repository, RepositoryImpl } from "./repository";

interface BaseEntity {
  _id?: ObjectId;
}

interface UserEntity extends BaseEntity {
  name: string;
  age: number;
}

interface UserRepository extends Repository<UserEntity> {}

class UserRepositoryImpl
  extends RepositoryImpl<UserEntity>
  implements UserRepository
{
  private static collection = "users";
  constructor() {
    super(UserRepositoryImpl.collection);
  }
}

export { UserRepository, UserEntity, UserRepositoryImpl, BaseEntity };
