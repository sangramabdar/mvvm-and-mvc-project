import { ObjectId } from "mongodb";
import { CrudRepositoryImplForMongodb } from "./crudRepository";

interface UserEntity {
  _id?: ObjectId;
  name: string;
  age: number;
}

class UserRepository extends CrudRepositoryImplForMongodb<UserEntity> {
  private static collection = "users";
  constructor() {
    super(UserRepository.collection);
  }
}

export { UserRepository, UserEntity };
