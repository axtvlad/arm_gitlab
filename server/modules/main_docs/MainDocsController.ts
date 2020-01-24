import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {MainDocs} from "./MainDocsModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_MAIN_DOC_NOT_EXISTS,
    ERROR_CODE_MAIN_DOC_WITH_HEADER_RU_EXISTS,
    ERROR_CODE_MAIN_DOC_WITH_NAME_RU_EXISTS,
    ERROR_CODE_MAIN_DOC_WITH_NUMBER_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";

interface IRestMainDocsCreate {
    number: string;
    department_id: number;
    status_id?: number;
    begin_date?: Date;
    finish_date?: Date;
    pub_date?: Date;
    name_ru: string;
    name_kz?: string;
    header_ru: string;
    header_kz?: string;
    file_ru: string;
    file_kz?: string;
    description_id?: number;
    type_id: number;
    text_ru?: string;
    text_kz?: string;
}

interface IRestMainDocsList {
    offset?: number;
    count?: number;
    lang?: string;
}

export default new class MainDocsController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestMainDocsCreate>rest.getBody();

            if (!bodyParams.number) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NUMBER',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NUMBER')
                });
            } else if (!bodyParams.department_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_DEPARTMENT_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_DEPARTMENT_ID')
                });
            } else if (!bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NAME_RU')
                });
            } else if (!bodyParams.header_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_HEADER_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_HEADER_RU')
                });
            } else if (!bodyParams.file_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_FILE_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_FILE_RU')
                });
            } else if (!bodyParams.type_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_TYPE_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_TYPE_ID')
                });
            }

            const MainDoc = new MainDocs;

            MainDoc.number = bodyParams.number;
            MainDoc.department_id = bodyParams.department_id;
            MainDoc.name_ru = bodyParams.name_ru;
            MainDoc.header_ru = bodyParams.header_ru;
            MainDoc.file_ru = bodyParams.file_ru;
            MainDoc.type_id = bodyParams.type_id;

            if (bodyParams.status_id) {
                MainDoc.status_id = bodyParams.status_id;
            } else if (bodyParams.begin_date) {
                MainDoc.begin_date = bodyParams.begin_date;
            } else if (bodyParams.finish_date) {
                MainDoc.finish_date = bodyParams.finish_date;
            } else if (bodyParams.pub_date) {
                MainDoc.pub_date = bodyParams.pub_date;
            } else if (bodyParams.status_id) {
                MainDoc.status_id = bodyParams.status_id;
            } else if (bodyParams.name_kz) {
                MainDoc.name_kz = bodyParams.name_kz;
            } else if (bodyParams.header_kz) {
                MainDoc.header_kz = bodyParams.header_kz;
            } else if (bodyParams.file_kz) {
                MainDoc.file_kz = bodyParams.file_kz;
            } else if (bodyParams.description_id) {
                MainDoc.description_id = bodyParams.description_id;
            } else if (bodyParams.text_ru) {
                MainDoc.text_ru = bodyParams.text_ru;
            } else if (bodyParams.text_kz) {
                MainDoc.text_kz = bodyParams.text_kz;
            }

            const existMainDoc = await getManager().getRepository(MainDocs).findOne({
                where: [{
                    number: bodyParams.number
                }, {
                    name_ru: bodyParams.name_ru
                }, {
                    header_ru: bodyParams.header_ru
                }]
            });

            if (existMainDoc && existMainDoc.number === bodyParams.number) {
                return res.status(400).send({
                    code: 'ERROR_CODE_MAIN_DOC_WITH_NUMBER_EXISTS',
                    errorCode: ERROR_CODE_MAIN_DOC_WITH_NUMBER_EXISTS,
                    message: req.__('EXISTS_ALREADY_NUMBER')
                });
            } else if (existMainDoc && existMainDoc.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_MAIN_DOC_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_MAIN_DOC_WITH_NAME_RU_EXISTS,
                    message: req.__('EXISTS_ALREADY_NAME_RU')
                });
            } else if (existMainDoc && existMainDoc.header_ru === bodyParams.header_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_MAIN_DOC_WITH_HEADER_RU_EXISTS',
                    errorCode: ERROR_CODE_MAIN_DOC_WITH_HEADER_RU_EXISTS,
                    message: req.__('EXISTS_ALREADY_HEADER_RU')
                });
            }

            const mainDoc = await getManager().getRepository(MainDocs).save(MainDoc);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: mainDoc.id,
                    number: mainDoc.number,
                    department_id: mainDoc.department_id,
                    status_id: mainDoc.status_id,
                    begin_date: mainDoc.begin_date,
                    finish_date: mainDoc.finish_date,
                    pub_date: mainDoc.pub_date,
                    name_ru: mainDoc.name_ru,
                    name_kz: mainDoc.name_kz,
                    header_ru: mainDoc.header_ru,
                    header_kz: mainDoc.header_kz,
                    file_ru: mainDoc.file_ru,
                    file_kz: mainDoc.file_kz,
                    description_id: mainDoc.description_id,
                    type_id: mainDoc.type_id,
                    text_ru: mainDoc.text_ru,
                    text_kz: mainDoc.text_kz
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

    async list(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestMainDocsList = <IRestMainDocsList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = [
                "id", "number", "department_id", "status_id", "begin_date", "finish_date", "pub_date",
                "name_ru", "name_kz", "file_ru", "file_kz", "header_ru", "header_kz", "description_id",
                "type_id", "text_ru", "text_kz"];

            const mainDocs = await getManager().getRepository(MainDocs).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: mainDocs,
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

            const mainDocs = await getManager().getRepository(MainDocs).findOne({
                where: {
                    id
                }
            });

            if (!mainDocs) {
                return res.send({
                    code: 'ERROR_CODE_MAIN_DOC_NOT_EXISTS',
                    errorCode: ERROR_CODE_MAIN_DOC_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
                });
            }
            await getManager().getRepository(MainDocs).remove(mainDocs);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }
}
