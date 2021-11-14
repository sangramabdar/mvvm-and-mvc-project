import axios from "axios";

import { ResultType, Result } from "../helper/result";

interface IRepository<T> {
  get(): Promise<ResultType<T[]>>;
  add(element: T): Promise<ResultType<T>>;
  deleteById(id: string): Promise<ResultType<T>>;
  updateById(id: string, element: T): Promise<ResultType<T>>;
}

class Repository<T> implements IRepository<T> {
  protected URL = "";
  constructor(url: string) {
    this.URL = url;
  }

  async get(): Promise<ResultType<T[]>> {
    try {
      const response = await axios.get(this.URL);
      if (response.status == 404) {
        return Result(response.statusText, null);
      }
      const result = await response.data;

      return Result(null, result);
    } catch (error) {
      return Result(error.message);
    }
  }

  async add(element: T): Promise<ResultType<T>> {
    try {
      const response = await axios.post(this.URL, element);

      const result = await response.data;

      return Result(result);
    } catch (error) {
      return Result(error.message);
    }
  }

  async deleteById(id: string): Promise<ResultType<T>> {
    try {
      const response = await axios.delete(this.URL, {
        data: { id },
      });

      const result = await response.data;

      return Result(result);
    } catch (error) {
      return Result(error.message);
    }
  }

  async updateById(id: string, element: T): Promise<ResultType<T>> {
    try {
      const response = await axios.put(this.URL, {
        id,
        value: element,
      });

      const result = await response.data;

      return Result(result);
    } catch (error) {
      return Result(error.message);
    }
  }
}
export { Repository, IRepository };
