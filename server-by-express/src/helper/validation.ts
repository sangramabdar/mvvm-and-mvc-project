import { UserEntity } from "../users/users.model";

function userValidation(user: UserEntity): boolean {
  if (Object.keys(user).length == 0) {
    return false;
  }
  return true;
}

export { userValidation };
