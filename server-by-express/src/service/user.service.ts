import { Document } from "mongodb";
import {
  UserEntity,
  UserRepository,
  UserRepositoryImpl,
} from "../Repository/userRepository";

import Database from "../config/db";
import { DataBaseConnectionError, EntityNotFound } from "../helper/exceptions";
import { idValidaion, userValidation } from "../helper/validation";

class UserService {
  #userRepository: UserRepository;

  constructor() {
    this.#userRepository = new UserRepositoryImpl();
  }

  async addUser(user: UserEntity) {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    await this.#userRepository.add(user, db);
    return "added";
  }

  async getUsers(): Promise<UserEntity[]> {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    const users = await this.#userRepository.getAll(db);
    return users;
  }

  async deleteUser(id: string) {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    idValidaion(id);
    let result = await this.#userRepository.deleteById(id, db);
    if (!result) {
      throw new EntityNotFound("user");
    }
    return "deleted";
  }

  async updateUser(id: string, user: UserEntity) {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    idValidaion(id);
    userValidation(id, user);
    let result = await this.#userRepository.updateById(id, user, db);
    if (!result) {
      throw new EntityNotFound("user");
    }
    return "updated";
  }

  async getUser(id: string): Promise<Document> {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    idValidaion(id);
    const result = await this.#userRepository.getById(id, db);
    if (!result) {
      throw new EntityNotFound("user");
    }
    return result;
  }
}

export default UserService;
