import { isStringNotEmpty } from "../../helper/validationFunctions";
import BaseEntity from "../baseEntity";
import { newType } from "../user/user.entity";

interface BookEntity extends BaseEntity {
  name: string;
  isbn: string;
  date: Date;
}

const BookSchema: newType<Partial<BookEntity>> = {
  name: {
    type: "string",
    condition: isStringNotEmpty,
    error: "name should not be empty",
  },
  isbn: {
    type: "string",
    condition: isStringNotEmpty,
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

export { BookEntity, BookSchema };
