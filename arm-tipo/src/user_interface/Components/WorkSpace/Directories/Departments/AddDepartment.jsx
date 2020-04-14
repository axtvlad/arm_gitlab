import React from 'react';
import {Button, Form, Input,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const AddDepartment = (props) => {
    const [form] = Form.useForm();

    console.log('from state: ' + props.departmentsDir.newDepartmentNameRu + ' - ' + props.departmentsDir.newTypeNameKz);

    form.setFieldsValue({
        name_ru: props.departmentsDir.newTypeNameRu,
        name_kz: props.departmentsDir.newTypeNameKz
    });

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const addDepartment = () => {
        props.addDepartment();
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;
        props.updateDepartmentNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;
        props.updateDepartmentNameKz(name_kz);
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
                rules={[{required: true, message: 'Пожалуйста, введите наименование отдела на русском!'}]}
                hasFeedback
            >
                <Input placeholder={'Введите наименование отдела на русском!'} onChange={changeNameRu}/>
            </Form.Item>

            <Form.Item
                name={'name_kz'}
                label={'Наименование (kz)'}
                rules={[{required: true, message: 'Пожалуйста, введите наименование отдела на казахском!'}]}
                hasFeedback
            >
                <Input
                    placeholder={'Введите наименование отдела на казахском!'}
                    onChange={changeNameKz}
                />
            </Form.Item>

            <Form.Item wrapperCol={{span: 12, offset: 6}}>
                <Button
                    type={'danger'}
                    htmlType={'submit'}
                    icon={<DownloadOutlined/>}
                    block
                    onClick={addDepartment}
                >
                    Сохранить в базу
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddDepartment;