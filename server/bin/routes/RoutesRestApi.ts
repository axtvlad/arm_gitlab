import {Router} from "express";
import CitiesRoutes from "../../modules/cities/CitiesRoutes";
import CategoriesRoutes from "../../modules/categories/CategoriesRoutes";
import CustomersRoutes from "../../modules/customers/CustomersRoutes";
import DepartmentsRoutes from "../../modules/departments/DepartmentsRoutes";
import FaqsRoutes from "../../modules/faqs/FaqsRoutes";
import RolesRoutes from "../../modules/roles/RolesRoutes";
import StatusesRoutes from "../../modules/statuses/StatusesRoutes";
import UsersRoutes from "../../modules/users/UsersRoutes";
import GendersRoutes from "../../modules/genders/GendersRoutes";
import TypesRoutes from "../../modules/types/TypesRoutes";
import TemplatesRoutes from "../../modules/templates/TemplatesRoutes";
import OtherDocsRoutes from "../../modules/other_docs/OtherDocsRoutes";
import MainDocsRoutes from "../../modules/main_docs/MainDocsRoutes";
import reqAuthSecurity from "../middleware/basicAuth";

const routesRestApi = Router();

routesRestApi.use('/cities', reqAuthSecurity, CitiesRoutes);
routesRestApi.use('/categories', reqAuthSecurity, CategoriesRoutes);
routesRestApi.use('/customers', reqAuthSecurity, CustomersRoutes);
routesRestApi.use('/departments', reqAuthSecurity, DepartmentsRoutes);
routesRestApi.use('/faqs', reqAuthSecurity, FaqsRoutes);
routesRestApi.use('/roles', reqAuthSecurity, RolesRoutes);
routesRestApi.use('/statuses', reqAuthSecurity, StatusesRoutes);
routesRestApi.use('/users', reqAuthSecurity, UsersRoutes);
routesRestApi.use('/genders', reqAuthSecurity, GendersRoutes);
routesRestApi.use('/types', reqAuthSecurity, TypesRoutes);
routesRestApi.use('/templates', reqAuthSecurity, TemplatesRoutes);
routesRestApi.use('/otherDocs', reqAuthSecurity, OtherDocsRoutes);
routesRestApi.use('/mainDocs', reqAuthSecurity, MainDocsRoutes);

const RoutesRestApi = routesRestApi;

export default RoutesRestApi;
