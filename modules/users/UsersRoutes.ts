import {Request, Response, Router} from "express";
import moment from "moment";
import UsersController from "./UsersController";

const UsersRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
UsersRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Users:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
UsersRoutes.get('/', UsersController.list);
UsersRoutes.get('/testCreate', UsersController.testCreate);
UsersRoutes.post(`/`, UsersController.create);
UsersRoutes.delete(`/:userId`, UsersController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
UsersRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Users method'
    });
});

export default UsersRoutes;
