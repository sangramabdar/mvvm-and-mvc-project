import { initServer, app } from "./config/initserver";

initServer().then(_ => {
  app.listen(8080);
});
