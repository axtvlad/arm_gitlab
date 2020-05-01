import React from 'react';
import {Button, Form, Input,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const AddFaq = (props) => {
    const [form] = Form.useForm();

    let fromState = {
        question_ru: props.faqsDir.newFaqQuestionRu,
        question_kz: props.faqsDir.newFaqQuestionKz,
        answer_ru: props.faqsDir.newFaqAnswerRu,
        answer_kz: props.faqsDir.newFaqAnswerKz,
    };

    console.log(fromState);

    form.setFieldsValue(fromState);

    const addFaq = (values) => {
        console.log('Received values of form: ', values);
        props.addFaq();
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
                    label={'Вопрос (ru)'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите вопроса на русском!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={'Введите вопроса на русском!'}
                           onChange={changeQuestionRu}
                    />
                </Form.Item>

                <Form.Item
                    name={'question_kz'}
                    label={'Вопрос (kz)'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите вопрос на казахском!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={'Введите вопрос на казахском!'}
                        onChange={changeQuestionKz}
                    />
                </Form.Item>

                 <Form.Item
                     name={'answer_ru'}
                     label={'Ответ (ru)'}
                     rules={[{
                         required: true,
                         message: 'Пожалуйста, введите ответ на русском!'
                     }]}
                     hasFeedback
                 >
                     <Input placeholder={'Введите ответ на вопрос на русском!'}
                            onChange={changeAnswerRu}
                     />
                 </Form.Item>

                 <Form.Item
                    name={'answer_kz'}
                    label={'Ответ (kz)'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите ответ на казахском!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={'Введите ответ на казахском!'}
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
                        Сохранить в базу
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddFaq;