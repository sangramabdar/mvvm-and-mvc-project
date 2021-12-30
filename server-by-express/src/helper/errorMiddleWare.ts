import ResponseBuilder from "./responseBuilder";
import { statusCodeHandler } from "./validation";

async function errorMiddleWare(error, request, response, next) {
  let responseBody = new ResponseBuilder<string>(error.message);
  statusCodeHandler(error, responseBody, response);
  return response.json(responseBody);
}

export { errorMiddleWare };
