import {Request, Response, Router} from "express";
import moment from "moment";
import CitiesController from "./CitiesController";

const CitiesRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
CitiesRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Cities:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
CitiesRoutes.get('/', CitiesController.list);
CitiesRoutes.post('/', CitiesController.create);
CitiesRoutes.delete(`/:id`, CitiesController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
CitiesRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Cities method'
    });
});

export default CitiesRoutes;
