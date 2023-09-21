import { Request, Response } from "express";

import { readFileSync } from "fs";
import { join } from "path";
import { createLanguageModel, createJsonTranslator, processRequests, Result } from "typechat";
import { TrxTypeResponse } from '../schemas/trxTypeSchema';
import { config } from "dotenv";
import { Query } from 'express-serve-static-core';

export interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T
}

config({ path: join(__dirname, "../.env") });
const model = createLanguageModel(process.env);
const schema = readFileSync(join(__dirname, "../schemas/trxTypeSchema.ts"), "utf-8");
const translator = createJsonTranslator<TrxTypeResponse>(model, schema, "TrxTypeResponse");

export function getTrxType(req: TypedRequestQuery<{ trxTypeCommand: string }>, res: Response): Response {
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

    return res;
}