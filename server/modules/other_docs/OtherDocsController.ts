import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {OtherDocs} from "./OtherDocsModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NONE,
    ERROR_CODE_OTHER_DOC_NOT_EXISTS,
    ERROR_CODE_OTHER_DOC_WITH_F_NAME_KZ_EXISTS,
    ERROR_CODE_OTHER_DOC_WITH_F_NAME_RU_EXISTS,
    ERROR_CODE_OTHER_DOC_WITH_NAME_KZ_EXISTS,
    ERROR_CODE_OTHER_DOC_WITH_NAME_RU_EXISTS,
    ERROR_CODE_PARAMETER_NOT_PASSED,
    ERROR_MESSAGE_OK,
} from '../../services/ServiceRestCodes';

interface IRestOtherDocsCreate {
    name_ru: string;
    name_kz: string;
    path: string;
    f_name_kz: string;
    f_name_ru: string;
}

interface IRestOtherDocsList {
    offset?: number;
    count?: number;
}

export default new class OtherDocsController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestOtherDocsCreate>rest.getBody();

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

            const OtherDoc = new OtherDocs;
            OtherDoc.name_kz = bodyParams.name_kz;
            OtherDoc.name_ru = bodyParams.name_ru;
            OtherDoc.path = bodyParams.path;
            OtherDoc.f_name_kz = bodyParams.f_name_kz;
            OtherDoc.f_name_ru = bodyParams.f_name_ru;

            const existOtherDoc = await getManager().getRepository(OtherDocs).findOne({
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

            if (existOtherDoc && existOtherDoc.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_OTHER_DOC_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_OTHER_DOC_WITH_NAME_KZ_EXISTS,
                    message: 'A other_doc with that name_kz already exists.'
                });
            } else if (existOtherDoc && existOtherDoc.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_OTHER_DOC_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_OTHER_DOC_WITH_NAME_RU_EXISTS,
                    message: 'A other_doc with that name_ru already exists.'
                });
            } else if (existOtherDoc && existOtherDoc.f_name_ru === bodyParams.f_name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_OTHER_DOC_WITH_F_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_OTHER_DOC_WITH_F_NAME_RU_EXISTS,
                    message: 'A other_doc with that f_name_ru already exists.'
                });
            } else if (existOtherDoc && existOtherDoc.f_name_kz === bodyParams.f_name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_OTHER_DOC_WITH_F_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_OTHER_DOC_WITH_F_NAME_KZ_EXISTS,
                    message: 'A other_doc with that f_name_kz already exists.'
                });
            }

            const otherDoc = await getManager().getRepository(OtherDocs).save(OtherDoc);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: otherDoc.id,
                    name_kz: otherDoc.name_kz,
                    name_ru: otherDoc.name_ru,
                    path: otherDoc.path,
                    f_name_kz: otherDoc.f_name_kz,
                    f_name_ru: otherDoc.f_name_ru
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
            const queryParams: IRestOtherDocsList = <IRestOtherDocsList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz', 'path', 'f_name_kz', 'f_name_ru'];

            const otherDocs = await getManager().getRepository(OtherDocs).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: otherDocs,
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

            const otherDocs = await getManager().getRepository(OtherDocs).findOne({
                where: {
                    id
                }
            });

            if (!otherDocs) {
                return res.send({
                    code: 'ERROR_CODE_OTHER_DOC_NOT_EXISTS',
                    errorCode: ERROR_CODE_OTHER_DOC_NOT_EXISTS,
                    message: `Other_doc by id ${id} is not exists`
                });
            }
            await getManager().getRepository(OtherDocs).remove(otherDocs);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: ERROR_MESSAGE_OK
            });
        } catch (err) {

        }
    }
}
