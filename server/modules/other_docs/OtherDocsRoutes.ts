import {Request, Response, Router} from "express";
import moment from "moment";
import OtherDocsController from "./OtherDocsController";

const OtherDocsRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
OtherDocsRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module OtherDocs:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
OtherDocsRoutes.get('/', OtherDocsController.list);
OtherDocsRoutes.post('/', OtherDocsController.create);
OtherDocsRoutes.delete(`/:id`, OtherDocsController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
OtherDocsRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for OtherDocs method'
    });
});

export default OtherDocsRoutes;
