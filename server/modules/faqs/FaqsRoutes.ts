import {Request, Response, Router} from "express";
import moment from "moment";
import FaqsController from "./FaqsController";

const FaqsRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
FaqsRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module FAQs:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
FaqsRoutes.get('/', FaqsController.getFaqsList);
FaqsRoutes.get('/:id', FaqsController.getFaqById);
FaqsRoutes.post('/', FaqsController.create);
FaqsRoutes.delete(`/:id`, FaqsController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
FaqsRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for FAQs method'
    });
});

export default FaqsRoutes;
