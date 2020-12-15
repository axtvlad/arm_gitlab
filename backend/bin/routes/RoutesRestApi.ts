import {Router} from "express";
import FaqsRoutes from "../../modules/faqs/FaqsRoutes";
import UsersRoutes from "../../modules/users/UsersRoutes";
import TemplatesRoutes from "../../modules/templates/TemplatesRoutes";
import OtherDocsRoutes from "../../modules/other_docs/OtherDocsRoutes";
import MainDocsRoutes from "../../modules/main_docs/MainDocsRoutes";
import reqAuthSecurity from "../middleware/basicAuth";
import AuthRoutes from "../../modules/auth/AuthRoutes";
import WorkPlanScheduleRoutes from "../../modules/work_plan_schedule/WorkPlanScheduleRoutes";
import DirectoryRoutes from "../../modules/Directories/DirectoryRoutes";

const routesRestApi = Router();

routesRestApi.use('/directory', reqAuthSecurity, DirectoryRoutes);
routesRestApi.use('/faqs', reqAuthSecurity, FaqsRoutes);
routesRestApi.use('/users', reqAuthSecurity, UsersRoutes);
routesRestApi.use('/templates', reqAuthSecurity, TemplatesRoutes);
routesRestApi.use('/otherDocs', reqAuthSecurity, OtherDocsRoutes);
routesRestApi.use('/mainDocs', reqAuthSecurity, MainDocsRoutes);
routesRestApi.use('/wps', reqAuthSecurity, WorkPlanScheduleRoutes);
routesRestApi.use('/auth', AuthRoutes);

const RoutesRestApi = routesRestApi;

export default RoutesRestApi;
