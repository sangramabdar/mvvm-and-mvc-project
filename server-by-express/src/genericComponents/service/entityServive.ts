import Database from "../../config/db";
import {
  DataBaseConnectionError,
  EntityNotFound,
} from "../../helper/exceptions";

import { Repository } from "../Repository/repository";

interface EntityService<T> {
  getEntity(id: string): Promise<any>;
  getAllEntities(): Promise<T[]>;
  addEntity(entity: T);
  updateEntity(id: string, entity: T);
  deleteEntity(id: string);
}

class EntityServiceImpl<E, T extends Repository<E>>
  implements EntityService<E>
{
  protected entityRepository: T;
  protected entityName: string = "";
  async getEntity(id: string): Promise<E> {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    const result = await this.entityRepository.getById(id, db);
    if (!result) {
      throw new EntityNotFound(this.entityName);
    }
    return result as E;
  }

  async getAllEntities(): Promise<E[]> {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    const users = await this.entityRepository.getAll(db);
    return users;
  }

  async addEntity(entity: E) {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    await this.entityRepository.add(entity, db);
    return "added";
  }

  async updateEntity(id: string, entity: E) {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    let result = await this.entityRepository.updateById(id, entity, db);
    if (!result) {
      throw new EntityNotFound(this.entityName);
    }
    return "updated";
  }

  async deleteEntity(id: string) {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    let result = await this.entityRepository.deleteById(id, db);
    if (!result) {
      throw new EntityNotFound(this.entityName);
    }
    return "deleted";
  }
}

export { EntityService, EntityServiceImpl };
