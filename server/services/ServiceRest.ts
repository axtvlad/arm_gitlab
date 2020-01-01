import {Request} from "express";
import path from "path";

interface IRestApi {
    req: Request | null;
}

interface IQuery {
    [key: string]: string | boolean | null | number
}

export default class ServiceRest implements IRestApi {
    req: Request;

    constructor(req?: Request) {
        this.req = req;
    }

    public getBasicAuth(): object | boolean {
        try {
            if (this.req && this.req.headers && this.req.headers.authorization) {
                let basic: any = this.req.headers.authorization.split(' ');

                if (basic.length > 1) {
                    basic = Buffer.from(basic[1], 'base64').toString().split(':');

                    return {
                        login: basic[0],
                        password: basic[1]
                    }
                }
            }
        }catch (e) {
            console.error(path.basename(__filename), 'getBasicAuth', e);
            return false;
        }
    }

    public getQuery(): object {
        try {
            const query: IQuery = this.req.query;

            return Object.keys(query).reduce((list, item) => {
                switch (query[item].toString().toLowerCase()) {
                    case 'true':
                        list[item] = true;
                        break;
                    case 'false':
                        list[item] = false;
                        break;
                    default:
                        let number: number = <number>query[item];

                        if(!isNaN(number)){
                            list[item] = number;
                        }else{
                            list[item] = query[item];
                        }
                }

                return list;
            }, {} as IQuery);
        }catch (e) {
            console.error(path.basename(__filename), 'getQuery', e);
            return {};
        }
    }

    public getBody(): object {
        try {
            return this.req.body;
        } catch (e) {
            console.error(path.basename(__filename), 'getBody', e);
            return {};
        }
    }
}
