import {Request, Response} from "express";
import {FindManyOptions, getManager} from "typeorm";
import ServiceRest from "../../services/ServiceRest";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_FAQ_NOT_EXISTS,
    ERROR_CODE_FAQ_WITH_QUESTION_KZ_EXISTS,
    ERROR_CODE_FAQ_WITH_QUESTION_RU_EXISTS,
    ERROR_CODE_NONE,
    ERROR_CODE_PARAMETER_NOT_PASSED
} from '../../services/ServiceRestCodes';
import {Faqs} from "./FaqsModel";

interface IRestFaqsCreate {
    question_ru: string;
    question_kz: string;
    answer_ru: string;
    answer_kz: string;
}

interface IRestFaqsList {
    offset?: number;
    count?: number;
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
                    message: 'Question_ru parameter not passed'
                });
            } else if (!bodyParams.question_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_QUESTION_KZ',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Question_kz parameter not passed'
                });
            } else if (!bodyParams.answer_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_ANSWER_RU',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Answer_ru parameter not passed'
                });
            } else if (!bodyParams.answer_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_PARAMETER_NOT_PASSED_ANSWER_KZ',
                    errorCode: ERROR_CODE_PARAMETER_NOT_PASSED,
                    message: 'Answer_kz parameter not passed'
                });
            }

            const Faq = new Faqs;
            Faq.question_kz = bodyParams.question_kz;
            Faq.question_ru = bodyParams.question_ru;
            Faq.answer_kz = bodyParams.answer_kz;
            Faq.answer_ru = bodyParams.answer_ru;

            const existFaq = await getManager().getRepository(Faqs).findOne({
                where: [{
                    question_ru: bodyParams.question_ru
                }, {
                    question_kz: bodyParams.question_kz
                }]
            });

            if (existFaq && existFaq.question_ru === bodyParams.question_ru) {
                return res.status(400).send({
                    code: 'ERROR_CODE_FAQ_WITH_QUESTION_RU_EXISTS',
                    errorCode: ERROR_CODE_FAQ_WITH_QUESTION_RU_EXISTS,
                    message: 'A FAQ with that question_ru already exists.'
                });
            } else if (existFaq && existFaq.question_kz === bodyParams.question_kz) {
                return res.status(400).send({
                    code: 'ERROR_CODE_FAQ_WITH_QUESTION_KZ_EXISTS',
                    errorCode: ERROR_CODE_FAQ_WITH_QUESTION_KZ_EXISTS,
                    message: 'A FAQ with that question_kz already exists.'
                });
            }

            const faq = await getManager().getRepository(Faqs).save(Faq);

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: {
                    id: faq.id,
                    question_kz: faq.question_kz,
                    question_ru: faq.question_ru,
                    answer_kz: faq.answer_kz,
                    answer_ru: faq.answer_ru,
                },
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: 'An unknown error has occurred.'
            });
        }
    }

    async list(req: Request, res: Response) {
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

            /**
             * custom sql
             */
            // const users = await getManager().query('SELECT userId, username, createdDate FROM users LIMIT 5 OFFSET 0');

            return res.send({
                errorCode: ERROR_CODE_NONE,
                data: faqs,
                message: req.__('MESSAGE_OK')
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                code: 'ERROR_CODE_BAD_REQUEST',
                errorCode: ERROR_CODE_BAD_REQUEST,
                message: 'An unknown error has occurred.'
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
                    message: `FAQ by id ${id} is not exists`
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
