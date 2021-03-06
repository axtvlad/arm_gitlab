import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Genders} from "./GendersModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_GENDER_NOT_EXISTS,
    ERROR_CODE_GENDER_WITH_NAME_KZ_EXISTS,
    ERROR_CODE_GENDER_WITH_NAME_RU_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';

interface IRestGendersCreate {
    name_ru: string;
    name_kz: string;
}

interface IRestGendersList {
    offset?: number;
    count?: number;
}

export default new class GendersController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestGendersCreate>rest.getBody();

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

            const Gender = new Genders;
            Gender.name_kz = bodyParams.name_kz;
            Gender.name_ru = bodyParams.name_ru;

            const existGender = await getManager().getRepository(Genders).findOne({
                where: [{
                    name_kz: bodyParams.name_kz
                }, {
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existGender && existGender.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_GENDER_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_GENDER_WITH_NAME_KZ_EXISTS,
                    message: 'A gender with that name_kz already exists.'
                });
            } else if (existGender && existGender.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_GENDER_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_GENDER_WITH_NAME_RU_EXISTS,
                    message: 'A gender with that name_ru already exists.'
                });
            }

            const gender = await getManager().getRepository(Genders).save(Gender);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: gender.id,
                    name_kz: gender.name_kz,
                    name_ru: gender.name_ru
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
            const queryParams: IRestGendersList = <IRestGendersList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz'];

            const genders = await getManager().getRepository(Genders).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: genders,
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

            const gender = await getManager().getRepository(Genders).findOne({
                where: {
                    id
                }
            });

            if (!gender) {
                return res.send({
                    code: 'ERROR_CODE_GENDER_NOT_EXISTS',
                    errorCode: ERROR_CODE_GENDER_NOT_EXISTS,
                    message: `Gender by id ${id} is not exists`
                });
            }
            await getManager().getRepository(Genders).remove(gender);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }
}
