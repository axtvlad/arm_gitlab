import {Button, Form, Input} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {WalletOutlined} from "@ant-design/icons";

const AddCustomer = ({postCustomer, updateCustomerNameRu, updateCustomerNameKz}) => {
    const {t} = useTranslation();
    const [isSaved, setIsSaved] = useState(false)

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const onSubmit = (formData) => {
        postCustomer(formData).then(() => {
            setIsSaved(true)
        })
    };

    return (
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={onSubmit}
            >
                <Form.Item
                    name={'name_ru'}
                    label={t('customerNameRu')}
                    rules={[{
                        required: true,
                        message: `${t('enterCustomerNameRu')} !`
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterCustomerNameRu')}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('customerNameKz')}
                    rules={[{
                        required: true,
                        message: `${t('enterCustomerNameKz')} !`
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterCustomerNameKz')}/>
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
                    <NavLink to={'/customers'}>
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

export default AddCustomer;