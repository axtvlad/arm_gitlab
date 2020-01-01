import {Request, Response, Router} from "express";
import moment from "moment";
import RolesController from "./RolesController";

const RolesRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
RolesRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Roles:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
RolesRoutes.get('/rest/api/getRoles', RolesController.list);
RolesRoutes.post('/rest/api/createRole', RolesController.create);
RolesRoutes.delete(`/rest/api/deleteRole/:id`, RolesController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
RolesRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Roles method'
    });
});

export default RolesRoutes;
