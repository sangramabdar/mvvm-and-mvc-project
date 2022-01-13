import { ResultType, Result } from "../helper/result";

interface IRepository<T> {
  get(): Promise<ResultType<T[]>>;
  getAll(): Promise<ResultType<T[]>>;
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
      const response = await fetch(this.URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.payload);
      if (response.status === 200) {
        return Result("", [data.payload]);
      }
      return Result("", []);
    } catch (error) {
      return Result(error.message);
    }
  }

  async getAll(): Promise<ResultType<T[]>> {
    try {
      const response = await fetch(this.URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        return Result("", data.payload);
      }
      return Result("", []);
    } catch (error) {
      return Result(error.message);
    }
  }
  async add(element: T): Promise<ResultType<T>> {
    try {
      const response = await fetch(this.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(element),
      });
      const data = await response.json();
      if (response.status === 201) {
        return Result("", data.payload);
      }
      return Result(data.error, null);
    } catch (error) {
      return Result(error.message);
    }
  }

  async deleteById(id: string): Promise<ResultType<T>> {
    try {
      console.log(this.URL + "/" + id);
      const response = await fetch(this.URL + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        return Result("", data.payload);
      }
      return Result(data.error, null);
    } catch (error) {
      return Result(error.message);
    }
  }

  async updateById(id: string, element: T): Promise<ResultType<T>> {
    try {
      console.log(this.URL + "/" + id);
      const response = await fetch(this.URL + "/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(element),
      });

      const data = await response.json();
      if (response.status === 200) {
        return Result("", data.payload);
      }
      return Result(data.error);
    } catch (error) {
      return Result(error.message);
    }
  }
}
export { Repository, IRepository };
