import {Request, Response, Router} from "express";
import moment from "moment";
import TypesController from "./TypesController";

const TypesRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
TypesRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Types:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
TypesRoutes.get('/', TypesController.getTypesList);
TypesRoutes.get('/:id', TypesController.getTypeById);
TypesRoutes.post('/', TypesController.create);
TypesRoutes.delete(`/:id`, TypesController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
TypesRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Types method'
    });
});

export default TypesRoutes;
