import {Button, Form, Input} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Redirect} from "react-router-dom";

const AddDirectoryItemForm = ({onSubmit, redirectTo}) => {
    const {t} = useTranslation();
    const [isSaved, setIsSaved] = useState(false)

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const onFinish = (formData) => {
        onSubmit(redirectTo.substring(1) ,formData).then(() => {
            setIsSaved(true);
        })
    };

    return (
        <div className={'content'}>
            {isSaved && <Redirect to={redirectTo}/>}
            <Form
                name={'ADD_DIRECTORY_ITEM_FORM'}
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item
                    name={'name_ru'}
                    label={t('Наименование на русском')}
                    rules={[{
                        required: true,
                        message: t('Заполните поле')
                    }]}
                    hasFeedback
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('Наименование на казахском')}
                    rules={[{
                        required: true,
                        message: t('Заполните поле')
                    }]}
                    hasFeedback
                >
                    <Input/>
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

export default AddDirectoryItemForm;