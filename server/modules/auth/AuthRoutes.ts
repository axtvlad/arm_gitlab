import {Request, Response, Router} from "express";
import moment from "moment";
import UsersController from "./AuthController";
import AuthController from "./AuthController";

const AuthRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
AuthRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Auth:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
AuthRoutes.post('/login', AuthController.login);
// AuthRoutes.delete(`/logout/:userId`, UsersController.logout);

/**
 * Error All Request to URL: /rest/api/users/*
 */
AuthRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Users method'
    });
});

export default AuthRoutes;
