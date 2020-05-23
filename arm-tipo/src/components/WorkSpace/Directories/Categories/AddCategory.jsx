import {Button, Form, Input} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import React from "react";

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const AddCategory = (props) => {
    const [form] = Form.useForm();

    let fromState = {
        name_ru: props.categoriesDir.newCategoryNameRu,
        name_kz: props.categoriesDir.newCategoryNameKz
    };

    console.log(fromState);

    form.setFieldsValue(fromState);

    const addCategory = (values) => {
        console.log('Received values of form: ', values);
        props.addCategory();
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;
        props.updateCategoryNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;
        props.updateCategoryNameKz(name_kz);
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
                    label={'Наименование категории (ru)'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите наименование категории на русском!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={'Введите категорию на русском!'} onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={'Наименование категории (kz)'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите категорию на казахском!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={'Введите категорию на казахском!'}
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
                        Сохранить в базу
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddCategory;