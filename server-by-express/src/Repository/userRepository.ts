import { ObjectId } from "mongodb";
import { Repository, RepositoryImpl } from "./repository";

interface BaseEntity {
  _id?: ObjectId;
}

interface UserEntity extends BaseEntity {
  name: string;
  age: number;
}

interface BookEntity extends BaseEntity {
  name: string;
  isbn: string;
}

interface UserRepository extends Repository<UserEntity> {}

interface BookRepository extends Repository<BookEntity> {}
// class UserRepositoryImpl
//   extends RepositoryImpl<UserEntity>
//   implements UserRepository
// {
//   private static collection = "users";
//   constructor() {
//     super(UserRepositoryImpl.collection);
//   }
// }

export { UserRepository, UserEntity, BookRepository, BookEntity };
