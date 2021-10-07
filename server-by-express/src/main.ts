import { initServer, app } from "./config/initserver";

initServer().then(r => {
  app.listen(8080);
});
