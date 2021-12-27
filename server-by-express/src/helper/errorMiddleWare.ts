import ResponseBuilder from "./result";
import { statusCodeHandler } from "./validation";

async function errorMiddleWare(error, httpRequest, httpResponse, next) {
  let responseBody = new ResponseBuilder<string>(error.message);
  statusCodeHandler(error, responseBody, httpResponse);
  return httpResponse.json(responseBody);
}

export { errorMiddleWare };
