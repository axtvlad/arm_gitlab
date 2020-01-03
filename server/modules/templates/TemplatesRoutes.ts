import {Request, Response, Router} from "express";
import moment from "moment";
import TemplatesController from "./TemplatesController";

const TemplatesRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
TemplatesRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Templates:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
TemplatesRoutes.get('/', TemplatesController.list);
TemplatesRoutes.post('/', TemplatesController.create);
TemplatesRoutes.delete(`/:id`, TemplatesController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
TemplatesRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Templates method'
    });
});

export default TemplatesRoutes;
