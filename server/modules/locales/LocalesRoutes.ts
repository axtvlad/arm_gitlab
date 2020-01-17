import {Request, Response, Router} from "express";
import moment from "moment";
import LocalesController from "./LocalesController";

const LocalesRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
LocalesRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Locales:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
LocalesRoutes.get('/', LocalesController.list);
LocalesRoutes.post('/', LocalesController.create);
LocalesRoutes.delete(`/:id`, LocalesController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
LocalesRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Locales method'
    });
});

export default LocalesRoutes;
