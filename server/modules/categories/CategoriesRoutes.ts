import {Request, Response, Router} from "express";
import moment from "moment";
import CategoriesController from "./CategoriesController";

const CategoriesRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
CategoriesRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Categories:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
CategoriesRoutes.get('/', CategoriesController.getCategoriesList);
CategoriesRoutes.get('/:id', CategoriesController.getCategoryById);
CategoriesRoutes.post('/', CategoriesController.create);
CategoriesRoutes.delete(`/:id`, CategoriesController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
CategoriesRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Categories method'
    });
});

export default CategoriesRoutes;
