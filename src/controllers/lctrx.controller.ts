import { Request, Response } from "express";

import { readFileSync } from "fs";
import { join } from "path";
import { createLanguageModel, createJsonTranslator, processRequests, Result } from "typechat";
import { LcTrxResponse } from '../schemas/lcTrxSchema';
import { config } from "dotenv";

config({ path: join(__dirname, "../.env") });
const model = createLanguageModel(process.env);
const schema = readFileSync(join(__dirname, "../schemas/lcTrxSchema.ts"), "utf-8");
const translator = createJsonTranslator<LcTrxResponse>(model, schema, "LcTrxResponse");

export function getLcTrx(req: Request, res: Response): Response {
    const userRequest = `The data is: \n` +
        JSON.stringify(req.body.data) + ` \n Update the above data according to the following information: ` + 
        req.body.command;

    console.log(userRequest);
    const result = translator.translate(userRequest);
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