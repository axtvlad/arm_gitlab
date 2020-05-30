import React from 'react';
import {Button, Form, Input, notification, Select, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

const AddTemplate = (props) => {

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
                    label={'Категория'}
                    hasFeedback
                    rules={[{required: true, message: 'Пожалуйста, выберите категорию!'}]}
                >
                    <Select placeholder={'Выберите категорию!'} onChange={changeCategoryId}>
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
                    label={'Наименование шаблона (ru)'}
                    rules={[{required: true, message: 'Пожалуйста, введите наименование шаблона на русском!'}]}
                    hasFeedback
                >
                    <Input placeholder={'Введите наименование шаблона на русском!'} onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={'Наименование шаблона (kz)'}
                >
                    <Input placeholder={'Введите наименование шаблона на казахском!'} onChange={changeNameKz}/>
                </Form.Item>

                <Form.Item
                    name={'file_ru'}
                    label={'Прикрепите файл (ru)'}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture" onChange={changeFileRu}>
                        <Button>
                            <UploadOutlined/> Выбрать
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name={'file_kz'}
                    label={'Прикрепите файл (kz)'}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture" onChange={changeFileKz}>
                        <Button>
                            <UploadOutlined/> Выбрать
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
                        Сохранить в базу
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default AddTemplate;