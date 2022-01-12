import {
  EntityService,
  EntityServiceImpl,
} from "../../common/genericComponents/service/entityServive";
import {
  BookEntity,
  BookRepository,
  BookRepositoryImpl,
} from "./book.repository";

interface BookService extends EntityService<BookEntity> {}

class BookServiceImpl
  extends EntityServiceImpl<BookEntity, BookRepository<BookEntity>>
  implements BookService
{
  constructor() {
    super(new BookRepositoryImpl(), "book");
  }
}

export { BookService, BookServiceImpl };
