import { Repository, RepositoryImpl } from "./repository";
import { BaseEntity } from "./userRepository";

interface BookEntity extends BaseEntity {
  name: string;
  isbn: string;
}
interface BookRepository extends Repository<BookEntity> {}

class BookRepositoryImpl
  extends RepositoryImpl<BookEntity>
  implements BookRepository
{
  private static collection = "book";
  constructor() {
    super(BookRepositoryImpl.collection);
  }
}

export { BookRepository, BookEntity, BookRepositoryImpl };
