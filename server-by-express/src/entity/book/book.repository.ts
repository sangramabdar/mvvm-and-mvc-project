import {
  Repository,
  RepositoryImpl,
} from "../../common/genericComponents/Repository/repository";
import BaseEntity from "../baseEntity";
import { BookEntity } from "./book.entity";

interface BookRepository<T> extends Repository<T> {}

class BookRepositoryImpl
  extends RepositoryImpl<BookEntity>
  implements BookRepository<BaseEntity>
{
  private static collection = "book";
  constructor() {
    super(BookRepositoryImpl.collection);
  }
}

export { BookRepository, BookEntity, BookRepositoryImpl };
