import {Request, Response} from "express";
import {FindManyOptions, getConnection, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {MainDocs} from "./MainDocsModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_MAIN_DOC_NOT_EXISTS,
    ERROR_CODE_MAIN_DOC_WITH_HEADER_RU_EXISTS,
    ERROR_CODE_MAIN_DOC_WITH_NAME_RU_EXISTS,
    ERROR_CODE_MAIN_DOC_WITH_NUM_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";
import moment from "moment";

interface IRestMainDocsCreate {
    num: string;
    department_id: number;
    status_id?: number;
    begin_date?: string;
    finish_date?: string;
    pub_date?: string;
    name_ru: string;
    name_kz?: string;
    header_ru: string;
    header_kz?: string;
    file_ru: string;
    file_kz?: string;
    description_ru?: string;
    description_kz?: string;
    type_id: number;
    text_ru?: string;
    text_kz?: string;
    tags: string;
}

interface IRestMainDocsUpdate {
    num: string;
    department_id: number;
    status_id?: number;
    begin_date?: string;
    finish_date?: string;
    pub_date?: string;
    name_ru: string;
    name_kz?: string;
    header_ru: string;
    header_kz?: string;
    file_ru: string;
    file_kz?: string;
    description_ru?: string;
    description_kz?: string;
    type_id: number;
    text_ru?: string;
    text_kz?: string;
    tags: string;
}

interface IRestMainDocsList {
    offset?: number;
    count?: number;
    lang?: string;
}

interface IRestMainDocByIdKeys {
    id: number;
}

interface IRestMainDocSearchByTags {
    tags: [];
}

interface IRestMainDocSearchByNum {
    num: string;
}

export default new class MainDocsController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestMainDocsCreate>rest.getBody();

            if (!bodyParams.num) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NUM',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NUM')
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
            } else if (!bodyParams.tags) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_TAGS',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_TAGS')
                });
            }

            const MainDoc = new MainDocs;

            MainDoc.num = bodyParams.num;
            MainDoc.department_id = bodyParams.department_id;
            MainDoc.name_ru = bodyParams.name_ru;
            MainDoc.header_ru = bodyParams.header_ru;
            MainDoc.file_ru = bodyParams.file_ru;
            MainDoc.type_id = bodyParams.type_id;
            MainDoc.tags = bodyParams.tags.toString().replace(/[ ,!@#$%^&*()-_+±|/]/g, "-");
            MainDoc.pub_date = moment().format('YYYY-MM-DD')

            if (bodyParams.status_id) {
                MainDoc.status_id = bodyParams.status_id;
            }
            if (bodyParams.begin_date) {
                MainDoc.begin_date = bodyParams.begin_date;
            }
            if (bodyParams.finish_date) {
                MainDoc.finish_date = bodyParams.finish_date;
            }
            if (bodyParams.status_id) {
                MainDoc.status_id = bodyParams.status_id;
            }
            if (bodyParams.name_kz) {
                MainDoc.name_kz = bodyParams.name_kz;
            }
            if (bodyParams.header_kz) {
                MainDoc.header_kz = bodyParams.header_kz;
            }
            if (bodyParams.file_kz) {
                MainDoc.file_kz = bodyParams.file_kz;
            }
            if (bodyParams.description_ru) {
                MainDoc.description_ru = bodyParams.description_ru;
            }
            if (bodyParams.description_kz) {
                MainDoc.description_kz = bodyParams.description_kz;
            }
            if (bodyParams.text_ru) {
                MainDoc.text_ru = bodyParams.text_ru;
            }
            if (bodyParams.text_kz) {
                MainDoc.text_kz = bodyParams.text_kz;
            }

            const existMainDoc = await getManager().getRepository(MainDocs).findOne({
                where: [{
                    num: bodyParams.num
                }, {
                    name_ru: bodyParams.name_ru
                }, {
                    header_ru: bodyParams.header_ru
                }]
            });

            if (existMainDoc && existMainDoc.num === bodyParams.num) {
                return res.status(400).send({
                    code: 'ERROR_CODE_MAIN_DOC_WITH_NUM_EXISTS',
                    errorCode: ERROR_CODE_MAIN_DOC_WITH_NUM_EXISTS,
                    message: req.__('EXISTS_ALREADY_NUM')
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
                    num: mainDoc.num,
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
                    description_ru: mainDoc.description_ru,
                    description_kz: mainDoc.description_kz,
                    type_id: mainDoc.type_id,
                    text_ru: mainDoc.text_ru,
                    text_kz: mainDoc.text_kz,
                    tags: mainDoc.tags,
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

    async searchByTags(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestMainDocSearchByTags>rest.getBody();

            if (!bodyParams.tags) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_TAGS',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_TAGS')
                });
            }

            let sql = "SELECT *, DATE_FORMAT (begin_date, '%Y-%m-%d') as begin_date FROM main_docs WHERE ";

            for (let i = 1; i <= bodyParams.tags.length; i++) {
                sql += " (tags LIKE '%" + bodyParams.tags[i - 1] + "%') ";

                if (i !== bodyParams.tags.length) {
                    sql += " and ";
                } else {
                    sql += ";";
                }
            }

            const results = await getManager().query(sql);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: results,
                totalCount: results.length,
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

    async searchByNum(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestMainDocSearchByNum>rest.getBody();

            if (!bodyParams.num) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NUM',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_TAGS')
                });
            }

            let sql = "SELECT *, DATE_FORMAT (begin_date, '%Y-%m-%d') as begin_date " +
                "FROM main_docs WHERE num LIKE '%" + bodyParams.num + "%';";

            const results = await getManager().query(sql);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: results,
                totalCount: results.length,
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

    async getMainDocsList(req: Request, res: Response) {
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
                "id", "num", "department_id", "status_id", "begin_date", "finish_date", "pub_date",
                "name_ru", "name_kz", "file_ru", "file_kz", "header_ru", "header_kz", "description_ru",
                "description_ru", "type_id", "text_ru", "text_kz", "tags"];

            const mainDocs = await getManager().getRepository(MainDocs).find(config);
            const totalCount = await getManager().getRepository(MainDocs).count();

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: mainDocs,
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

    async getMainDocById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const config = <FindManyOptions<MainDocs>>{};
            const {id} = <IRestMainDocByIdKeys>rest.getKeys();

            config.select = [
                "id", "num", "department_id", "status_id", "begin_date", "finish_date", "pub_date",
                "name_ru", "name_kz", "file_ru", "file_kz", "header_ru", "header_kz", "description_ru",
                "description_kz", "type_id", "text_ru", "text_kz", "tags"];
            config.where = {id};

            const mainDoc = await getManager().getRepository(MainDocs).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: mainDoc[0],
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

            const mainDoc = await getManager().getRepository(MainDocs).findOne({
                where: {
                    id
                }
            });

            if (!mainDoc) {
                return res.send({
                    code: 'ERROR_CODE_MAIN_DOC_NOT_EXISTS',
                    errorCode: ERROR_CODE_MAIN_DOC_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
                });
            }
            await getManager().getRepository(MainDocs).remove(mainDoc);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: mainDoc,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestMainDocsUpdate>rest.getBody();
            const config = <FindManyOptions<MainDocs>>{};
            const {id} = <IRestMainDocByIdKeys>rest.getKeys();

            await getConnection()
                .createQueryBuilder()
                .update(MainDocs)
                .set(bodyParams)
                .where("id = :id", {id: id})
                .execute();

            config.select = [
                "id", "num", "department_id", "status_id", "begin_date", "finish_date", "pub_date",
                "name_ru", "name_kz", "file_ru", "file_kz", "header_ru", "header_kz", "description_ru",
                "description_ru", "type_id", "text_ru", "text_kz", "tags"
            ];
            config.where = {id};

            const updatedMainDoc = await getManager().getRepository(MainDocs).find(config);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: updatedMainDoc[0],
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
