import express, { Application, Request, Response } from 'express';
import cors from "cors"; 

const app: Application = express();
const port: number = 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cors);

app.get('/', (req: Request, res: Response): void => {
    res.json({'message':'message from server'});
});

app.listen(port, (): void => {
    console.log(`⚡️[server]: Server is running on port 4000`);
});