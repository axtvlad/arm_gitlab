import {Request, Response} from "express";
import jwt from "jsonwebtoken";

const reqAuthSecurity = async (req: Request, res: Response, next: Function) => {
    const [accessToken] = [req.cookies['accessToken']]

    if (!accessToken) {
        return res.sendStatus(401);
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403)
        }

        req.body.login = user.login;

        next();
    })
};

export default reqAuthSecurity;