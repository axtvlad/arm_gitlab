import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Descriptions} from "./DescriptionsModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_DESCRIPTION_NOT_EXISTS,
    ERROR_CODE_DESCRIPTION_WITH_NAME_RU_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";

interface IRestDescriptionsCreate {
    name_ru: string;
    name_kz?: string;
    file_ru: string;
    file_kz?: string;
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
                    message: req.__('PASSED_PARAM_NAME_RU')
                });
            } else if (!bodyParams.file_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_FILE_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_FILE_RU')
                });
            }

            const Description = new Descriptions;
            Description.name_kz = bodyParams.name_kz;
            Description.file_ru = bodyParams.file_ru;

            if (bodyParams.name_kz) {
                Description.name_kz = bodyParams.name_kz;
            } else if (bodyParams.file_kz) {
                Description.file_kz = bodyParams.file_kz;
            }

            const existDescription = await getManager().getRepository(Descriptions).findOne({
                where: [{
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existDescription && existDescription.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_DESCRIPTION_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_DESCRIPTION_WITH_NAME_RU_EXISTS,
                    message: req.__('PASSED_PARAM_NAME_RU')
                });
            }

            const description = await getManager().getRepository(Descriptions).save(Description);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: description.id,
                    name_ru: description.name_ru,
                    name_kz: description.name_kz,
                    file_ru: description.file_ru,
                    file_kz: description.file_kz
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
            const queryParams: IRestDescriptionsList = <IRestDescriptionsList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz', 'file_ru', 'file_kz'];

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
                message: req.__('UNKNOWN_ERROR')
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
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
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
