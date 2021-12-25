import { Document } from "mongodb";
import {
  UserEntity,
  UserRepository,
  UserRepositoryImpl,
} from "../Repository/userRepository";

import Result, { ResultType } from "../helper/result";
import { idValidaion, userValidation } from "../helper/validation";
import Database from "../config/db";

class UserService {
  #userRepository: UserRepository;

  constructor() {
    this.#userRepository = new UserRepositoryImpl();
  }

  async addUser(user: UserEntity) {
    let db = await Database.getDb();

    if (!db) {
      throw new Error("db connection is not there");
    }
    await this.#userRepository.add(user, db);
    return "added";
  }

  async getUsers(): Promise<UserEntity[]> {
    let db = await Database.getDb();
    // if (Object.keys(user).length == 0) return Result("failure", "empty body");
    if (!db) {
      throw new Error("db connection is not there");
    }

    const users = await this.#userRepository.getAll(db);
    return users;
  }

  async deleteUser(id: string) {
    let db = await Database.getDb();
    if (!db) {
      throw new Error("db connection is not there");
    }

    if (!id) {
      return "plz provide id in request body";
    }

    let result = await this.#userRepository.deleteById(id, db);
    if (result) {
      return "deleted";
    }
    return "not found";
  }

  async updateUser(id: string, user: UserEntity) {
    let db = await Database.getDb();
    if (!db) {
      throw new Error("db connection is not there");
    }
    let result = await this.#userRepository.updateById(id, user, db);
    if (result) {
      return "updated";
    }
    return "not found";
  }

  async getUser(id: string): Promise<string | Document> {
    let db = await Database.getDb();
    if (!db) {
      throw new Error("db connection is not there");
    }
    if (!id) {
      return Result("failure", "plz provide id in request body");
    }

    const result = await this.#userRepository.getById(id, db);
    if (!result) {
      return "not found";
    }
    return result;
  }
}

export default UserService;
