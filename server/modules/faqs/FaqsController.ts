import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_FAQ_NOT_EXISTS,
    ERROR_CODE_FAQ_WITH_QUESTION_RU_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED
} from '../../services/ServiceRestCodes';
import {Faqs} from "./FaqsModel";
import ServiceLocale from "../../services/ServiceLocale";

interface IRestFaqsCreate {
    question_ru: string;
    question_kz?: string;
    answer_ru: string;
    answer_kz?: string;
}

interface IRestFaqsList {
    offset?: number;
    count?: number;
}

interface IRestFaqByIdKeys {
    id: number;
}

export default new class FaqsController {
    async create(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const bodyParams = <IRestFaqsCreate>rest.getBody();

            if (!bodyParams.question_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_QUESTION_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_QUESTION_RU')
                });
            } else if (!bodyParams.answer_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_ANSWER_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: req.__('PASSED_PARAM_ANSWER_RU')
                });
            }

            const Faq = new Faqs;

            Faq.question_ru = bodyParams.question_ru;
            Faq.answer_ru = bodyParams.answer_ru;

            if (bodyParams.question_kz) {
                Faq.question_kz = bodyParams.question_kz;
            } else if (bodyParams.answer_kz) {
                Faq.answer_kz = bodyParams.answer_kz;
            }

            const existFaq = await getManager().getRepository(Faqs).findOne({
                where: [{
                    question_ru: bodyParams.question_ru
                }]
            });

            if (existFaq && existFaq.question_ru === bodyParams.question_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_FAQ_WITH_QUESTION_RU_EXISTS',
                    errorCode: ERROR_CODE_FAQ_WITH_QUESTION_RU_EXISTS,
                    message: req.__('EXISTS_ALREADY_QUESTION_RU')
                });
            }

            const faq = await getManager().getRepository(Faqs).save(Faq);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: faq.id,
                    question_ru: faq.question_ru,
                    question_kz: faq.question_kz,
                    answer_ru: faq.answer_ru,
                    answer_kz: faq.answer_kz
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

    async getFaqsList(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const queryParams: IRestFaqsList = <IRestFaqsList>rest.getQuery();

            const config = {} as FindManyOptions;

            if (queryParams.offset && queryParams.count) {
                config.skip = queryParams.offset;
                config.take = queryParams.count;
            } else {
                config.skip = 0;
                config.take = 30;
            }

            config.select = ['id', 'question_ru', 'question_kz', 'answer_ru', 'answer_kz'];

            const faqs = await getManager().getRepository(Faqs).find(config);
            const totalCount = await getManager().getRepository(Faqs).count();

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: faqs,
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

    async getFaqById(req: Request, res: Response) {
        try {
            const rest = new ServiceRest(req);
            const config = <FindManyOptions<Faqs>>{};
            const {id} = <IRestFaqByIdKeys>rest.getKeys();

            config.select = ['id', 'question_ru', 'question_kz', 'answer_ru', 'answer_kz'];
            config.where = {id};

            const faq = await getManager().getRepository(Faqs).find(config);

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: faq,
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

            const faq = await getManager().getRepository(Faqs).findOne({
                where: {
                    id
                }
            });

            if (!faq) {
                return res.send({
                    code: 'ERROR_CODE_FAQ_NOT_EXISTS',
                    errorCode: ERROR_CODE_FAQ_NOT_EXISTS,
                    message: ServiceLocale.setVariableValues(req.__('EXISTS_NOT_BY_ID'), id)
                });
            }

            await getManager().getRepository(Faqs).remove(faq);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: id,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {

        }
    }
}
