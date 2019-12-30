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
    ERROR_CODE_PARAMETER_NOT_PASSED, ERROR_CODE_USER_NOT_EXISTS, ERROR_CODE_USER_WITH_EMAIL_EXISTS,
    ERROR_CODE_USER_WITH_LOGIN_EXISTS, ERROR_CODE_USER_WITH_USERNAME_EXISTS,
    ERROR_MESSAGE_OK
} from '../../services/ServiceRestCodes';

interface IRestUsersCreate {
    firstName_ru: string;
    firstName_kz: string;
    lastName_ru: string;
    lastName_kz: string;
    patronymic_ru: string;
    patronymic_kz: string;
    b_day: Date;
    role_id: number;
    email: string;
    login: string;
    password: string;
    phone: number;
    isPremium: boolean;
    photo: string;
    city_id: number;
    institution_id: number;
    gender_id: number;
}

interface IRestUsersList {
    count?: number;
    loadData?: boolean;
}

export default new class UsersController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestUsersCreate>rest.getBody();

            if (!bodyParams.login && !bodyParams.password && !bodyParams.firstName) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Parameters not passed `login`, `password`, `email`, `firstName`'
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
            } else if (!bodyParams.firstName) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_FIRSTNAME',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'FirstName parameter not passed'
                });
            } else if (!bodyParams.username) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_USERNAME',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Username parameter not passed'
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
            User.firstName = bodyParams.firstName;
            User.login = bodyParams.login;
            User.password = passwordHash.generate(bodyParams.password);
            User.email = bodyParams.email;
            User.username = bodyParams.username;

            if (bodyParams.lastName) {
                User.lastName = bodyParams.lastName;
            }

            if (bodyParams.patronymic) {
                User.patronymic = bodyParams.patronymic;
            }

            const existUser = await getManager().getRepository(Users).findOne({
                where: [{
                    login: bodyParams.login
                }, {
                    email: bodyParams.email
                }, {
                    username: bodyParams.username
                }]
            });

            if (existUser && existUser.login === bodyParams.login) {
                return res.status(400).send({
                    code: 'ERROR_CODE_USER_WITH_LOGIN_EXISTS',
                    errorCode: ERROR_CODE_USER_WITH_LOGIN_EXISTS,
                    message: 'A user with that login already exists.'
                });
            } else if (existUser && existUser.email === bodyParams.email) {
                return res.status(400).send({
                    code: 'ERROR_CODE_USER_WITH_EMAIL_EXISTS',
                    errorCode: ERROR_CODE_USER_WITH_EMAIL_EXISTS,
                    message: 'A user with that email already exists.'
                });
            } else if (existUser && existUser.username === bodyParams.username) {
                return res.status(400).send({
                    code: 'ERROR_CODE_USER_WITH_USERNAME_EXISTS',
                    errorCode: ERROR_CODE_USER_WITH_USERNAME_EXISTS,
                    message: 'A user with that username already exists.'
                });
            }

            const user = await getManager().getRepository(Users).save(User);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    userId: user.userId,
                    login: user.login,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    patronymic: user.patronymic,
                    created: user.created
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
                config.select = ['userId', 'username', 'email', 'firstName', 'lastName', 'patronymic', 'created'];
            } else {
                config.select = ['userId', 'username', 'email'];
            }

            if (queryParams.isConfirmed === true) {
                config.where = {
                    isConfirmed: true
                }
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
                    message: `User by id ${userId} is not exists`
                });
            }

            await getManager().getRepository(Users).remove(user);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: userId,
                message: ERROR_MESSAGE_OK
            });
        } catch (err) {

        }
    }
}
