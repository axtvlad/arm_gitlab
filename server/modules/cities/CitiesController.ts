import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Cities} from "./CitiesModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_CITY_WITH_NAME_KZ_EXISTS,
    ERROR_CODE_CITY_WITH_NAME_RU_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
    ERROR_CODE_USER_NOT_EXISTS,
} from '../../services/ServiceRestCodes';

interface IRestCitiesCreate {
    name_ru: string;
    name_kz: string;
}

interface IRestCitiesList {
    offset?: number;
    count?: number;
}

export default new class CitiesController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestCitiesCreate>rest.getBody();

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
            }

            const City = new Cities;
            City.name_kz = bodyParams.name_kz;
            City.name_ru = bodyParams.name_ru;

            const existCity = await getManager().getRepository(Cities).findOne({
                where: [{
                    name_kz: bodyParams.name_kz
                }, {
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existCity && existCity.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_CITY_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_CITY_WITH_NAME_KZ_EXISTS,
                    message: 'A city with that name_kz already exists.'
                });
            } else if (existCity && existCity.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_CITY_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_CITY_WITH_NAME_RU_EXISTS,
                    message: 'A city with that name_ru already exists.'
                });
            }

            const user = await getManager().getRepository(Cities).save(City);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: user.id,
                    name_kz: user.name_kz,
                    name_ru: user.name_ru
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
            const queryParams: IRestCitiesList = <IRestCitiesList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz'];

            const cities = await getManager().getRepository(Cities).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: cities,
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

            const city = await getManager().getRepository(Cities).findOne({
                where: {
                    id
                }
            });

            if (!city) {
                return res.send({
                    code: 'ERROR_CODE_USER_NOT_EXISTS',
                    errorCode: ERROR_CODE_USER_NOT_EXISTS,
                    message: `City by id ${id} is not exists`
                });
            }
            await getManager().getRepository(Cities).remove(city);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }
}
