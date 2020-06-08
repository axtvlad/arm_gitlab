import {Request, Response, Router} from "express";
// @ts-ignore
import moment from "moment";
import WorkPlanScheduleController from "./WorkPlanScheduleController";

const WorkPlanScheduleRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
WorkPlanScheduleRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module WorkPlanSchedule:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
WorkPlanScheduleRoutes.get('/', WorkPlanScheduleController.getRupBySemester);
// MainDocsRoutes.get('/:semester', WorkPlanScheduleController.getMainDocsList);

/**
 * Error All Request to URL: /rest/api/users/*
 */
WorkPlanScheduleRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for MainDocs method'
    });
});

export default WorkPlanScheduleRoutes;