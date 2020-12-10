import {Button, Form, Input} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import React from "react";
import {useTranslation} from "react-i18next";

const EditDirectory = ({onSubmit, currentItem, editModeOff}) => {
    const {t} = useTranslation();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const onFinish = (formData) => {
        onSubmit(currentItem.id, formData).then(() => {
            editModeOff()
        })
    };

    return (
        <div className={'content'}>
            <Form
                name={'EDIT_DIRECTORY_ITEM_FORM'}
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    name_ru: currentItem.name_ru,
                    name_kz: currentItem.name_kz
                }}
            >
                <Form.Item
                    name={'name_ru'}
                    label={t('Наименование на русском')}
                    hasFeedback
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('Наименование на казахском')}
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
                        {t('Сохранить')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditDirectory;