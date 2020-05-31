import React from 'react';
import {Button, Form, Input, notification, Select, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";

const AddTemplate = (props) => {

    const {t} = useTranslation();

    const {Option} = Select;

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const [form] = Form.useForm();

    let fromState = {
        category_id: props.templatesDir.category_id,
        name_ru: props.templatesDir.newTemplateNameRu,
        name_kz: props.templatesDir.newTemplateNameKz,
        file_ru: props.templatesDir.newFileNameRu,
        file_kz: props.templatesDir.newFileNameKz,
    };

    console.log(fromState);

    form.setFieldsValue(fromState);

    const successfulAdd = (item) => {
        notification['success']({
            message: 'Сохранено!',
            description: 'Запись "' + item.name_ru + '" была успешно добавлена!',
            placement: 'bottomRight'
        });
    };

    const changeCategoryId = (category_id) => {
        props.updateTemplateCategoryId(category_id);
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;
        props.updateTemplateNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;
        props.updateTemplateNameKz(name_kz);
    };

    const changeFileRu = () => {
        const file_ru = form.getFieldValue().file_ru;
        props.updateTemplateFileNameRu(file_ru);
    };

    const changeFileKz = () => {
        const file_kz = form.getFieldValue().file_kz;
        props.updateTemplateFileNameKz(file_kz);
    };

    const saveDoc = (values) => {
        console.log('Received values of form: ', values);

        props.postTemplate(fromState);

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
                        {props.categories.map(category =>
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
                        onChange={changeNameKz}/>
                </Form.Item>

                <Form.Item
                    name={'file_ru'}
                    label={t('attachFileRu')}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture" onChange={changeFileRu}>
                        <Button>
                            <UploadOutlined/> {t('chooseFile')}
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name={'file_kz'}
                    label={t('attachFileKz')}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture" onChange={changeFileKz}>
                        <Button>
                            <UploadOutlined/> {t('chooseFile')}
                        </Button>
                    </Upload>
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