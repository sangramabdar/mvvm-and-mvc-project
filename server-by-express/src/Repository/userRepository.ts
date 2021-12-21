import { ObjectId } from "mongodb";
import { CrudRepositoryImpl } from "./crudRepository";

interface UserEntity {
  _id?: ObjectId;
  name: string;
  age: number;
}

class UserRepository extends CrudRepositoryImpl<UserEntity> {
  private static collection = "users";
  constructor() {
    super(UserRepository.collection);
  }
}

export { UserRepository, UserEntity };
