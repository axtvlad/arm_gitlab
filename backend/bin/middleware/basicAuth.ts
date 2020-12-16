import {Request, Response} from "express";
import jwt from "jsonwebtoken";

const reqAuthSecurity = async (req: Request, res: Response, next: Function) => {
    const [accessToken] = [req.cookies['accessToken']]

    if (!accessToken) {
        return res.sendStatus(401);
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err: any) => {
        if (err) {
            return res.sendStatus(403)
        }

        next();
    })
};

export default reqAuthSecurity;