import {Request, Response, Router} from "express";
import moment from "moment";
import StatusesController from "./StatusesController";

const StatusesRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
StatusesRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Statuses:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
StatusesRoutes.get('/', StatusesController.getStatusesList);
StatusesRoutes.get('/:id', StatusesController.getStatusById);
StatusesRoutes.post('/', StatusesController.create);
StatusesRoutes.delete(`/:id`, StatusesController.remove);
StatusesRoutes.put(`/:id`, StatusesController.update);

/**
 * Error All Request to URL: /rest/api/users/*
 */
StatusesRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Statuses method'
    });
});

export default StatusesRoutes;
