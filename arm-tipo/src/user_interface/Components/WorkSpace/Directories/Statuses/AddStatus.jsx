import React from 'react';
import {Button, Form, Input,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const AddStatus = (props) => {
    const [form] = Form.useForm();

    console.log('from state: ' + props.statusesDir.newStatusNameRu + ' - ' + props.statusesDir.newStatusNameKz);

    form.setFieldsValue({
        name_ru: props.statusesDir.newTypeNameRu,
        name_kz: props.statusesDir.newTypeNameKz
    });

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const addStatus = () => {
        props.addStatus();
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;
        props.updateStatusNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;
        props.updateStatusNameKz(name_kz);
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
                rules={[{required: true, message: 'Пожалуйста, введите наименование статуса документа на русском!'}]}
                hasFeedback
            >
                <Input placeholder={'Введите наименование статуса документа на русском!'} onChange={changeNameRu}/>
            </Form.Item>

            <Form.Item
                name={'name_kz'}
                label={'Наименование (kz)'}
                rules={[{required: true, message: 'Пожалуйста, введите наименование статуса документа на казахском!'}]}
                hasFeedback
            >
                <Input
                    placeholder={'Введите наименование статуса документа на казахском!'}
                    onChange={changeNameKz}
                />
            </Form.Item>

            <Form.Item wrapperCol={{span: 12, offset: 6}}>
                <Button
                    type={'danger'}
                    htmlType={'submit'}
                    icon={<DownloadOutlined/>}
                    block
                    onClick={addStatus}
                >
                    Сохранить в базу
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddStatus;