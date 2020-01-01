import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Statuses} from "./StatusesModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
    ERROR_CODE_STATUS_NOT_EXISTS,
    ERROR_CODE_STATUS_WITH_NAME_KZ_EXISTS,
    ERROR_CODE_STATUS_WITH_NAME_RU_EXISTS,
    ERROR_MESSAGE_OK,
} from '../../services/ServiceRestCodes';

interface IRestStatusesCreate {
    name_ru: string;
    name_kz: string;
}

interface IRestStatusesList {
    offset?: number;
    count?: number;
}

export default new class StatusesController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestStatusesCreate>rest.getBody();

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

            const Status = new Statuses;
            Status.name_kz = bodyParams.name_kz;
            Status.name_ru = bodyParams.name_ru;

            const existStatus = await getManager().getRepository(Statuses).findOne({
                where: [{
                    name_kz: bodyParams.name_kz
                }, {
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existStatus && existStatus.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_STATUS_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_STATUS_WITH_NAME_KZ_EXISTS,
                    message: 'A status with that name_kz already exists.'
                });
            } else if (existStatus && existStatus.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_STATUS_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_STATUS_WITH_NAME_RU_EXISTS,
                    message: 'A status with that name_ru already exists.'
                });
            }

            const status = await getManager().getRepository(Statuses).save(Status);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: status.id,
                    name_kz: status.name_kz,
                    name_ru: status.name_ru
                },
                message: ERROR_MESSAGE_OK
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
            const queryParams: IRestStatusesList = <IRestStatusesList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz'];

            const statuses = await getManager().getRepository(Statuses).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: statuses,
                message: ERROR_MESSAGE_OK
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

            const status = await getManager().getRepository(Statuses).findOne({
                where: {
                    id
                }
            });

            if (!status) {
                return res.send({
                    code: 'ERROR_CODE_STATUS_NOT_EXISTS',
                    errorCode: ERROR_CODE_STATUS_NOT_EXISTS,
                    message: `Status by id ${id} is not exists`
                });
            }
            await getManager().getRepository(Statuses).remove(status);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: ERROR_MESSAGE_OK
            });
        } catch (err) {

        }
    }
}
