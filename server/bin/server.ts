import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import CityRoutes from "../modules/city/cityRoutes";
import "reflect-metadata";
import {createConnection} from "typeorm";

const cors = require('cors');

dotenv.config();

const app = express();
const port = +process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * Routes Rest API
 */
app.use('/rest/api/city', CityRoutes);

app.get('*',(req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Invalid request method'
    });
});

createConnection()
    .then(async connection => {
        app.listen(port, err => {
            if (err) {
                return console.error(err);
            }

            return console.log(`Application is listening on ${port}`);
        });
    })
    .catch(err => console.error("TypeORM connection error: ", err));
