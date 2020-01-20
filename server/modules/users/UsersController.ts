import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Users} from "./UsersModel";
import passwordHash from 'password-hash';
import isEmail from 'validator/lib/isEmail';
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_INVALID_EMAIL,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
    ERROR_CODE_USER_NOT_EXISTS,
    ERROR_CODE_USER_WITH_EMAIL_EXISTS,
    ERROR_CODE_USER_WITH_LOGIN_EXISTS,
    ERROR_CODE_USER_WITH_PHONE_EXISTS
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";

interface IRestUsersCreate {
    firstname: string;
    lastname: string;
    patronymic?: string;
    b_day: Date;
    role_id: number;
    email: string;
    login: string;
    password: string;
    phone?: number;
    isPremium: boolean;
    photo_path?: string;
    city_id: number;
    customer_id: number;
    gender_id: number;
    locale: string;
}

interface IRestUsersList {
    offset?: number;
    lang?: string;
    count?: number;
    loadData?: boolean;
}

interface IRestUserById {
    loadData?: boolean;
}

interface IRestUserByIdKeys {
    userId: string;
}

export default new class UsersController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestUsersCreate>rest.getBody();

            if (!bodyParams.login && !bodyParams.password) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAMS_LOGIN_OR_PASSWORD')
                });
            } else if (!bodyParams.login) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_LOGIN',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_LOGIN_NOT')
                });
            } else if (!bodyParams.password) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_PASSWORD',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_PASSWORD_NOT")
                });
            } else if (!bodyParams.email) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_EMAIL',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_EMAIL_NOT")
                });
            } else if (!bodyParams.firstname) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_FIRSTNAME',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_FIRST_NAME_NOT")
                });
            } else if (!bodyParams.lastname) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_LASTNAME',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_LAST_NAME_NOT")
                });
            // } else if (!bodyParams.patronymic) {
            //     return res.status(400).send({
            //         code: 'ERROR_CODE_PARAMETER_NOT_PASSED_PATRONYMIC',
            //         errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
            //         message: req.__("PASSED_PARAM_PATRONYMIC_NOT")
            //     });
            } else if (!bodyParams.b_day) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_B_DAY',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_BIRTH_DATE_NOT")
                });
            } else if (!bodyParams.role_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_ROLE_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_ROLE_ID_NOT")
                });
            // } else if (!bodyParams.phone) {
            //     return res.status(400).send({
            //         code: 'ERROR_CODE_PARAMETER_NOT_PASSED_PHONE',
            //         errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
            //         message: req.__("PASSED_PARAM_PHONE_NOT")
            //     });
            } else if (!bodyParams.isPremium) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_isPremium',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_IS_PREMIUM_NOT")
                });
            } else if (!bodyParams.city_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_CITY_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_CITY_ID_NOT")
                });
            } else if (!bodyParams.customer_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_CUSTOMER_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_CUSTOMER_ID_NOT")
                });
            } else if (!bodyParams.gender_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_GENDER_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_GENDER_ID_NOT")
                });
            } else if (!bodyParams.locale) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_LOCALE',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_LOCALE_NOT")
                });
            } else if (!isEmail(bodyParams.email)) {
                return res.status(400).send({
                    code: 'ERROR_CODE_INVALID_EMAIL',
                    errorCode: ERROR_CODE_INVALID_EMAIL,
                    message: req.__('INVALID_EMAIL_ADDRESS')
                });
            }

            const user = new Users();

            user.firstName = bodyParams.firstname;
            user.login = bodyParams.login;
            user.password = passwordHash.generate(bodyParams.password);
            user.email = bodyParams.email;
            user.lastName = bodyParams.lastname;
            user.patronymic = bodyParams.patronymic;
            user.gender_id = bodyParams.gender_id;
            user.role_id = bodyParams.role_id;
            user.phone = bodyParams.phone;
            user.birthAt = bodyParams.b_day;
            user.isPremium = bodyParams.isPremium;
            user.city_id = bodyParams.city_id;
            user.customer_id = bodyParams.customer_id;
            user.locale = bodyParams.locale;

            if (bodyParams.photo_path) {
                user.photo = bodyParams.photo_path;
            }

            const existUser = await getManager().getRepository(Users).findOne({
                where: [{
                    login: bodyParams.login
                }, {
                    email: bodyParams.email
                }, {
                    phone: bodyParams.phone
                }]
            });

            if (existUser && existUser.login === bodyParams.login) {
                return res.status(400).send({
                    code: 'ERROR_CODE_USER_WITH_LOGIN_EXISTS',
                    errorCode: ERROR_CODE_USER_WITH_LOGIN_EXISTS,
                    message: req.__('EXISTS_ALREADY_LOGIN')
                });
            } else if (existUser && existUser.email === bodyParams.email) {
                return res.status(400).send({
                    code: 'ERROR_CODE_USER_WITH_EMAIL_EXISTS',
                    errorCode: ERROR_CODE_USER_WITH_EMAIL_EXISTS,
                    message: req.__('EXISTS_ALREADY_EMAIL')
                });
            } else if (existUser && existUser.phone === bodyParams.phone) {
                return res.status(400).send({
                    code: 'ERROR_CODE_USER_WITH_PHONE_EXISTS',
                    errorCode: ERROR_CODE_USER_WITH_PHONE_EXISTS,
                    message: req.__('EXISTS_ALREADY_PHONE')
                });
            }

            const { userId } = await getManager().getRepository(Users).save(user);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: { userId },
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

    async getUsersList(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestUsersList = <IRestUsersList>rest.getQuery();
            const config = <FindManyOptions<Users>> {};

            config.skip = queryParams.offset ? queryParams.offset : 0;
            config.take = queryParams.count ? queryParams.count : 30;
            config.select = ["userId", "firstName", "lastName", "locale"];

            if (queryParams.loadData && queryParams.loadData === true) {
                config.select = [
                    ...config.select,
                    "patronymic", "phone", "email", "role_id", "city_id", "customer_id", "gender_id", "locale_id",
                    "photo", "birthAt", "createdAt", "isPremium", "isAdmin"
                ];
            }

            const users = await getManager().getRepository(Users).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: users,
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

    async getUserById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestUsersList = <IRestUserById>rest.getQuery();
            const config = <FindManyOptions<Users>> {};
            const { userId } = <IRestUserByIdKeys>rest.getKeys();

            config.select = ["userId", "firstName", "lastName", "locale"];
            config.where = { userId };

            if (queryParams.loadData && queryParams.loadData === true) {
                config.select = [
                    ...config.select,
                    "patronymic", "phone", "email", "role_id", "city_id", "customer_id", "gender_id", "locale_id",
                    "photo", "birthAt", "createdAt", "isPremium", "isAdmin"
                ];
            }

            const user = await getManager().getRepository(Users).findOne(config);

            if (!user) {
                return res.send({
                    code: 'ERROR_CODE_USER_NOT_EXISTS',
                    errorCode: ERROR_CODE_USER_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_USER_ID'), userId)
                });
            }

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: user,
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
            const { userId } = req.params;

            const user = await getManager().getRepository(Users).findOne({
                where: {
                    userId
                }
            });

            if (!user) {
                return res.send({
                    code: 'ERROR_CODE_USER_NOT_EXISTS',
                    errorCode: ERROR_CODE_USER_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_USER_ID'), userId)
                });
            }

            await getManager().getRepository(Users).remove(user);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: userId,
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
