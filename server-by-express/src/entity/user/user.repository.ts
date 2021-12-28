import {
  Repository,
  RepositoryImpl,
} from "../../genericComponents/Repository/repository";
import { UserEntity } from "./user.entity";

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

export { UserRepository, UserRepositoryImpl };
