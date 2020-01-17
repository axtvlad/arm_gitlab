import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Locales} from "./LocalesModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_LOCALE_NOT_EXISTS,
    ERROR_CODE_LOCALE_WITH_NAME_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
    ERROR_MESSAGE_OK,
} from '../../services/ServiceRestCodes';

interface IRestLocalesCreate {
    name: string;
}

interface IRestLocalesList {
    offset?: number;
    count?: number;
}

export default new class LocalesController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestLocalesCreate>rest.getBody();

            if (!bodyParams.name) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Name parameter not passed`'
                });
            }

            const Locale = new Locales;
            Locale.name = bodyParams.name;

            const existType = await getManager().getRepository(Locales).findOne({
                where: [{
                    name_kz: bodyParams.name
                }]
            });

            if (existType && existType.name === bodyParams.name) {
                return res.status(400).send({
                    code: 'ERROR_CODE_LOCALE_WITH_NAME_EXISTS',
                    errorCode: ERROR_CODE_LOCALE_WITH_NAME_EXISTS,
                    message: 'A locale with that name already exists.'
                });
            }

            const locale = await getManager().getRepository(Locales).save(Locale);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: locale.id,
                    name: locale.name,
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
            const queryParams: IRestLocalesList = <IRestLocalesList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name'];

            const locales = await getManager().getRepository(Locales).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: locales,
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

            const type = await getManager().getRepository(Locales).findOne({
                where: {
                    id
                }
            });

            if (!type) {
                return res.send({
                    code: 'ERROR_CODE_LOCALE_NOT_EXISTS',
                    errorCode: ERROR_CODE_LOCALE_NOT_EXISTS,
                    message: `Locale by id ${id} is not exists`
                });
            }
            await getManager().getRepository(Locales).remove(type);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: ERROR_MESSAGE_OK
            });
        } catch (err) {

        }
    }
}
