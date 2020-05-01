import {Request, Response} from "express";
import {getManager} from "typeorm";
import i18n from 'i18n';
import passwordHash from 'password-hash';
import {Users} from "../../modules/users/UsersModel";

const reqAuthSecurity = async (req: Request, res: Response, next?: Function) => {
    const authorization = req.get('Authorization');

    if (!authorization) {
        return res.sendStatus(401);
    }

    let basic: any = authorization.split(' ')[1];
    basic = Buffer.from(basic, 'base64').toString().split(':');

    const user = await getManager().getRepository(Users).findOne({
        select: ["userId", "password", "locale"],
        where: {
            login: basic[0]
        }
    });

    if (!user || !passwordHash.verify(basic[1], user.password)) {
        return res.sendStatus(403);
    }

    i18n.setLocale(user.locale);
    req.setLocale(user.locale);

    next();
};

export default reqAuthSecurity;
