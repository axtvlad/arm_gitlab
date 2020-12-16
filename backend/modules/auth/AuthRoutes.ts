import {Request, Response, Router} from "express";
import moment from "moment";
import AuthController from "./AuthController";
import reqAuthSecurity from "../../bin/middleware/basicAuth";

const AuthRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/auth/*
 */
AuthRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Auth:`, req.originalUrl);
    next();
});

AuthRoutes.post('/login', AuthController.login);
AuthRoutes.get(`/token`, reqAuthSecurity, AuthController.token);
AuthRoutes.delete(`/logout`, reqAuthSecurity, AuthController.logout);

/**
 * Error All Request to URL: /rest/api/auth/*
 */
AuthRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Auth method'
    });
});

export default AuthRoutes;
