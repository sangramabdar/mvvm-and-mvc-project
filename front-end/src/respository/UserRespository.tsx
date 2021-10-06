import { Repository } from "./Respository";

export type User = {
  _id?: string;
  name: string;
  age: number;
};

class UserRespository extends Repository<User> {
  private static USER_URL = "http://localhost:8080/users";

  constructor() {
    super(UserRespository.USER_URL);
  }
}

export { UserRespository };
