import { Repository, RepositoryImpl } from "./repository";
import { BaseEntity } from "./userRepository";

interface BookEntity extends BaseEntity {
  name: string;
  isbn: string;
}
interface BookRepository<T> extends Repository<T> {
  method();
}

class BookRepositoryImpl
  extends RepositoryImpl<BookEntity>
  implements BookRepository<BaseEntity>
{
  private static collection = "book";
  constructor() {
    super(BookRepositoryImpl.collection);
  }
  method() {
    console.log("book");
  }
}

export { BookRepository, BookEntity, BookRepositoryImpl };
