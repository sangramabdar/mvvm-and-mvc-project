import AppService from "./app.service";

class AppController {
  private static appService: AppService = new AppService();

  static async get(req, res) {
    const result = await AppController.appService.getApp();
    return res.send(result);
  }
}

export default AppController;
