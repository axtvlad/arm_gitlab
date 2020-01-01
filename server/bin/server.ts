import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import "reflect-metadata";
import {createConnection} from "typeorm";
import CitiesRoutes from "../modules/cities/CitiesRoutes";
import CategoriesRoutes from "../modules/categories/CategoriesRoutes";
import CustomersRoutes from "../modules/customers/CustomersRoutes";
import DepartmentsRoutes from "../modules/departments/DepartmentsRoutes";
import FaqsRoutes from "../modules/faqs/FaqsRoutes";
import RolesRoutes from "../modules/roles/RolesRoutes";
import StatusesRoutes from "../modules/statuses/StatusesRoutes";
import UsersRoutes from "../modules/users/UsersRoutes";

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
app.use('/rest/api/cities', CitiesRoutes);
app.use('/rest/api/categories', CategoriesRoutes);
app.use('/rest/api/customers', CustomersRoutes);
app.use('/rest/api/departments', DepartmentsRoutes);
app.use('/rest/api/faqs', FaqsRoutes);
app.use('/rest/api/roles', RolesRoutes);
app.use('/rest/api/statuses', StatusesRoutes);
app.use('/rest/api/users', UsersRoutes);

app.get('*', (req: Request, res: Response) => {
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
