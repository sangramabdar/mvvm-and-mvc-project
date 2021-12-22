import { Request, Response } from "express";
import AppService from "./app.service";

class RootController {
  private static appService: AppService = new AppService();

  static async get(req: Request, res: Response) {
    const result = await RootController.appService.getApp();
    return res.send(result);
  }

  static async wrongRoute(req: Request, res: Response) {
    return res.redirect("/");
  }
}

export default RootController;
