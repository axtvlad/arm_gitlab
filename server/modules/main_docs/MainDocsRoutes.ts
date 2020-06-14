import {Request, Response, Router} from "express";
import moment from "moment";
import MainDocsController from "./MainDocsController";

const MainDocsRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
MainDocsRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module MainDocs:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
MainDocsRoutes.get('/', MainDocsController.getMainDocsList);
MainDocsRoutes.get('/:id', MainDocsController.getMainDocById);
MainDocsRoutes.post('/', MainDocsController.create);
MainDocsRoutes.delete(`/:id`, MainDocsController.remove);
MainDocsRoutes.post(`/search`, MainDocsController.search);

/**
 * Error All Request to URL: /rest/api/users/*
 */
MainDocsRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for MainDocs method'
    });
});

export default MainDocsRoutes;
