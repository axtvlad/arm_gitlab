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

    private treatment(data: IQuery): object {
        return Object.keys(data).reduce((list, item) => {
            if (data !== null) {
                switch (data[item].toString().toLowerCase()) {
                    case 'true':
                        list[item] = true;
                        break;
                    case 'false':
                        list[item] = false;
                        break;
                    default:
                        let number: number = +data[item];

                        if (!isNaN(number)) {
                            list[item] = number;
                        } else {
                            list[item] = data[item];
                        }
                }
            }

            return list;
        }, {} as IQuery);
    }

    public getQuery(): object {
        try {
            const {query} = this.req;
            return this.treatment(query);
        } catch (e) {
            console.error(path.basename(__filename), 'getQuery', e);
            return {}
        }
    }

    public getBody(): object {
        try {
            const {body} = this.req;
            return this.treatment(body);
        } catch (e) {
            console.error(path.basename(__filename), 'getBody', e);
            return {};
        }
    }

    public getKeys(): object {
        try {
            const {params} = this.req;
            return this.treatment(params);
        } catch (e) {
            console.error(path.basename(__filename), 'getBody', e);
            return {};
        }
    }
}
