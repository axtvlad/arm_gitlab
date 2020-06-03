import React from 'react';
import {Button, Form, Input, notification,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";

const AddFaq = (props) => {

    const {t} = useTranslation();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const [form] = Form.useForm();

    let fromState = {
        question_ru: props.faqsDir.newFaqQuestionRu,
        question_kz: props.faqsDir.newFaqQuestionKz,
        answer_ru: props.faqsDir.newFaqAnswerRu,
        answer_kz: props.faqsDir.newFaqAnswerKz,
    };

    console.log(fromState);

    form.setFieldsValue(fromState);

    const successfulAdd = (item) => {
        notification['success']({
            message: 'Сохранено!',
            description: 'Запись "' + item.question_ru + '" была успешно добавлена!',
            placement: 'bottomRight'
        });
    };

    const addFaq = (values) => {
        console.log('Received values of form: ', values);

        props.postFaq(fromState);

        successfulAdd(fromState);
    };

    const changeQuestionRu = () => {
        const question_ru = form.getFieldValue().question_ru;
        props.updateFaqQuestionRu(question_ru);
    };

    const changeQuestionKz = () => {
        const question_kz = form.getFieldValue().question_kz;
        props.updateFaqQuestionKz(question_kz);
    };

    const changeAnswerRu = () => {
        const answer_ru = form.getFieldValue().answer_ru;
        props.updateFaqAnswerRu(answer_ru);
    };

    const changeAnswerKz = () => {
        const answer_kz = form.getFieldValue().answer_kz;
        props.updateFaqAnswerKz(answer_kz);
    };

    return (
        <div className={'content'}>
             <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={addFaq}
                form={form}
            >
                <Form.Item
                    name={'question_ru'}
                    label={t('questionRu')}
                    rules={[{
                        required: true,
                        message: t('enterQuestionRu') + '!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterQuestionRu')}
                           onChange={changeQuestionRu}
                    />
                </Form.Item>

                <Form.Item
                    name={'question_kz'}
                    label={t('questionKz')}
                    rules={[{
                        required: true,
                        message: t('enterQuestionKz') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterQuestionKz')}
                        onChange={changeQuestionKz}
                    />
                </Form.Item>

                 <Form.Item
                     name={'answer_ru'}
                     label={t('answerRu')}
                     rules={[{
                         required: true,
                         message: t('enterAnswerRu') + '!'
                     }]}
                     hasFeedback
                 >
                     <Input placeholder={t('enterAnswerRu')}
                            onChange={changeAnswerRu}
                     />
                 </Form.Item>

                 <Form.Item
                    name={'answer_kz'}
                    label={t('answerKz')}
                    rules={[{
                        required: true,
                        message: t('enterAnswerKz') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterAnswerKz')}
                        onChange={changeAnswerKz}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button
                        type={'danger'}
                        htmlType={'submit'}
                        icon={<DownloadOutlined/>}
                        block
                    >
                        {t('saveInBase')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddFaq;