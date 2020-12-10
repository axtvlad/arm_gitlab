import {Request, Response} from "express";
import {FindManyOptions, getConnection, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Roles} from "./RolesModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
    ERROR_CODE_ROLE_NOT_EXISTS,
    ERROR_CODE_ROLE_WITH_NAME_KZ_EXISTS,
    ERROR_CODE_ROLE_WITH_NAME_RU_EXISTS,
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";

interface IRestRolesCreate {
    name_ru: string;
    name_kz: string;
}

interface IRestRolesUpdate {
    name_ru: string;
    name_kz: string;
}

interface IRestRolesList {
    offset?: number;
    count?: number;
}

interface IRestRoleByIdKeys {
    id: number;
}

export default new class RolesController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestRolesCreate>rest.getBody();

            if (!bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NAME_RU')
                });
            } else if (!bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_KZ',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NAME_KZ')
                });
            }

            const Role = new Roles;

            Role.name_kz = bodyParams.name_kz;
            Role.name_ru = bodyParams.name_ru;

            const existRole = await getManager().getRepository(Roles).findOne({
                where: [{
                    name_kz: bodyParams.name_kz
                }, {
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existRole && existRole.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_ROLE_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_ROLE_WITH_NAME_KZ_EXISTS,
                    message: req.__('EXIST_ALREADY_NAME_KZ')
                });
            } else if (existRole && existRole.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_ROLE_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_ROLE_WITH_NAME_RU_EXISTS,
                    message: req.__('EXIST_ALREADY_NAME_RU')
                });
            }

            const role = await getManager().getRepository(Roles).save(Role);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: role.id,
                    name_kz: role.name_kz,
                    name_ru: role.name_ru
                },
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: req.__('UNKNOWN_ERROR')
            });
        }
    }

    async getRolesList(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestRolesList = <IRestRolesList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz'];

            const roles = await getManager().getRepository(Roles).find(config);
            const totalCount = await getManager().getRepository(Roles).count();

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: roles,
                totalCount,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: req.__('UNKNOWN_ERROR')
            });
        }
    }

    async getRoleDocById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const config = <FindManyOptions<Roles>>{};
            const {id} = <IRestRoleByIdKeys>rest.getKeys();

            config.select = ['id', 'name_ru', 'name_kz'];
            config.where = {id};

            const role = await getManager().getRepository(Roles).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: role,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: req.__('UNKNOWN_ERROR')
            });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const role = await getManager().getRepository(Roles).findOne({
                where: {
                    id
                }
            });

            if (!role) {
                return res.send({
                    code: 'ERROR_CODE_ROLE_NOT_EXISTS',
                    errorCode: ERROR_CODE_ROLE_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
                });
            }
            await getManager().getRepository(Roles).remove(role);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }

    async update(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestRolesUpdate>rest.getBody();
            const config = <FindManyOptions<Roles>>{};
            const {id} = <IRestRoleByIdKeys>rest.getKeys();

            await getConnection()
                .createQueryBuilder()
                .update(Roles)
                .set(bodyParams)
                .where("id = :id", {id: id})
                .execute();

            config.select = ["id", "name_ru", "name_kz"];
            config.where = {id};

            const updatedRole = await getManager().getRepository(Roles).find(config);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: updatedRole[0],
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: req.__('UNKNOWN_ERROR')
            });
        }
    }
}
