import {
  EntityService,
  EntityServiceImpl,
} from "../../genericComponents/service/entityServive";
import { UserEntity } from "./user.entity";
import { UserRepository, UserRepositoryImpl } from "./user.repository";

interface UserService extends EntityService<UserEntity> {}

class UserServiceImpl
  extends EntityServiceImpl<UserEntity, UserRepository<UserEntity>>
  implements UserService
{
  constructor() {
    super(new UserRepositoryImpl(), "user");
  }
}

export { UserService, UserServiceImpl };
