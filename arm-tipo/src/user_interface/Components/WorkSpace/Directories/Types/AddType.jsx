import React from 'react';
import {Button, Form, Input,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {addTypeCreator, updateTypeNameKzCreator, updateTypeNameRuCreator} from "../../../../../redux/TypeReducer";

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const AddType = (props) => {
    const [form] = Form.useForm();
    form.setFieldsValue({
        name_ru: props.state.typesDir.newTypeNameRu,
        name_kz: props.state.typesDir.newTypeNameKz
    });

    console.log('from state: ' + props.state.typesDir.newTypeNameRu + ' - ' + props.state.typesDir.newTypeNameKz);

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const addType = () => {
        props.dispatch(addTypeCreator());
    };

    const onChangeNameRu = () => {
        const ru = form.getFieldValue().name_ru;
        props.dispatch(updateTypeNameRuCreator(ru));
    };

    const onChangeNameKz = () => {
        const kz = form.getFieldValue().name_kz;
        props.dispatch(updateTypeNameKzCreator(kz));

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
                    onClick={addType}
                >
                    Сохранить в базу
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddType;