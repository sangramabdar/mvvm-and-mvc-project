import {
  BookController,
  BookControllerImpl,
} from "../entity/book/book.controller";
import {
  UserController,
  UserControllerImpl,
} from "../entity/user/user.controller";

type DependencyType = {
  userController: UserController;
  bookController: BookController;
};

let dependencies: DependencyType = {
  userController: new UserControllerImpl(),
  bookController: new BookControllerImpl(),
};

async function initDependencies() {
  console.log("dependencies initialized");
  console.log(dependencies);
}

export { dependencies, initDependencies };
