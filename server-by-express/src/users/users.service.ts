import { Document } from "mongodb";
import { UserEntity, UserRepository } from "../Repository/userRepository";

import Result, { ResultType } from "../helper/result";
import { idValidaion, userValidation } from "../helper/validation";
import { RepositoryImpl } from "../Repository/repository";

class UserService {
  #userRepository: UserRepository;

  constructor() {
    this.#userRepository = new RepositoryImpl("book");
  }

  async addUser(user: UserEntity) {
    try {
      if (Object.keys(user).length == 0) return Result("failure", "empty body");
      await this.#userRepository.add(user);
      return Result("success", "added");
    } catch (error: any) {
      return Result<string>("failure", error.message);
    }
  }

  async getUsers(): Promise<ResultType<Document[]>> {
    try {
      const users = await this.#userRepository.getAll();
      return Result("success", users);
    } catch (error: any) {
      return Result("failure", error.message);
    }
  }

  async deleteUser(id: string) {
    try {
      if (!id) {
        return Result("failure", "plz provide id in request body");
      }
      await this.#userRepository.deleteById(id);
      return Result("success", "deleted");
    } catch (error: any) {
      return Result("failure", error.message);
    }
  }

  async updateUser(id: string, user: UserEntity) {
    try {
      userValidation(id, user);
      idValidaion(id);
      await this.#userRepository.updateById(id, user);
      return Result("success", "updated");
    } catch (error: any) {
      return Result("failure", error.message);
    }
  }

  async getUser(id: string): Promise<ResultType<Document | string>> {
    try {
      if (!id) {
        return Result("failure", "plz provide id in request body");
      }
      idValidaion(id);
      const user = await this.#userRepository.getById(id);
      return Result("success", user);
    } catch (error: any) {
      return Result("failure", error.message);
    }
  }
}

export default UserService;
