import BaseEntity from "../baseEntity";
import { newType } from "../user/user.entity";

interface BookEntity extends BaseEntity {
  name: string;
  isbn: string;
  date: Date;
}

const bookEntityProps: newType<Partial<BookEntity>> = {
  name: {
    type: "string",
    condition: (_name: string) => _name.length > 0,
    error: "name should not be empty",
  },
  isbn: {
    type: "string",
    condition: (_isbn: string) => _isbn.length > 0,
    error: "isbn should not be empty",
  },
};

// function createBook(): BookEntity {
//   return {
//     name: "",
//     isbn: "",
//     data: new Date(),
//   };
// }

export { BookEntity, bookEntityProps };
