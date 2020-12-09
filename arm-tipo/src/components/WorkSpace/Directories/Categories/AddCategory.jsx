import {Button, Form, Input} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {WalletOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";

const AddCategory = ({postCategory}) => {
    const {t} = useTranslation();
    const [isSaved, setIsSaved] = useState(false)

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const onSubmit = (formData) => {
        postCategory(formData).then(() => {
            setIsSaved(true);
        })
    };

    return (
        <div className={'content'}>
            <Form
                name={'add_category_form'}
                {...formItemLayout}
                onFinish={onSubmit}
            >
                <Form.Item
                    name={'name_ru'}
                    label={t('categoryNameRu')}
                    rules={[{
                        required: true,
                        message: `${t('enterCategoryNameRu')} !`
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterCategoryNameRu')}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('categoryNameKz')}
                    rules={[{
                        required: true,
                        message: `${t('enterCategoryNameKz')} !`
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterCategoryNameKz')}/>
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
                    <NavLink to={'/categories'}>
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

export default AddCategory;