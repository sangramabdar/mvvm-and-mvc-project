import BaseEntity from "../baseEntity";
import { newType } from "../user/user.entity";

interface BookEntity extends BaseEntity {
  name: string;
  isbn: string;
}

const bookEntityProps: newType<BookEntity> = {
  name: {
    type: "string",
    condition: (_name: string) => (_name.length > 0 ? true : false),
    error: "name should not be empty",
  },
  isbn: {
    type: "string",
    condition: (_isbn: string) => (_isbn.length > 0 ? true : false),
    error: "isbn should not be empty",
  },
};

function createBook(): BookEntity {
  return {
    name: "",
    isbn: "",
  };
}

export { createBook, BookEntity, bookEntityProps };
