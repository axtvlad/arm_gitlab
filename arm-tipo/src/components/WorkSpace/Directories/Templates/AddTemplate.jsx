import React from 'react';
import {Button, Form, Input, notification, Select} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";

const AddTemplate = (
    {
        templatesDir, updateTemplateCategoryId, updateTemplateNameRu, updateTemplateNameKz, updateTemplateFileRu,
        updateTemplateFileKz, postTemplate, categories
    }
) => {
    const {t} = useTranslation();
    const {Option} = Select;

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    // const normFile = e => {
    //     console.log('Upload event:', e);
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e && e.fileList;
    // };

    const [form] = Form.useForm();

    const fromState = {
        category_id: templatesDir.category_id,
        name_ru: templatesDir.newNameRu,
        name_kz: templatesDir.newNameKz,
        file_ru: templatesDir.newFileRu,
        file_kz: templatesDir.newFileKz,
    };

    console.log('fromState', fromState);

    form.setFieldsValue(fromState);

    const successfulAdd = (item) => {
        notification['success']({
            message: 'Сохранено!',
            description: 'Запись "' + item.name_ru + '" была успешно добавлена!',
            placement: 'bottomRight'
        });
    };

    const changeCategoryId = (category_id) => {
        updateTemplateCategoryId(category_id);
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;

        updateTemplateNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;

        updateTemplateNameKz(name_kz);
    };

    const changeFileRu = () => {
        const file_ru = form.getFieldValue().file_ru;

        updateTemplateFileRu(file_ru);
    };

    const changeFileKz = () => {
        const file_kz = form.getFieldValue().file_kz;

        updateTemplateFileKz(file_kz);
    };

    const saveDoc = (values) => {
        console.log('Received values of form: ', values);

        postTemplate(fromState);

        successfulAdd(fromState);
    };

    return (
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={saveDoc}
                form={form}
            >
                <Form.Item
                    name={'category_id'}
                    label={t('category')}
                    hasFeedback
                    rules={[{
                        required: true,
                        message: t('chooseCategory') + '!'
                    }]}
                >
                    <Select
                        placeholder={t('chooseCategory')}
                        onChange={changeCategoryId}
                    >
                        {categories.map(category =>
                            <Option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name_ru}
                            </Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item
                    name={'name_ru'}
                    label={t('templateNameRu')}
                    rules={[{
                        required: true,
                        message: t('enterTemplateNameRu') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterTemplateNameRu')}
                        onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('templateNameKz')}
                >
                    <Input
                        placeholder={t('enterTemplateNameKz')}
                        onChange={changeNameKz}
                    />
                </Form.Item>

                <Form.Item
                    name={'file_ru'}
                    label={t('attachFileRu')}
                >
                    <Input
                        placeholder={t('chooseFile')}
                        onChange={changeFileRu}
                    />
                </Form.Item>

                <Form.Item
                    name={'file_kz'}
                    label={t('attachFileKz')}
                >
                    <Input
                        placeholder={t('chooseFile')}
                        onChange={changeFileKz}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button
                        type="danger"
                        htmlType="submit"
                        icon={<DownloadOutlined/>}
                        block
                    >
                        {t('saveInBase')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default AddTemplate;