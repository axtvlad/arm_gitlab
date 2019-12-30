import {Request, Response, Router} from "express";
import moment from "moment";
import CityController from "./cityController";

const CityRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
CityRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Users:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
CityRoutes.post(`/`, CityController.create);

/**
 * Error All Request to URL: /rest/api/users/*
 */
CityRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Users method'
    });
});

export default CityRoutes;
