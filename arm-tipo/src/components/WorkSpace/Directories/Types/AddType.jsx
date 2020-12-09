import React, {useState} from 'react';
import {Button, Form, Input,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {WalletOutlined} from "@ant-design/icons";

const AddType = ({postType}) => {
    const {t} = useTranslation();
    const [isSaved, setIsSaved] = useState(false)

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const onSubmit = (formData) => {
        postType(formData).then(() => {
            setIsSaved(true)
        })
    };

    return (
        <div className={'content'}>
            <Form
                name="add_type_form"
                {...formItemLayout}
                onFinish={onSubmit}
            >
                <Form.Item
                    name={'name_ru'}
                    label={t('typeNameRu')}
                    rules={[{
                        required: true,
                        message: t('enterTypeNameRu') + '!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterTypeNameRu')}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('typeNameKz')}
                    rules={[{
                        required: true,
                        message: t('enterTypeNameKz') + '!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterTypeNameKz')}/>
                </Form.Item>

                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button
                        type={'danger'}
                        htmlType={'submit'}
                        icon={<DownloadOutlined/>}
                        block
                        disabled={isSaved}
                    >
                        {t('saveInBase')}
                    </Button>
                </Form.Item>

                {isSaved &&
                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <NavLink to={'/types'}>
                        <Button
                            icon={<WalletOutlined/>}
                            block
                        >
                            Вернуться к списку
                        </Button>
                    </NavLink>
                </Form.Item>
                }
            </Form>
        </div>
    );
};

export default AddType;