import React, {useState} from 'react';
import {Button, Form, Input,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";
import {Redirect} from "react-router-dom";

const AddFaq = ({postFaq}) => {
    const {t} = useTranslation();
    const [isSaved, setIsSaved] = useState(false)

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const onSubmit = (formData) => {
        postFaq(formData).then(() => {
            setIsSaved(true)
        })
    };

    return (
        <div className={'content'}>
            {isSaved && <Redirect to={'/faqs'}/>}
            <Form
                name="add_faq_form"
                {...formItemLayout}
                onFinish={onSubmit}
            >
                <Form.Item
                    name={'question_ru'}
                    label={t('questionRu')}
                    rules={[{
                        required: true,
                        message: `${t('enterQuestionRu')} !`
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterQuestionRu')}/>
                </Form.Item>

                <Form.Item
                    name={'question_kz'}
                    label={t('questionKz')}
                    rules={[{
                        required: true,
                        message: `${t('enterQuestionKz')} !`
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterQuestionKz')}/>
                </Form.Item>

                <Form.Item
                    name={'answer_ru'}
                    label={t('answerRu')}
                    rules={[{
                        required: true,
                        message: `${t('enterAnswerRu')} !`
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterAnswerRu')}/>
                </Form.Item>

                <Form.Item
                    name={'answer_kz'}
                    label={t('answerKz')}
                    rules={[{
                        required: true,
                        message: `${t('enterAnswerKz')} !`
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterAnswerKz')}/>
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