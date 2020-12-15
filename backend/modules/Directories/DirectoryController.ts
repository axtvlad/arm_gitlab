import {Request, Response} from "express";
import {FindManyOptions, getConnection, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Categories, Cities, Customers, Departments, Directory, Genders, Roles, Statuses, Types} from "./DirectoryModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_DEPARTMENT_NOT_EXISTS,
    ERROR_CODE_DIRECTORY_RECORD_WITH_NAME_KZ_EXISTS,
    ERROR_CODE_DIRECTORY_RECORD_WITH_NAME_RU_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';

interface IRestDirectoryFields {
    name_ru: string;
    name_kz: string;
}

interface IRestDirectoryUpdate {
    name_ru?: string;
    name_kz?: string;
}

interface IRestDirectoryList {
    page?: number
    count?: number
}

interface IRestDirectoryByIdKeys {
    id: number;
}

interface IRestDirectoryNameKey {
    directoryName: DirectoryNameEnum
}

enum DirectoryNameEnum {
    categories = 'categories',
    cities = 'cities',
    customers = 'customers',
    departments = 'departments',
    genders = 'genders',
    roles = 'roles',
    statuses = 'statuses',
    types = 'types'
}

const getDirectoryRepository = (directoryName: string) => {
    switch (directoryName) {
        case DirectoryNameEnum.categories:
            return Categories
        case DirectoryNameEnum.cities:
            return Cities
        case DirectoryNameEnum.customers:
            return Customers
        case DirectoryNameEnum.departments:
            return Departments
        case DirectoryNameEnum.genders:
            return Genders
        case DirectoryNameEnum.statuses:
            return Statuses
        case DirectoryNameEnum.types:
            return Types
        case DirectoryNameEnum.roles:
            return Roles
    }
}

export default new class DirectoryController {
    async createDirectoryRecord(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestDirectoryFields>rest.getBody();
            const {directoryName} = <IRestDirectoryNameKey>rest.getKeys();

            if (!Object.keys(DirectoryNameEnum).includes(directoryName)) {
                return res.send({
                    errorCode: 3,
                    message: req.__('Справочник с таким названием не существует')
                });
            }

            if (!bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NAME_RU')
                });
            } else if (!bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_NAME_KZ',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_NAME_KZ')
                });
            }

            const repository = getDirectoryRepository(directoryName)
            const DirectoryRecord = new repository

            DirectoryRecord.name_kz = bodyParams.name_kz;
            DirectoryRecord.name_ru = bodyParams.name_ru;

            const existDirectory = await getManager().getRepository(repository).findOne({
                where: [{
                    name_kz: bodyParams.name_kz
                }, {
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existDirectory && existDirectory.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_DIRECTORY_RECORD_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_DIRECTORY_RECORD_WITH_NAME_KZ_EXISTS,
                    message: req.__('DIRECtORY_EXISTS_ALREADY_BY_NAME_KZ')
                });
            } else if (existDirectory && existDirectory.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_DIRECTORY_RECORD_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_DIRECTORY_RECORD_WITH_NAME_RU_EXISTS,
                    message: req.__('DIRECtORY_EXISTS_ALREADY_BY_NAME_RU')
                });
            }

            const directory = await getManager().getRepository(repository).save(DirectoryRecord);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: directory.id,
                    name_ru: directory.name_ru,
                    name_kz: directory.name_kz
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

    async getDirectoryRecordsList(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestDirectoryList = <IRestDirectoryList>rest.getQuery();
            const {directoryName} = <IRestDirectoryNameKey>rest.getKeys();

            const config = {} as FindManyOptions;

            if (!Object.keys(DirectoryNameEnum).includes(directoryName)) {
                return res.send({
                    errorCode: 3,
                    message: req.__('Справочник с таким названием не существует')
                });
            }

            if (queryParams.page && queryParams.count) {
                config.skip = queryParams.page - 1;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 10;
            }

            config.select = ['id', 'name_ru', 'name_kz'];

            const repository = getDirectoryRepository(directoryName)

            const directory = await getManager().getRepository(repository).find(config)
            const totalCount = await getManager().getRepository(repository).count()

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: directory,
                totalCount: totalCount,
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

    async getDirectoryRecordById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req)
            const config = <FindManyOptions<Directory>>{}
            const {id} = <IRestDirectoryByIdKeys>rest.getQuery()
            const {directoryName} = <IRestDirectoryNameKey>rest.getKeys()

            if (!Object.keys(DirectoryNameEnum).includes(directoryName)) {
                return res.send({
                    errorCode: 3,
                    message: req.__('Справочник с таким названием не существует')
                });
            }

            config.select = ['id', 'name_ru', 'name_kz']
            config.where = {id}

            const repository = getDirectoryRepository(directoryName)
            const directoryRecord = await getManager().getRepository(repository).find(config)

            if (directoryRecord.length === 0) {
                return res.send({
                    code: 'Записи с таким id не существует',
                    errorCode: ERROR_CODE_BAD_REQUEST,
                    message: req.__('UNKNOWN_ERROR')
                });
            }

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: directoryRecord[0],
                message: req.__('Записи с таким id не существует')
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

    async removeDirectoryRecordById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req)
            const {id} = <IRestDirectoryByIdKeys>rest.getQuery()
            const {directoryName} = <IRestDirectoryNameKey>rest.getKeys()

            if (!Object.keys(DirectoryNameEnum).includes(directoryName)) {
                return res.send({
                    errorCode: 3,
                    message: req.__('Справочник с таким названием не существует')
                });
            }

            const repository = getDirectoryRepository(directoryName)
            const directoryRecord = await getManager().getRepository(repository).findOne({
                where: {
                    id
                }
            });

            if (!directoryRecord) {
                return res.send({
                    code: 'ERROR_CODE_DIRECTORY_RECORD_NOT_EXISTS',
                    errorCode: ERROR_CODE_DEPARTMENT_NOT_EXISTS,
                    message: req.__('ERROR_CODE_DIRECTORY_RECORD_NOT_EXISTS')
                });
            }

            await getManager().getRepository(repository).remove(directoryRecord);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: directoryRecord,
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

    async updateDirectoryRecordById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestDirectoryUpdate>rest.getBody();
            const config = <FindManyOptions<Directory>>{};
            const {id} = <IRestDirectoryByIdKeys>rest.getQuery();
            const {directoryName} = <IRestDirectoryNameKey>rest.getKeys()

            await getConnection()
                .createQueryBuilder()
                .update(Departments)
                .set(bodyParams)
                .where({id: id})
                .execute();

            config.select = ['id', 'name_ru', 'name_kz'];
            config.where = {id};

            const repository = getDirectoryRepository(directoryName)
            const updatedDirectoryRecord = await getManager().getRepository(repository).find(config)

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: updatedDirectoryRecord[0],
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
}
