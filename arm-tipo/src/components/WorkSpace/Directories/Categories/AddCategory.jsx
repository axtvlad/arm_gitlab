import {Button, Form, Input, notification} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import React from "react";
import {useTranslation} from "react-i18next";

const AddCategory = ({categoriesDir, postCategory, updateCategoryNameRu, updateCategoryNameKz}) => {
    const {t} = useTranslation();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const [form] = Form.useForm();

    const fromState = {
        name_ru: categoriesDir.newCategoryNameRu,
        name_kz: categoriesDir.newCategoryNameKz
    };

    console.log(fromState);

    form.setFieldsValue(fromState);

    const successfulAdd = (item) => {
        notification['success']({
            message: 'Сохранено!',
            description: `Запись ${item.name_ru} была успешно добавлена!`,
            placement: 'bottomRight'
        });
    };

    const addCategory = (values) => {
        console.log('Received values of form: ', values);

        postCategory(fromState);

        successfulAdd(fromState);
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;

        updateCategoryNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;

        updateCategoryNameKz(name_kz);
    };

    return (
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={addCategory}
                form={form}
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
                    <Input placeholder={t('enterCategoryNameRu')} onChange={changeNameRu}/>
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
                    <Input
                        placeholder={t('enterCategoryNameKz')}
                        onChange={changeNameKz}
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

export default AddCategory;