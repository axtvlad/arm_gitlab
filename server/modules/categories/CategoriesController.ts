import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {Categories} from "./CategoriesModel";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_CATEGORY_NOT_EXISTS,
    ERROR_CODE_CATEGORY_WITH_NAME_KZ_EXISTS,
    ERROR_CODE_CATEGORY_WITH_NAME_RU_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED,
} from '../../services/ServiceRestCodes';
import ServiceLocale from "../../services/ServiceLocale";

interface IRestCategoriesCreate {
    name_ru: string;
    name_kz: string;
}

interface IRestCategoriesList {
    offset?: number;
    count?: number;
}

export default new class CategoriesController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestCategoriesCreate>rest.getBody();

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

            const Category = new Categories;
            Category.name_kz = bodyParams.name_kz;
            Category.name_ru = bodyParams.name_ru;

            const existCategory = await getManager().getRepository(Categories).findOne({
                where: [{
                    name_kz: bodyParams.name_kz
                }, {
                    name_ru: bodyParams.name_ru
                }]
            });

            if (existCategory && existCategory.name_kz === bodyParams.name_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_CATEGORY_WITH_NAME_KZ_EXISTS',
                    errorCode: ERROR_CODE_CATEGORY_WITH_NAME_KZ_EXISTS,
                    message: req.__('EXISTS_ALREADY_NAME_KZ')
                });
            } else if (existCategory && existCategory.name_ru === bodyParams.name_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_CATEGORY_WITH_NAME_RU_EXISTS',
                    errorCode: ERROR_CODE_CATEGORY_WITH_NAME_RU_EXISTS,
                    message: req.__('EXISTS_ALREADY_NAME_RU')
                });
            }

            const category = await getManager().getRepository(Categories).save(Category);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: category.id,
                    name_ru: category.name_ru,
                    name_kz: category.name_kz
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

    async list(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestCategoriesList = <IRestCategoriesList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'name_ru', 'name_kz'];

            const categories = await getManager().getRepository(Categories).find(config);
            const totalCount = await getManager().getRepository(Categories).count();

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: categories,
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

    async remove(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const category = await getManager().getRepository(Categories).findOne({
                where: {
                    id
                }
            });

            if (!category) {
                return res.send({
                    code: 'ERROR_CODE_CATEGORY_NOT_EXISTS',
                    errorCode: ERROR_CODE_CATEGORY_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
                });
            }
            await getManager().getRepository(Categories).remove(category);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }
}
