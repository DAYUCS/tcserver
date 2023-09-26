import { Router } from "express";
import { getLcTrx } from "../controllers/lctrx.controller";

class LcTrxRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", getLcTrx);
  }
}

export default new LcTrxRoutes().router;