import express, { Application, Request, Response } from 'express';
import cors from "cors"; 

import { readFileSync } from "fs";
import { join } from "path";
import { config } from 'dotenv';
import { createLanguageModel, createJsonTranslator, processRequests, Result } from "typechat";
import { TrxTypeResponse } from './trxTypeSchema';

import { Query } from 'express-serve-static-core';

export interface TypedRequestQuery<T extends Query> extends Express.Request {
     query: T
}

const app: Application = express();
const port: number = 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cors());
config({ path: join(__dirname, "./.env") });

const model = createLanguageModel(process.env);
const schema = readFileSync(join(__dirname, "trxTypeSchema.ts"), "utf-8");
const translator = createJsonTranslator<TrxTypeResponse>(model, schema, "TrxTypeResponse");

app.get('/', (req: Request, res: Response): void => {
    req.params;
    res.json({'message':'message from server'});
});

app.get('/api/:trxTypeCommand', (req: TypedRequestQuery<{ trxTypeCommand: string }>, res: Response): void => {
    const trxTypeCommand = req.query.trxTypeCommand;
    console.log('command: ' + trxTypeCommand);
    const result = translator.translate(trxTypeCommand);
    result.then((value) => {
        console.log(value);
        res.json(value);
    });
    
    result.catch((reason) => {
        console.log(reason);
        res.json(reason);
    });

});

app.listen(port, (): void => {
    console.log(`⚡️[server]: Server is running on port 4000`);
});