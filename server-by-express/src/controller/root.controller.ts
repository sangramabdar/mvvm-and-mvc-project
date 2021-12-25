import { Request, Response } from "express";
import RootService from "../service/root.service";

class RootController {
  private static appService: RootService = new RootService();

  static async get(req: Request, res: Response) {
    const result = await RootController.appService.getApp();
    return res.send(result);
  }

  static async wrongRoute(req: Request, res: Response) {
    return res.redirect("/");
  }
}

export default RootController;
