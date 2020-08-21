import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Users} from "./UsersModel";
import passwordHash from 'password-hash';
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_INVALID_EMAIL,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
    ERROR_CODE_USER_NOT_EXISTS,
    ERROR_CODE_USER_WITH_EMAIL_EXISTS,
    ERROR_CODE_USER_WITH_LOGIN_EXISTS,
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";

interface IRestUsersCreate {
    firstName: string;
    lastName: string;
    patronymic?: string;
    login: string;
    password: string;
    email: string;
    photo?: string;
    role_id?: number;
    city_id?: number;
    customer_id?: number;
    gender_id?: number;
    phone?: number;
    locale?: string;
    birthAt?: Date;
    isAdmin?: boolean;
    isPremium?: boolean;
    isBanned?: boolean;
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
            } else if (!bodyParams.firstName) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_FIRSTNAME',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_FIRST_NAME_NOT")
                });
            } else if (!bodyParams.lastName) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_LASTNAME',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__("PASSED_PARAM_LAST_NAME_NOT")
                });
            } else if (!bodyParams.email) {
                return res.status(400).send({
                    code: 'ERROR_CODE_INVALID_EMAIL',
                    errorCode: ERROR_CODE_INVALID_EMAIL,
                    message: req.__('INVALID_EMAIL_ADDRESS')
                });
            }

            const user = new Users();

            user.firstName = bodyParams.firstName;
            user.lastName = bodyParams.lastName;
            user.login = bodyParams.login;
            user.password = passwordHash.generate(bodyParams.password);
            user.email = bodyParams.email;

            if (bodyParams.patronymic) {
                user.patronymic = bodyParams.patronymic;
            } else if (bodyParams.photo) {
                user.photo = bodyParams.photo;
            } else if (bodyParams.role_id) {
                user.role_id = bodyParams.role_id;
            } else if (bodyParams.city_id) {
                user.city_id = bodyParams.city_id
            } else if (bodyParams.customer_id) {
                user.customer_id = bodyParams.customer_id;
            } else if (bodyParams.gender_id) {
                user.gender_id = bodyParams.gender_id
            } else if (bodyParams.phone) {
                user.phone = bodyParams.phone;
            } else if (bodyParams.locale) {
                user.locale = bodyParams.locale;
            } else if (bodyParams.isAdmin) {
                user.isAdmin = bodyParams.isAdmin;
            } else if (bodyParams.isPremium) {
                user.isPremium = bodyParams.isPremium;
            } else if (bodyParams.isBanned) {
                user.isBanned = bodyParams.isBanned;
            } else if (bodyParams.birthAt) {
                user.birthAt = bodyParams.birthAt;
            }

            const existUser = await getManager().getRepository(Users).findOne({
                where: [{
                    login: bodyParams.login
                }, {
                    email: bodyParams.email
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
            }

            const {userId} = await getManager().getRepository(Users).save(user);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {userId},
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
            const config = <FindManyOptions<Users>>{};

            config.skip = queryParams.offset ? queryParams.offset : 0;
            config.take = queryParams.count ? queryParams.count : 30;

            config.select = ["userId", "firstName", "lastName", "login", "email", "phone", "locale"];

            if (queryParams.loadData && queryParams.loadData === true) {
                config.select = [
                    ...config.select,
                    "patronymic", "photo", "role_id", "city_id", "gender_id", "customer_id",
                    "birthAt", "isPremium", "isAdmin", "isBanned"
                ];
            }

            const users = await getManager().getRepository(Users).find(config);
            const totalCount = await getManager().getRepository(Users).count();

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: users,
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

    async getUserById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestUsersList = <IRestUserById>rest.getQuery();
            const config = <FindManyOptions<Users>>{};
            const {userId} = <IRestUserByIdKeys>rest.getKeys();

            config.select = ["userId", "firstName", "lastName", "login", "email", "phone", "locale"];
            config.where = {userId};

            if (queryParams.loadData && queryParams.loadData === true) {
                config.select = [
                    ...config.select,
                    "patronymic", "photo", "role_id", "city_id", "gender_id", "customer_id",
                    "birthAt", "isPremium", "isAdmin", "isBanned"
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
            const {userId} = req.params;

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
