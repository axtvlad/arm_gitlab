import {Request, Response, Router} from "express";
import moment from "moment";
import DepartmentsController from "./DepartmentsController";

const DepartmentsRoutes = Router();

/**
 * Logger All Request to URL: /rest/api/users/*
 */
DepartmentsRoutes.use((req: Request, res: Response, next: Function) => {
    const time: string = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${time}] API Module Departments:`, req.originalUrl);
    next();
});

/**
 * Routes to URL: /rest/api/users/*
 */
DepartmentsRoutes.get('/rest/api/getDepartments', DepartmentsController.list);
DepartmentsRoutes.post('/rest/api/createDepartment', DepartmentsController.create);
DepartmentsRoutes.delete(`/rest/api/deleteDepartment/:id`, DepartmentsController.remove);

/**
 * Error All Request to URL: /rest/api/users/*
 */
DepartmentsRoutes.use('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Request error for Departments method'
    });
});

export default DepartmentsRoutes;
