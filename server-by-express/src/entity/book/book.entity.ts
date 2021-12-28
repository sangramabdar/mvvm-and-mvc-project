import Joi from "joi";
import BaseEntity from "../baseEntity";

interface BookEntity extends BaseEntity {
  name: string;
  isbn: string;
}

const BookJoi = Joi.object<BookEntity>({
  name: Joi.string().required(),
  isbn: Joi.number().integer().required(),
});

function createBook(): BookEntity {
  return {
    name: "",
    isbn: "",
  };
}

export { BookJoi, createBook, BookEntity };
