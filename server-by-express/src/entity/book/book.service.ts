import {
  EntityService,
  EntityServiceImpl,
} from "../../genericComponents/service/entityServive";
import {
  BookEntity,
  BookRepository,
  BookRepositoryImpl,
} from "./book.repository";

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
    this.entityName = "book";
  }
  method() {
    console.log("book");
  }
}

export { BookService, BookServiceImpl };