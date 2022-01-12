import { Request, Response } from "express";
import { statusCodeHandler } from "../../../helper/errorMiddleWare";
import ResponseBodyBuilder from "../../../helper/responseBodyBuilder";

import { EntityService } from "../service/entityServive";

interface EntityController<T> {
  getEntity(request: Request, response: Response);
  getAllEntities(request: Request, response: Response);
  addEntity(request: Request, response: Response);
  updateEntity(request: Request, response: Response);
  deleteEntity(request: Request, response: Response);
}

class EntityControllerImpl<E, T extends EntityService<E>>
  implements EntityController<E>
{
  entityService: T;

  async getEntity(request: Request, response: Response) {
    try {
      console.log(request.params);
      const id = request.params["id"];
      const result = await this.entityService.getEntity(id);
      const responseBody = new ResponseBodyBuilder<Document>().setPayload(
        result
      );
      return response.json(responseBody);
    } catch (error) {
      let responseBody = new ResponseBodyBuilder<string>(error.message);
      statusCodeHandler(error, responseBody, response);
      return response.json(responseBody);
    }
  }

  async getAllEntities(request: Request, response: Response) {
    try {
      const result = await this.entityService.getAllEntities();
      let responseBody = new ResponseBodyBuilder<E[]>("", result);
      return response.json(responseBody);
    } catch (error) {
      let responseBody = new ResponseBodyBuilder<string>(error.message);
      statusCodeHandler(error, responseBody, response);
      return response.json(response);
    }
  }

  async addEntity(request: Request, response: Response) {
    try {
      const user: E = request.body;
      const result = await this.entityService.addEntity(user);
      let responseBody = new ResponseBodyBuilder<string>("", result);
      return response.status(201).json(responseBody);
    } catch (error) {
      let responseBody = new ResponseBodyBuilder<string>(error.message);
      statusCodeHandler(error, responseBody, response);
      return response.json(response);
    }
  }

  async updateEntity(request: Request, response: Response) {
    try {
      const id = request.params["id"];
      const user: E = request.body;
      const result = await this.entityService.updateEntity(id, user);
      const responseBody = new ResponseBodyBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      let responseBody = new ResponseBodyBuilder<string>(error.message);
      statusCodeHandler(error, responseBody, response);
      return response.json(responseBody);
    }
  }

  async deleteEntity(request: Request, response: Response) {
    try {
      const id = request.params["id"];
      const result = await this.entityService.deleteEntity(id);
      const responseBody = new ResponseBodyBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      let responseBody = new ResponseBodyBuilder<string>(error.message);
      statusCodeHandler(error, responseBody, response);
      return response.json(response);
    }
  }
}

// interface UserController extends EntityController<UserEntity> {}

// class UserControllerImpl
//   extends EntityControllerImpl<UserEntity, UserService>
//   implements UserController
// {
//   static userController: UserController = new UserControllerImpl();
//   constructor() {
//     super();
//     this.entityService = new UserServiceImpl();
//   }
// }

// export { UserController, UserControllerImpl };
