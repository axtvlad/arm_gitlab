import {Request, Response} from "express";
import {getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED, ERROR_CODE_USER_WITH_EMAIL_EXISTS,
    ERROR_CODE_USER_WITH_LOGIN_EXISTS,
    ERROR_MESSAGE_OK
} from '../../services/ServiceRestCodes';
import {City} from "./cityModel";

interface IRestCityCreate {
    name_ru: string;
    name_kz: string;
}

export default new class CityController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestCityCreate>rest.getBody();

            if (!bodyParams.name_ru && !bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Parameters not passed `name_ru`, `name_kz`'
                });
            } else if (!bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Name_ru parameter not passed'
                });
            } else if (!bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_KZ',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Name_kz parameter not passed'
                });
            }

            const city = new City;
            city.name_ru = bodyParams.name_ru;
            city.name_kz = bodyParams.name_kz;

            if (bodyParams.name_ru) {
                city.name_ru = bodyParams.name_ru;
            }

            if (bodyParams.name_kz) {
                city.name_kz = bodyParams.name_kz;
            }

            const existCity = await getManager().getRepository(City).findOne({
                where: [{
                    name_ru: bodyParams.name_ru
                }, {
                    name_kz: bodyParams.name_kz
                }]
            });

            if (existCity && existCity.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_CITY_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_USER_WITH_LOGIN_EXISTS,
                    message: 'A user with that name_ru already exists.'
                });
            } else if (existCity && existCity.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_USER_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_USER_WITH_EMAIL_EXISTS,
                    message: 'A user with that name_kz already exists.'
                });
            }

            const Cityes = await getManager().getRepository(City).save(city);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    name_ru: Cityes.name_ru,
                    name_kz: Cityes.name_kz
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
}
