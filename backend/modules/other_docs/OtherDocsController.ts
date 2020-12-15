import {Request, Response} from "express";
import {FindManyOptions, getConnection, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {OtherDocs} from "./OtherDocsModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NONE,
    ERROR_CODE_OTHER_DOC_NOT_EXISTS,
    ERROR_CODE_OTHER_DOC_WITH_NAME_RU_EXISTS,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";

interface IRestOtherDocsCreate {
    name_ru: string;
    name_kz?: string;
    file_ru: string;
    file_kz?: string;
}

interface IRestOtherDocsUpdate {
    name_ru: string;
    name_kz?: string;
    file_ru: string;
    file_kz?: string;
}

interface IRestOtherDocsList {
    offset?: number;
    count?: number;
}

interface IRestOtherDocByIdKeys {
    id: number;
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
                    message: req.__('PASSED_PARAM_NAME_RU')
                });
            } else if (!bodyParams.file_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_FILE_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_FILE_RU')
                });
            }

            const OtherDoc = new OtherDocs;

            OtherDoc.name_ru = bodyParams.name_ru;
            OtherDoc.file_ru = bodyParams.file_ru;

            if (bodyParams.name_kz) {
                OtherDoc.name_kz = bodyParams.name_kz;
            }
            if (bodyParams.file_kz) {
                OtherDoc.file_kz = bodyParams.file_kz;
            }

            const existOtherDoc = await getManager().getRepository(OtherDocs).findOne({
                where: [{
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existOtherDoc && existOtherDoc.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_OTHER_DOC_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_OTHER_DOC_WITH_NAME_RU_EXISTS,
                    message: req.__('EXISTS_ALREADY_NAME_RU')
                });
            }

            const otherDoc = await getManager().getRepository(OtherDocs).save(OtherDoc);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: otherDoc.id,
                    name_ru: otherDoc.name_ru,
                    name_kz: OtherDoc.name_kz,
                    file_ru: OtherDoc.file_ru,
                    file_kz: OtherDoc.file_kz
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

    async getOtherDocsList(req: Request, res: Response) {
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

            config.select = ['id', 'name_ru', 'name_kz', 'file_ru', 'file_kz'];

            const otherDocs = await getManager().getRepository(OtherDocs).find(config);
            const totalCount = await getManager().getRepository(OtherDocs).count();

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: otherDocs,
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

    async getOtherDocById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const config = <FindManyOptions<OtherDocs>>{};
            const {id} = <IRestOtherDocByIdKeys>rest.getKeys();

            config.select = ['id', 'name_ru', 'name_kz', 'file_ru', 'file_kz'];
            config.where = {id};

            const otherDoc = await getManager().getRepository(OtherDocs).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: otherDoc[0],
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

            const otherDoc = await getManager().getRepository(OtherDocs).findOne({
                where: {
                    id
                }
            });

            if (!otherDoc) {
                return res.send({
                    code: 'ERROR_CODE_OTHER_DOC_NOT_EXISTS',
                    errorCode: ERROR_CODE_OTHER_DOC_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
                });
            }
            await getManager().getRepository(OtherDocs).remove(otherDoc);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: otherDoc,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }

    async update(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestOtherDocsUpdate>rest.getBody();
            const config = <FindManyOptions<OtherDocs>>{};
            const {id} = <IRestOtherDocByIdKeys>rest.getKeys();

            await getConnection()
                .createQueryBuilder()
                .update(OtherDocs)
                .set(bodyParams)
                .where("id = :id", {id: id})
                .execute();

            config.select = ["id", "name_ru", "name_kz", "file_ru", "file_kz"];
            config.where = {id};

            const updatedOtherDoc = await getManager().getRepository(OtherDocs).find(config);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: updatedOtherDoc[0],
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
