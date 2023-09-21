import { Router } from "express";
import { getTrxType } from "../controllers/trxtype.controller";

class TrxTypeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", getTrxType);
  }
}

export default new TrxTypeRoutes().router;