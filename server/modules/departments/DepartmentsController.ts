import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Departments} from "./DepartmentsModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_DEPARTMENT_NOT_EXISTS,
    ERROR_CODE_DEPARTMENT_WITH_NAME_KZ_EXISTS,
    ERROR_CODE_DEPARTMENT_WITH_NAME_RU_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';

interface IRestDepartmentsCreate {
    name_ru: string;
    name_kz: string;
}

interface IRestDepartmentsList {
    offset?: number;
    count?: number;
}

export default new class DepartmentsController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestDepartmentsCreate>rest.getBody();

            if (!bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Name_ru parameter not passed`'
                });
            } else if (!bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_KZ',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Name_kz parameter not passed'
                });
            }

            const Department = new Departments;
            Department.name_kz = bodyParams.name_kz;
            Department.name_ru = bodyParams.name_ru;

            const existDepartment = await getManager().getRepository(Departments).findOne({
                where: [{
                    name_kz: bodyParams.name_kz
                }, {
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existDepartment && existDepartment.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_DEPARTMENT_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_DEPARTMENT_WITH_NAME_KZ_EXISTS,
                    message: 'A department with that name_kz already exists.'
                });
            } else if (existDepartment && existDepartment.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_DEPARTMENT_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_DEPARTMENT_WITH_NAME_RU_EXISTS,
                    message: 'A department with that name_ru already exists.'
                });
            }

            const department = await getManager().getRepository(Departments).save(Department);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: department.id,
                    name_kz: department.name_kz,
                    name_ru: department.name_ru
                },
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: 'An unknown error has occurred.'
            });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestDepartmentsList = <IRestDepartmentsList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz'];

            const departments = await getManager().getRepository(Departments).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: departments,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: 'An unknown error has occurred.'
            });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const department = await getManager().getRepository(Departments).findOne({
                where: {
                    id
                }
            });

            if (!department) {
                return res.send({
                    code: 'ERROR_CODE_DEPARTMENT_NOT_EXISTS',
                    errorCode: ERROR_CODE_DEPARTMENT_NOT_EXISTS,
                    message: `Department by id ${id} is not exists`
                });
            }
            await getManager().getRepository(Departments).remove(department);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }
}
