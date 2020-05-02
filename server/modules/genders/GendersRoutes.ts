import {Request, Response, Router} from "express";
import moment from "moment";
import GendersController from "./GendersController";

const GendersRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
GendersRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Genders:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
GendersRoutes.get('/', GendersController.getGendersList);
GendersRoutes.get('/:id', GendersController.getGenderById);
GendersRoutes.post('/', GendersController.create);
GendersRoutes.delete(`/:id`, GendersController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
GendersRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Genders method'
    });
});

export default GendersRoutes;
