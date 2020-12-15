import {Request, Response} from "express";
import {getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import passwordHash from 'password-hash';
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';
import {Users} from "../users/UsersModel";

interface IRestUserAuth {
    login: string;
    password: string;
}

export default new class AuthController {
    async auth(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestUserAuth>rest.getBody();

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
            }

            const existUser = await getManager().getRepository(Users).findOne({
                where: [{
                    login: bodyParams.login
                }]
            });

            if (existUser && passwordHash.verify(bodyParams.password, existUser.password)) {
                return res.status(200).send({
                    errorCode: ERROR_CODE_NONE,
                    auth: true,
                    data: existUser,
                    message: req.__('MESSAGE_OK')
                });
            } else {
                return res.status(200).send({
                    errorCode: ERROR_CODE_NONE,
                    auth: false,
                    data: {},
                    message: req.__('MESSAGE_OK')
                })
            }
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