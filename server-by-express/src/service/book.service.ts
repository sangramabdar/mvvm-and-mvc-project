import {
  BookEntity,
  BookRepository,
  BookRepositoryImpl,
} from "../Repository/bookRepository";
import { EntityService, EntityServiceImpl } from "./entityServive";

interface BookService extends EntityService<BookEntity> {
  method();
}

class BookServiceImpl
  extends EntityServiceImpl<BookEntity, BookRepository<BookEntity>>
  implements BookService
{
  constructor() {
    super();
    this.entityRepository = new BookRepositoryImpl();
  }
  method() {
    console.log("book");
  }
}

export { BookService, BookServiceImpl };
