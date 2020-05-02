import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Customers} from "./CustomersModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_CUSTOMER_NOT_EXISTS,
    ERROR_CODE_CUSTOMER_WITH_NAME_RU_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";

interface IRestCustomersCreate {
    name_ru: string;
    name_kz?: string;
}

interface IRestCustomersList {
    offset?: number;
    count?: number;
}

interface IRestCustomerByIdKeys {
    id: number;
}

export default new class CustomersController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestCustomersCreate>rest.getBody();

            if (!bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NAME_RU')
                });
            }

            const Customer = new Customers;

            Customer.name_ru = bodyParams.name_ru;

            if (bodyParams.name_kz) {
                Customer.name_kz = bodyParams.name_kz
            }

            const existCustomer = await getManager().getRepository(Customers).findOne({
                where: [{
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existCustomer && existCustomer.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_CUSTOMER_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_CUSTOMER_WITH_NAME_RU_EXISTS,
                    message: req.__('EXISTS_ALREADY_NAME_RU')
                });
            }

            const customer = await getManager().getRepository(Customers).save(Customer);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: customer.id,
                    name_ru: customer.name_ru,
                    name_kz: customer.name_kz
                },
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

    async getCustomersList(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestCustomersList = <IRestCustomersList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz'];

            const customers = await getManager().getRepository(Customers).find(config);
            const totalCount = await getManager().getRepository(Customers).count();

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: customers,
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

    async getCustomerById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const config = <FindManyOptions<Customers>>{};
            const {id} = <IRestCustomerByIdKeys>rest.getKeys();

            config.select = ['id', 'name_ru', 'name_kz'];
            config.where = {id};

            const customer = await getManager().getRepository(Customers).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: customer,
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
            const {id} = req.params;

            const customer = await getManager().getRepository(Customers).findOne({
                where: {
                    id
                }
            });

            if (!customer) {
                return res.send({
                    code: 'ERROR_CODE_CUSTOMER_NOT_EXISTS',
                    errorCode: ERROR_CODE_CUSTOMER_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
                });
            }
            await getManager().getRepository(Customers).remove(customer);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }
}
