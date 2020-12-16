import {Request, Response} from "express"
import jwt from 'jsonwebtoken'
import ServiceRest from "../../services/ServiceRest"
import {ERROR_CODE_BAD_REQUEST, ERROR_CODE_NONE, ERROR_CODE_PARAMETER_NOT_PASSED} from "../../services/ServiceRestCodes"
import {getManager} from "typeorm"
import {Users} from "../users/UsersModel"
import passwordHash from 'password-hash'

interface IRestUserAuth {
    login: string;
    password: string;
}

const generateAccessToken = (user: any) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'})
}

export default new class AuthController {
    async login(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestUserAuth>rest.getBody();

            const [login, password] = [bodyParams.login, bodyParams.password]

            if (!login || !password) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETERS_NOT_PASSED',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAMS_LOGIN_OR_PASSWORD')
                });
            }

            const user = {login, password}

            const existUser = await getManager().getRepository(Users).findOne({
                where: [{
                    login: login
                }]
            });

            if (existUser && passwordHash.verify(password, existUser.password)) {
                const accessToken = generateAccessToken(user)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

                res.cookie('accessToken', accessToken, {
                    maxAge: 100000000,
                })
                res.cookie('refreshToken', refreshToken, {
                    maxAge: 100000000,
                })

                const {password, ...userData} = existUser

                return res.status(200).send({
                    errorCode: ERROR_CODE_NONE,
                    data: userData,
                    message: req.__('MESSAGE_OK')
                });
            } else {
                return res.sendStatus(403)
            }
        } catch (err) {
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: req.__('UNKNOWN_ERROR')
            });
        }
    }

    async me(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestUserAuth>rest.getBody();

            const [login] = [bodyParams.login, bodyParams.password]

            const me = await getManager().getRepository(Users).findOne({
                where: [{
                    login: login
                }]
            });

            const {password, ...userData} = me

            return res.status(200).send({
                errorCode: ERROR_CODE_NONE,
                data: userData,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: req.__('UNKNOWN_ERROR')
            });
        }
    }

    async token(req: Request, res: Response) {
        const [refreshToken] = [req.cookies['refreshToken']]

        if (!refreshToken) {
            return res.sendStatus(401)
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
            if (err) {
                return res.sendStatus(403)
            }

            const accessToken = generateAccessToken({
                login: user.login,
                password: user.password
            })

            res.cookie('accessToken', accessToken)

            return res.sendStatus(200)
        })
    }

    async logout(req: Request, res: Response) {
        res.cookie('accessToken', null, {
            maxAge: 0,
        })
        res.cookie('refreshToken', null, {
            maxAge: 0,
        })

        return res.sendStatus(200)
    }
}