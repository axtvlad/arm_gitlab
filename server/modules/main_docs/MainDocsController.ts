import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {MainDocs} from "./MainDocsModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_MAIN_DOC_NOT_EXISTS,
    ERROR_CODE_MAIN_DOC_WITH_NAME_KZ_EXISTS,
    ERROR_CODE_MAIN_DOC_WITH_NAME_RU_EXISTS,
    ERROR_CODE_MAIN_DOC_WITH_NUMBER_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
    ERROR_MESSAGE_OK,
} from '../../services/ServiceRestCodes';

interface IRestMainDocsCreate {
    number: string;
    department_id: number;
    status_id: number;
    begin_date: Date;
    finish_date: Date;
    pub_date: Date;
    name_ru: string;
    name_kz: string;
    header_ru: string
    header_kz: string;
    text_ru?: string;
    text_kz?: string;
    path: string;
    f_name_kz: string;
    f_name_ru: string;
    description_id: number;
    type_id: number;
}

interface IRestMainDocsList {
    offset?: number;
    count?: number;
    lang?: string;
    loadData?: boolean;
}

export default new class MainDocsController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestMainDocsCreate>rest.getBody();

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
            } else if (!bodyParams.header_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_HEADER_KZ',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Header_kz parameter not passed'
                });
            } else if (!bodyParams.header_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_HEADER_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Header_ru parameter not passed'
                });
            } else if (!bodyParams.number) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NUMBER',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Number parameter not passed'
                });
            } else if (!bodyParams.department_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_DEPARTMENT_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Department_id parameter not passed'
                });
            } else if (!bodyParams.status_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_STATUS_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Status_id parameter not passed'
                });
            } else if (!bodyParams.begin_date) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_BEGIN_DATE',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Begin_date parameter not passed'
                });
            } else if (!bodyParams.finish_date) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_FINISH_DATE',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Finish_date parameter not passed'
                });
            } else if (!bodyParams.pub_date) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_PUB_DATE',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Pub_date parameter not passed'
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
            } else if (!bodyParams.description_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_DESCRIPTION_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Description_id parameter not passed'
                });
            } else if (!bodyParams.type_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_TYPE_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Type_id parameter not passed'
                });
            }

            const MainDoc = new MainDocs;
            MainDoc.number = bodyParams.number;
            MainDoc.department_id = bodyParams.department_id;
            MainDoc.status_id = bodyParams.status_id;
            MainDoc.begin_date = bodyParams.begin_date;
            MainDoc.finish_date = bodyParams.finish_date;
            MainDoc.pub_date = bodyParams.pub_date;
            MainDoc.name_kz = bodyParams.name_kz;
            MainDoc.name_ru = bodyParams.name_ru;
            MainDoc.path = bodyParams.path;
            MainDoc.f_name_kz = bodyParams.f_name_kz;
            MainDoc.f_name_ru = bodyParams.f_name_ru;
            MainDoc.description_id = bodyParams.description_id;
            MainDoc.type_id = bodyParams.type_id;

            if (bodyParams.text_ru) {
                MainDoc.text_ru = bodyParams.text_ru;
            } else if (bodyParams.text_kz) {
                MainDoc.text_kz = bodyParams.text_kz;
            }

            const existMainDoc = await getManager().getRepository(MainDocs).findOne({
                where: [{
                    name_kz: bodyParams.name_kz
                }, {
                    name_ru: bodyParams.name_ru
                }, {
                    number: bodyParams.number
                }]
            });

            if (existMainDoc && existMainDoc.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_MAIN_DOC_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_MAIN_DOC_WITH_NAME_KZ_EXISTS,
                    message: 'A main_doc with that name_kz already exists.'
                });
            } else if (existMainDoc && existMainDoc.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_MAIN_DOC_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_MAIN_DOC_WITH_NAME_RU_EXISTS,
                    message: 'A main_doc with that name_ru already exists.'
                });
            } else if (existMainDoc && existMainDoc.number === bodyParams.number) {
                return res.status(400).send({
                    code: 'ERROR_CODE_MAIN_DOC_WITH_NUMBER_EXISTS',
                    errorCode: ERROR_CODE_MAIN_DOC_WITH_NUMBER_EXISTS,
                    message: 'A main_doc with that number already exists.'
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
                    name_kz: mainDoc.name_kz,
                    name_ru: mainDoc.name_ru,
                    header_ru: mainDoc.header_ru,
                    header_kz: mainDoc.header_kz,
                    path: mainDoc.path,
                    f_name_kz: mainDoc.f_name_kz,
                    f_name_ru: mainDoc.f_name_ru,
                    description_id: mainDoc.description_id,
                    type_id: mainDoc.type_id,
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
            const queryParams: IRestMainDocsList = <IRestMainDocsList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            if (queryParams.loadData === true) {
                config.select = ['id', 'number', 'department_id', 'status_id', 'begin_date', 'finish_date',
                    'pub_date', 'name_ru', 'name_kz', 'header_ru', 'header_kz', 'text_ru', 'text_kz',
                    'path', 'f_name_kz', 'f_name_ru', 'description_id', 'type_id'];
            } else {
                config.select = ['id', 'number', 'department_id', 'name_ru', 'name_kz',
                    'path', 'f_name_kz', 'f_name_ru', 'description_id', 'type_id'];
            }

            if (queryParams.loadData === true && queryParams.lang === 'ru') {
                config.select = ['id', 'number', 'department_id', 'status_id', 'begin_date', 'finish_date', 'pub_date',
                    'name_ru', 'header_ru', 'text_ru', 'path', 'f_name_ru', 'description_id', 'type_id'];
            } else if (queryParams.loadData === true && queryParams.lang === 'kz') {
                config.select = ['id', 'number', 'department_id', 'status_id', 'begin_date', 'finish_date', 'pub_date',
                    'name_kz', 'header_kz', 'text_kz', 'path', 'f_name_kz', 'description_id', 'type_id'];
            } else if (queryParams.loadData === false && queryParams.lang === 'ru') {
                config.select = ['id', 'number', 'department_id', 'name_ru', 'path', 'f_name_ru',
                    'description_id', 'type_id'];
            } else if (queryParams.loadData === false && queryParams.lang === 'kz') {
                config.select = ['id', 'number', 'department_id', 'name_kz', 'path', 'f_name_kz',
                    'description_id', 'type_id'];
            }
            const mainDocs = await getManager().getRepository(MainDocs).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: mainDocs,
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

            const mainDocs = await getManager().getRepository(MainDocs).findOne({
                where: {
                    id
                }
            });

            if (!mainDocs) {
                return res.send({
                    code: 'ERROR_CODE_MAIN_DOC_NOT_EXISTS',
                    errorCode: ERROR_CODE_MAIN_DOC_NOT_EXISTS,
                    message: `Main_doc by id ${id} is not exists`
                });
            }
            await getManager().getRepository(MainDocs).remove(mainDocs);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: ERROR_MESSAGE_OK
            });
        } catch (err) {

        }
    }
}
