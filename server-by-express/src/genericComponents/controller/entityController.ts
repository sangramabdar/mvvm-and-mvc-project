import { Request, Response } from "express";
import ResponseBuilder from "../../helper/responseBuilder";
import { statusCodeHandler } from "../../helper/validation";
import { EntityService } from "../service/entityServive";

interface EntityController<T> {
  getEntity(httpRequest: Request, httpResponse: Response);
  getAllEntities(httpRequest: Request, httpResponse: Response);
  addEntity(httpRequest: Request, httpResponse: Response);
  updateEntity(httpRequest: Request, httpResponse: Response);
  deleteEntity(httpRequest: Request, httpResponse: Response);
}

class EntityControllerImpl<E, T extends EntityService<E>>
  implements EntityController<E>
{
  entityService: T;

  async getEntity(httpRequest: Request, httpResponse: Response) {
    try {
      console.log(httpRequest.params);
      const id = httpRequest.params["id"];
      const result = await this.entityService.getEntity(id);
      const response = new ResponseBuilder<Document>().setPayload(result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  async getAllEntities(httpRequest: Request, httpResponse: Response) {
    try {
      const result = await this.entityService.getAllEntities();
      let response = new ResponseBuilder<E[]>("", result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  async addEntity(httpRequest: Request, httpResponse: Response) {
    try {
      const user: E = httpRequest.body;
      const result = await this.entityService.addEntity(user);
      let response = new ResponseBuilder<string>("", result);
      return httpResponse.status(201).json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  async updateEntity(httpRequest: Request, httpResponse: Response) {
    try {
      const id = httpRequest.params["id"];
      const user: E = httpRequest.body;
      const result = await this.entityService.updateEntity(id, user);
      const response = new ResponseBuilder<string>("", result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  async deleteEntity(httpRequest: Request, httpResponse: Response) {
    try {
      const id = httpRequest.params["id"];
      const result = await this.entityService.deleteEntity(id);
      const response = new ResponseBuilder<string>("", result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
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
