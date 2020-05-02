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
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";
import {OtherDocs} from "../other_docs/OtherDocsModel";

interface IRestStatusesCreate {
    num: number;
    name_ru: string;
    name_kz: string;
}

interface IRestStatusesList {
    offset?: number;
    count?: number;
}

interface IRestStatusByIdKeys {
    id: number;
}

export default new class StatusesController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestStatusesCreate>rest.getBody();

            if (!bodyParams.num) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NUM',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NUM')
                });
            } else if (!bodyParams.name_ru) {
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

            const Status = new Statuses;

            Status.name_kz = bodyParams.name_kz;
            Status.name_ru = bodyParams.name_ru;

            const existStatus = await getManager().getRepository(Statuses).findOne({
                where: [{
                    num: bodyParams.num
                }, {
                    name_kz: bodyParams.name_kz
                }, {
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existStatus && existStatus.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_STATUS_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_STATUS_WITH_NAME_KZ_EXISTS,
                    message: req.__('EXIST_ALREADY_NAME_KZ')
                });
            } else if (existStatus && existStatus.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_STATUS_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_STATUS_WITH_NAME_RU_EXISTS,
                    message: req.__('EXIST_ALREADY_NAME_RU')
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

    async getStatusesList(req: Request, res: Response) {
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
            const totalCount = await getManager().getRepository(Statuses).count();

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: statuses,
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

    async getStatusById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const config = <FindManyOptions<Statuses>>{};
            const {id} = <IRestStatusByIdKeys>rest.getKeys();

            config.select = ['id', 'name_ru', 'name_kz'];
            config.where = {id};

            const status = await getManager().getRepository(OtherDocs).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: status,
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

            const status = await getManager().getRepository(Statuses).findOne({
                where: {
                    id
                }
            });

            if (!status) {
                return res.send({
                    code: 'ERROR_CODE_STATUS_NOT_EXISTS',
                    errorCode: ERROR_CODE_STATUS_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
                });
            }
            await getManager().getRepository(Statuses).remove(status);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }
}
