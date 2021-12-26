import {
  EntityService,
  EntityServiceImpl,
} from "../../genericComponents/service/entityServive";
import {
  UserEntity,
  UserRepository,
  UserRepositoryImpl,
} from "./user.repository";

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
    this.entityName = "user";
  }

  method() {
    console.log("method");
  }
}

export { UserService, UserServiceImpl };
