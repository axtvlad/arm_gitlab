import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Descriptions} from "./DescriptionsModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_DESCRIPTION_NOT_EXISTS,
    ERROR_CODE_DESCRIPTION_WITH_F_NAME_KZ_EXISTS,
    ERROR_CODE_DESCRIPTION_WITH_F_NAME_RU_EXISTS,
    ERROR_CODE_DESCRIPTION_WITH_NAME_KZ_EXISTS,
    ERROR_CODE_DESCRIPTION_WITH_NAME_RU_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';

interface IRestDescriptionsCreate {
    name_ru: string;
    name_kz: string;
    path: string;
    f_name_kz: string;
    f_name_ru: string;
}

interface IRestDescriptionsList {
    offset?: number;
    count?: number;
}

export default new class DescriptionsController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestDescriptionsCreate>rest.getBody();

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
            } else if (!bodyParams.path) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_PATH',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Path parameter not passed'
                });
            } else if (!bodyParams.f_name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_F_NAME_KZ',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'F_name_kz parameter not passed'
                });
            } else if (!bodyParams.f_name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_F_NAME_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'F_name_ru parameter not passed'
                });
            }

            const Description = new Descriptions;
            Description.name_kz = bodyParams.name_kz;
            Description.name_ru = bodyParams.name_ru;
            Description.path = bodyParams.path;
            Description.f_name_kz = bodyParams.f_name_kz;
            Description.f_name_ru = bodyParams.f_name_ru;

            const existDescription = await getManager().getRepository(Descriptions).findOne({
                where: [{
                    name_kz: bodyParams.name_kz
                }, {
                    name_ru: bodyParams.name_ru
                }, {
                    f_name_ru: bodyParams.f_name_ru
                }, {
                    f_name_kz: bodyParams.f_name_kz
                }]
            });

            if (existDescription && existDescription.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_DESCRIPTION_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_DESCRIPTION_WITH_NAME_KZ_EXISTS,
                    message: 'A description with that name_kz already exists.'
                });
            } else if (existDescription && existDescription.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_DESCRIPTION_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_DESCRIPTION_WITH_NAME_RU_EXISTS,
                    message: 'A description with that name_ru already exists.'
                });
            } else if (existDescription && existDescription.f_name_ru === bodyParams.f_name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_DESCRIPTION_WITH_F_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_DESCRIPTION_WITH_F_NAME_RU_EXISTS,
                    message: 'A description with that f_name_ru already exists.'
                });
            } else if (existDescription && existDescription.f_name_kz === bodyParams.f_name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_DESCRIPTION_WITH_F_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_DESCRIPTION_WITH_F_NAME_KZ_EXISTS,
                    message: 'A description with that f_name_kz already exists.'
                });
            }

            const description = await getManager().getRepository(Descriptions).save(Description);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: description.id,
                    name_kz: description.name_kz,
                    name_ru: description.name_ru,
                    path: description.path,
                    f_name_kz: description.f_name_kz,
                    f_name_ru: description.f_name_ru
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
            const queryParams: IRestDescriptionsList = <IRestDescriptionsList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz', 'path', 'f_name_kz', 'f_name_ru'];

            const descriptions = await getManager().getRepository(Descriptions).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: descriptions,
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

            const description = await getManager().getRepository(Descriptions).findOne({
                where: {
                    id
                }
            });

            if (!description) {
                return res.send({
                    code: 'ERROR_CODE_DESCRIPTION_NOT_EXISTS',
                    errorCode: ERROR_CODE_DESCRIPTION_NOT_EXISTS,
                    message: `Description by id ${id} is not exists`
                });
            }
            await getManager().getRepository(Descriptions).remove(description);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }
}
