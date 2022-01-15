import BookController from "../entity/book/book.controller";
import { UserController } from "../entity/user/user.controller";

type DependencyType = {
  userController: UserController;
  bookController: BookController;
};

let dependencies: DependencyType = {
  userController: new UserController(),
  bookController: new BookController(),
};

async function initDependencies() {
  console.log("dependencies initialized");
}

export { dependencies, initDependencies };
