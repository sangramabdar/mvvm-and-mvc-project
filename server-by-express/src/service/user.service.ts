import {
  UserEntity,
  UserRepository,
  UserRepositoryImpl,
} from "../Repository/userRepository";
import { EntityService, EntityServiceImpl } from "./entityServive";

interface UserService extends EntityService<UserEntity> {
  method();
}

class UserServiceImpl
  extends EntityServiceImpl<UserEntity, UserRepository<UserEntity>>
  implements UserService
{
  constructor() {
    super();
    this.entityRepository = new UserRepositoryImpl();
  }

  method() {
    console.log("method");
  }
}

export { UserService, UserServiceImpl };
