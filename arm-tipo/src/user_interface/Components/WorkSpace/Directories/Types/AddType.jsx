import React from 'react';
import {Button, Form, Input,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const AddType = (props) => {
    const [form] = Form.useForm();
    form.setFieldsValue({name_ru: props.directories.newTypeNameRu, name_kz: props.directories.newTypeNameKz});

    console.log('from state: ' + props.directories.newTypeNameRu + ' - ' + props.directories.newTypeNameKz);

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const saveDoc = () => {
        props.addType();
        props.updateTypeNameRu('');
        props.updateTypeNameKz('');
    };

    const onChangeNameRu = () => {
        const ru = form.getFieldValue().name_ru;
        props.updateTypeNameRu(ru)
    };

    const onChangeNameKz = () => {
        const kz = form.getFieldValue().name_kz;
        props.updateTypeNameKz(kz)
    };

    return (
        <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            form={form}
        >
            <Form.Item
                name={'name_ru'}
                label={'Наименование (ru)'}
                rules={[{required: true, message: 'Пожалуйста, введите наименование типа на русском!'}]}
                hasFeedback
            >
                <Input placeholder={'Введите наименование типа на русском!'} onChange={onChangeNameRu}/>
            </Form.Item>

            <Form.Item
                name={'name_kz'}
                label={'Наименование (kz)'}
                rules={[{required: true, message: 'Пожалуйста, введите наименование типа на казахском!'}]}
                hasFeedback
            >
                <Input
                    placeholder={'Введите наименование типа на казахском!'}
                    onChange={onChangeNameKz}
                />
            </Form.Item>

            <Form.Item wrapperCol={{span: 12, offset: 6}}>
                <Button
                    type={'danger'}
                    htmlType={'submit'}
                    icon={<DownloadOutlined/>}
                    block
                    onClick={saveDoc}
                >
                    Сохранить в базу
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddType;