import express, {Request, Response} from 'express';
import "reflect-metadata";
import {createConnection} from "typeorm";
import RoutesRestApi from "./routes/RoutesRestApi";

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = +process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * Routes REST API
 */
app.use(process.env.REST_API, RoutesRestApi);

app.get('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Invalid request method'
    });
});

createConnection()
    .then(async () => {
        app.listen(port, err => {
            if (err) {
                return console.error(err);
            }

            return console.log(`Application is listening on ${port}`);
        });
    })
    .catch(err => console.error("TypeORM connection error: ", err));
