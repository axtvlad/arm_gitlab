import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Templates} from "./TemplatesModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
    ERROR_CODE_TEMPLATE_NOT_EXISTS,
    ERROR_CODE_TEMPLATE_WITH_F_NAME_KZ_EXISTS,
    ERROR_CODE_TEMPLATE_WITH_F_NAME_RU_EXISTS,
    ERROR_CODE_TEMPLATE_WITH_NAME_KZ_EXISTS,
    ERROR_CODE_TEMPLATE_WITH_NAME_RU_EXISTS,
} from '../../services/ServiceRestCodes';

interface IRestTemplatesCreate {
    name_ru: string;
    name_kz: string;
    category_id: number;
    path: string;
    f_name_kz: string;
    f_name_ru: string;
}

interface IRestTemplatesList {
    offset?: number;
    count?: number;
}

export default new class TemplatesController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestTemplatesCreate>rest.getBody();

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
            } else if (!bodyParams.category_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_CATEGORY_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Category_id parameter not passed'
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

            const Template = new Templates;
            Template.name_kz = bodyParams.name_kz;
            Template.name_ru = bodyParams.name_ru;
            Template.category_id = bodyParams.category_id;
            Template.path = bodyParams.path;
            Template.f_name_kz = bodyParams.f_name_kz;
            Template.f_name_ru = bodyParams.f_name_ru;

            const existTemplate = await getManager().getRepository(Templates).findOne({
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

            if (existTemplate && existTemplate.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_TEMPLATE_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_TEMPLATE_WITH_NAME_KZ_EXISTS,
                    message: 'A template with that name_kz already exists.'
                });
            } else if (existTemplate && existTemplate.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_TEMPLATE_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_TEMPLATE_WITH_NAME_RU_EXISTS,
                    message: 'A template with that name_ru already exists.'
                });
            } else if (existTemplate && existTemplate.f_name_ru === bodyParams.f_name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_TEMPLATE_WITH_F_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_TEMPLATE_WITH_F_NAME_RU_EXISTS,
                    message: 'A template with that f_name_ru already exists.'
                });
            } else if (existTemplate && existTemplate.f_name_kz === bodyParams.f_name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_TEMPLATE_WITH_F_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_TEMPLATE_WITH_F_NAME_KZ_EXISTS,
                    message: 'A template with that f_name_kz already exists.'
                });
            }

            const template = await getManager().getRepository(Templates).save(Template);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: template.id,
                    name_kz: template.name_kz,
                    name_ru: template.name_ru,
                    category_id: template.category_id,
                    path: template.path,
                    f_name_kz: template.f_name_kz,
                    f_name_ru: template.f_name_ru
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
            const queryParams: IRestTemplatesList = <IRestTemplatesList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz', 'category_id', 'path', 'f_name_kz', 'f_name_ru'];

            const templates = await getManager().getRepository(Templates).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: templates,
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

            const templates = await getManager().getRepository(Templates).findOne({
                where: {
                    id
                }
            });

            if (!templates) {
                return res.send({
                    code: 'ERROR_CODE_TEMPLATE_NOT_EXISTS',
                    errorCode: ERROR_CODE_TEMPLATE_NOT_EXISTS,
                    message: `Template by id ${id} is not exists`
                });
            }
            await getManager().getRepository(Templates).remove(templates);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }
}
