import {Request, Response, Router} from "express";
import moment from "moment";
import DescriptionsController from "./DescriptionsController";

const DescriptionsRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
DescriptionsRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Descriptions:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
DescriptionsRoutes.get('/', DescriptionsController.list);
DescriptionsRoutes.post('/', DescriptionsController.create);
DescriptionsRoutes.delete(`/:id`, DescriptionsController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
DescriptionsRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Descriptions method'
    });
});

export default DescriptionsRoutes;
