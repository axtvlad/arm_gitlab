import React, {useState} from 'react';
import {Button, Form, Input,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {WalletOutlined} from "@ant-design/icons";

const AddStatus = ({postStatus}) => {
    const {t} = useTranslation();
    const [isSaved, setIsSaved] = useState(false)

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const onSubmit = (formData) => {
        postStatus(formData).then(() => {
            setIsSaved(true)
        })
    };

    return (
        <div className={'content'}>
            <Form
                name="add_status_form"
                {...formItemLayout}
                onFinish={onSubmit}
            >
                <Form.Item
                    name={'name_ru'}
                    label={t('statusNameRu')}
                    rules={[{
                        required: true,
                        message: t('enterStatusNameRu') + '!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterStatusNameRu')}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('statusNameKz')}
                    rules={[{
                        required: true,
                        message: t('enterStatusNameKz') + '!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterStatusNameKz')}/>
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
                    <NavLink to={'/statuses'}>
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

export default AddStatus;