import AppService from "./app.service";

class AppController {
  static async get(req, res) {
    const result = await AppService.getApp();
    return res.send(result);
  }
}

export default AppController;
