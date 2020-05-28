import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
    ERROR_CODE_TYPE_NOT_EXISTS,
    ERROR_CODE_TYPE_WITH_NAME_RU_EXISTS,
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";
import {Types} from "./TypesModel";

interface IRestTypesCreate {
    name_ru: string;
    name_kz: string;
}

interface IRestTypesList {
    offset?: number;
    count?: number;
}

interface IRestTypeByIdKeys {
    id: number;
}

export default new class TypesController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestTypesCreate>rest.getBody();

            if (!bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NAME_RU')
                });
            } else if (!bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NAME_KZ')
                });
            }

            const Type = new Types;
            Type.name_ru = bodyParams.name_ru;
            Type.name_kz = bodyParams.name_kz;


            const existType = await getManager().getRepository(Types).findOne({
                where: [{
                    name_ru: bodyParams.name_ru
                }, {
                    name_kz: bodyParams.name_kz
                }]
            });

            if (existType && existType.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_TYPE_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_TYPE_WITH_NAME_RU_EXISTS,
                    message: req.__('EXISTS_ALREADY_NAME_RU')
                });
            } else if (existType && existType.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_TYPE_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_TYPE_WITH_NAME_RU_EXISTS,
                    message: req.__('EXISTS_ALREADY_NAME_KZ')
                });
            }

            const type = await getManager().getRepository(Types).save(Type);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: type.id,
                    name_kz: type.name_kz,
                    name_ru: type.name_ru
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

    async getTypesList(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestTypesList = <IRestTypesList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz'];

            const types = await getManager().getRepository(Types).find(config);
            const totalCount = await getManager().getRepository(Types).count();

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: types,
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

    async getTypeById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const config = <FindManyOptions<Types>>{};
            const {id} = <IRestTypeByIdKeys>rest.getKeys();

            config.select = ['id', 'name_ru', 'name_kz'];
            config.where = {id};

            const type = await getManager().getRepository(Types).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: type,
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

            const type = await getManager().getRepository(Types).findOne({
                where: {
                    id
                }
            });

            if (!type) {
                return res.send({
                    code: 'ERROR_CODE_TYPE_NOT_EXISTS',
                    errorCode: ERROR_CODE_TYPE_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
                });
            }
            await getManager().getRepository(Types).remove(type);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }
}
