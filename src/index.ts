import express, { Application, Request, Response } from 'express';
import cors from "cors"; 

import homeRouter from "./routes/home.routes";
import trxtypeRouter from "./routes/trxtype.routes";
import lctrxRouter from "./routes/lctrx.routes";

const app: Application = express();
const port: number = 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", homeRouter);
app.use("/api/trxType", trxtypeRouter);
app.use("/api/lcTrx", lctrxRouter);

app.listen(port, '0.0.0.0', (): void => {
    console.log(`⚡️[server]: Server is running on port 4000`);
});