import Joi from "joi";
import BaseEntity from "../baseEntity";

interface BookEntity extends BaseEntity {
  name: string;
  isbn: string;
}

const BookEntityKeys = {
  name: "string",
  isbn: "string",
};

const BookSchema = Joi.object<BookEntity>({
  name: Joi.string().required(),
  isbn: Joi.number().integer().required(),
});

function createBook(): BookEntity {
  return {
    name: "",
    isbn: "",
  };
}

export { BookSchema, createBook, BookEntity, BookEntityKeys };
