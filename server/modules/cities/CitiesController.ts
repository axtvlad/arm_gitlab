import {Request, Response} from "express";
import {FindManyOptions, getConnection, getManager} from "typeorm";
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
import ServiceLocale from "../../services/ServiceLocale";
import {Categories} from "../categories/CategoriesModel";

interface IRestCitiesCreate {
    name_ru: string;
    name_kz: string;
}

interface IRestCitiesUpdate {
    name_ru: string;
    name_kz: string;
}

interface IRestCitiesList {
    offset?: number;
    count?: number;
}

interface IRestCityByIdKeys {
    id: number;
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
                    message: req.__('PASSED_PARAM_NAME_RU')
                });
            } else if (!bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_KZ',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NAME_KZ')
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
                    message: req.__('EXISTS_ALREADY_NAME_RU')
                });
            } else if (existCity && existCity.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_CITY_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_CITY_WITH_NAME_RU_EXISTS,
                    message: req.__('EXISTS_ALREADY_NAME_KZ')
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
                message: req.__('UNKNOWN_ERROR')
            });
        }
    }

    async getCitiesList(req: Request, res: Response) {
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
            const totalCount = await getManager().getRepository(Cities).count();

            // const totalCount = await getManager().query('SELECT COUNT(*) FROM cities');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: cities,
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

    async getCityById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const config = <FindManyOptions<Cities>>{};
            const {id} = <IRestCityByIdKeys>rest.getKeys();

            config.select = ['id', 'name_ru', 'name_kz'];
            config.where = {id};

            const city = await getManager().getRepository(Cities).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: city,
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

            const city = await getManager().getRepository(Cities).findOne({
                where: {
                    id
                }
            });

            if (!city) {
                return res.send({
                    code: 'ERROR_CODE_USER_NOT_EXISTS',
                    errorCode: ERROR_CODE_USER_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
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

    async update(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestCitiesUpdate>rest.getBody();
            const config = <FindManyOptions<Cities>>{};
            const {id} = <IRestCityByIdKeys>rest.getKeys();

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
            }

            const City = {
                name_ru: bodyParams.name_ru,
                name_kz: bodyParams.name_kz,
            }

            await getConnection()
                .createQueryBuilder()
                .update(Cities)
                .set(City)
                .where("id = :id", {id: id})
                .execute();

            config.select = ['id', 'name_ru', 'name_kz'];
            config.where = {id};

            const updatedCity = await getManager().getRepository(Cities).find(config);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: updatedCity[0],
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
