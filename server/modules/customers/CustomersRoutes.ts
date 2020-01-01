import {Request, Response, Router} from "express";
import moment from "moment";
import CustomersController from "./CustomersController";

const CustomersRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
CustomersRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Customers:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
CustomersRoutes.get('/rest/api/getCustomers', CustomersController.list);
CustomersRoutes.post('/rest/api/createCustomer', CustomersController.create);
CustomersRoutes.delete(`/rest/api/deleteCustomer/:id`, CustomersController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
CustomersRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Customers method'
    });
});

export default CustomersRoutes;
