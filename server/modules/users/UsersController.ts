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
    ERROR_CODE_USER_WITH_PHONE_EXISTS,
    ERROR_MESSAGE_OK
} from '../../services/ServiceRestCodes';

interface IRestUsersCreate {
    firstname: string;
    lastname: string;
    patronymic: string;
    b_day: Date;
    role_id: number;
    email: string;
    login: string;
    password: string;
    phone: number;
    isPremium: boolean;
    photo_name?: string;
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

export default new class UsersController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestUsersCreate>rest.getBody();

            if (!bodyParams.login && !bodyParams.password) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Parameters not passed `login` or `password`'
                });
            } else if (!bodyParams.login) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_LOGIN',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Login parameter not passed'
                });
            } else if (!bodyParams.password) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_PASSWORD',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Password parameter not passed'
                });
            } else if (!bodyParams.email) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_EMAIL',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Email parameter not passed'
                });
            } else if (!bodyParams.firstname) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_FIRSTNAME',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Firstname parameter not passed'
                });
            } else if (!bodyParams.lastname) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_LASTNAME',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Lastname parameter not passed'
                });
            } else if (!bodyParams.patronymic) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_PATRONYMIC',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Patronymic parameter not passed'
                });
            } else if (!bodyParams.b_day) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_B_DAY',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'B_day parameter not passed'
                });
            } else if (!bodyParams.role_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_ROLE_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Role_id parameter not passed'
                });
            } else if (!bodyParams.phone) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_PHONE',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'PHONE parameter not passed'
                });
            } else if (!bodyParams.isPremium) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_isPremium',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'isPremium parameter not passed'
                });
            } else if (!bodyParams.city_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_CITY_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'City_id parameter not passed'
                });
            } else if (!bodyParams.customer_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_CUSTOMER_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Customer_id parameter not passed'
                });
            } else if (!bodyParams.gender_id) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_GENDER_ID',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Gender_id parameter not passed'
                });
            } else if (!bodyParams.locale) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_LOCALE',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Locale parameter not passed'
                });
            }

            if (!isEmail(bodyParams.email)) {
                return res.status(400).send({
                    code: 'ERROR_CODE_INVALID_EMAIL',
                    errorCode: ERROR_CODE_INVALID_EMAIL,
                    message: 'Invalid email address'
                });
            }

            const User = new Users;
            User.firstname = bodyParams.firstname;
            User.login = bodyParams.login;
            User.password = passwordHash.generate(bodyParams.password);
            User.email = bodyParams.email;
            User.lastname = bodyParams.lastname;
            User.patronymic = bodyParams.patronymic;
            User.gender_id = bodyParams.gender_id;
            User.role_id = bodyParams.role_id;
            User.phone = bodyParams.phone;
            User.b_day = bodyParams.b_day;
            User.isPremium = bodyParams.isPremium;
            User.city_id = bodyParams.city_id;
            User.customer_id = bodyParams.customer_id;
            User.locale = bodyParams.locale;

            if (bodyParams.photo_name && bodyParams.photo_path) {
                User.photo_name = bodyParams.photo_name;
                User.photo_path = bodyParams.photo_path;
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
                    message: 'An user with that login already exists.'
                });
            } else if (existUser && existUser.email === bodyParams.email) {
                return res.status(400).send({
                    code: 'ERROR_CODE_USER_WITH_EMAIL_EXISTS',
                    errorCode: ERROR_CODE_USER_WITH_EMAIL_EXISTS,
                    message: 'An user with that email already exists.'
                });
            } else if (existUser && existUser.phone === bodyParams.phone) {
                return res.status(400).send({
                    code: 'ERROR_CODE_USER_WITH_PHONE_EXISTS',
                    errorCode: ERROR_CODE_USER_WITH_PHONE_EXISTS,
                    message: 'An user with that phone already exists.'
                });
            }

            const user = await getManager().getRepository(Users).save(User);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    patronymic: user.patronymic,
                    b_day: user.b_day,
                    role_id: user.role_id,
                    email: user.email,
                    login: user.login,
                    phone: user.phone,
                    isPremium: user.isPremium,
                    city_id: user.city_id,
                    customer_id: user.customer_id,
                    gender_id: user.gender_id,
                    locale: user.locale,
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
            const queryParams: IRestUsersList = <IRestUsersList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            if (queryParams.loadData === true) {
                config.select = ['id', 'lastname', 'firstname', 'patronymic', 'role_id', 'login', 'b_day', 'email',
                    'isPremium', 'city_id', 'customer_id', 'gender_id', 'phone', 'photo_path', 'photo_name', 'locale'];
            } else {
                config.select = ['id', 'firstname', 'patronymic', 'login', 'email', 'isPremium', 'phone'];
            }

            const users = await getManager().getRepository(Users).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: users,
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

            const user = await getManager().getRepository(Users).findOne({
                where: {
                    id
                }
            });

            if (!user) {
                return res.send({
                    code: 'ERROR_CODE_USER_NOT_EXISTS',
                    errorCode: ERROR_CODE_USER_NOT_EXISTS,
                    message: `User by id ${id} is not exists`
                });
            }

            await getManager().getRepository(Users).remove(user);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: ERROR_MESSAGE_OK
            });
        } catch (err) {

        }
    }
}
