import {Router} from "express";
import CitiesRoutes from "../../modules/cities/CitiesRoutes";
import CategoriesRoutes from "../../modules/categories/CategoriesRoutes";
import CustomersRoutes from "../../modules/customers/CustomersRoutes";
import DepartmentsRoutes from "../../modules/departments/DepartmentsRoutes";
import FaqsRoutes from "../../modules/faqs/FaqsRoutes";
import RolesRoutes from "../../modules/roles/RolesRoutes";
import StatusesRoutes from "../../modules/statuses/StatusesRoutes";
import UsersRoutes from "../../modules/users/UsersRoutes";
import DescriptionsRoutes from "../../modules/descriptions/DescriptionsRoutes";
import GendersRoutes from "../../modules/genders/GendersRoutes";
import TypesRoutes from "../../modules/types/TypesRoutes";
import TemplatesRoutes from "../../modules/templates/TemplatesRoutes";
import OtherDocsRoutes from "../../modules/other_docs/OtherDocsRoutes";
import MainDocsRoutes from "../../modules/main_docs/MainDocsRoutes";
import LocalesRoutes from "../../modules/locales/LocalesRoutes";

const routesRestApi = Router();

routesRestApi.use('/cities', CitiesRoutes);
routesRestApi.use('/categories', CategoriesRoutes);
routesRestApi.use('/customers', CustomersRoutes);
routesRestApi.use('/departments', DepartmentsRoutes);
routesRestApi.use('/faqs', FaqsRoutes);
routesRestApi.use('/roles', RolesRoutes);
routesRestApi.use('/statuses', StatusesRoutes);
routesRestApi.use('/users', UsersRoutes);
routesRestApi.use('/descriptions', DescriptionsRoutes);
routesRestApi.use('/genders', GendersRoutes);
routesRestApi.use('/types', TypesRoutes);
routesRestApi.use('/templates', TemplatesRoutes);
routesRestApi.use('/otherDocs', OtherDocsRoutes);
routesRestApi.use('/mainDocs', MainDocsRoutes);
routesRestApi.use('/locales', LocalesRoutes);

const RoutesRestApi = routesRestApi;
export default RoutesRestApi;
