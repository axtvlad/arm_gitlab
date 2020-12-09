import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {WalletOutlined} from "@ant-design/icons";

const AddCity = ({postCity}) => {
    const {t} = useTranslation();
    const [isSaved, setIsSaved] = useState(false)

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const onSubmit = (formData) => {
        postCity(formData).then(() => {
            setIsSaved(true);
        })
    };

    return (
        <div className={'content'}>
            <Form
                name="add_city_form"
                {...formItemLayout}
                onFinish={onSubmit}
            >
                <Form.Item
                    name={'name_ru'}
                    label={t('cityNameRu')}
                    rules={[{
                        required: true,
                        message: `${t('enterCityNameRu')} !`
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterCityNameRu')}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('cityNameKz')}
                    rules={[{
                        required: true,
                        message: `${t('enterCityNameKz')} !`
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterCityNameKz')}/>
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
                    <NavLink to={'/cities'}>
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

export default AddCity;