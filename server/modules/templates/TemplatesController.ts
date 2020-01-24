import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Templates} from "./TemplatesModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
    ERROR_CODE_TEMPLATE_NOT_EXISTS,
    ERROR_CODE_TEMPLATE_WITH_NAME_RU_EXISTS,
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";

interface IRestTemplatesCreate {
    name_ru: string;
    name_kz: string;
    category_id: number;
    file_ru: string;
    file_kz?: string;
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
                    message: req.__('PASSED_PARAM_NAME_RU')
                });
            } else if (!bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_KZ',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NAME_KZ')
                });
            } else if (!bodyParams.category_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_CATEGORY_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_CATEGORY_ID')
                });
            } else if (!bodyParams.file_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_PATH',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_FILE_RU')
                });
            }

            const Template = new Templates;

            Template.name_kz = bodyParams.name_kz;
            Template.name_ru = bodyParams.name_ru;
            Template.category_id = bodyParams.category_id;
            Template.file_ru = bodyParams.file_ru;

            if (bodyParams.file_kz) {
                Template.file_kz = bodyParams.file_kz;
            }

            const existTemplate = await getManager().getRepository(Templates).findOne({
                where: [{
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existTemplate && existTemplate.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_TEMPLATE_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_TEMPLATE_WITH_NAME_RU_EXISTS,
                    message: req.__('EXISTS_ALREADY_NAME_RU')
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
                    file_ru: template.file_ru,
                    file_kz: template.file_kz
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
            const queryParams: IRestTemplatesList = <IRestTemplatesList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz', 'category_id', 'file_ru', 'file_kz'];

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
                message: req.__('UNKNOWN_ERROR')
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
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
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
