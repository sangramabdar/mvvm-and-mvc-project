import axios from "axios";

import { ResultType, Result, ResultModifier } from "../helper/result";

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
      const r = await axios.get(this.URL);
      if (r.status == 404) {
        return Result(r.statusText, null);
      }
      const result = await r.data;

      return ResultModifier(result);
    } catch (error) {
      return Result(error.message);
    }
  }

  async add(element: T): Promise<ResultType<T>> {
    try {
      const r = await axios.post(this.URL, element);

      const result = await r.data;

      return ResultModifier(result);
    } catch (error) {
      return Result(error.message);
    }
  }

  async deleteById(id: string): Promise<ResultType<T>> {
    try {
      const r = await axios.delete(this.URL, {
        data: { id },
      });

      const result = await r.data;

      return ResultModifier(result);
    } catch (error) {
      return Result(error.message);
    }
  }

  async updateById(id: string, element: T): Promise<ResultType<T>> {
    try {
      const r = await axios.put(this.URL, {
        id,
        value: element,
      });

      const result = await r.data;

      return ResultModifier(result);
    } catch (error) {
      return Result(error.message);
    }
  }
}
export { Repository, IRepository };
