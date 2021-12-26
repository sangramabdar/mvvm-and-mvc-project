import { Repository, RepositoryImpl } from "../../genericComponents/Repository/repository";
import { BaseEntity } from "../user/user.repository";

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
