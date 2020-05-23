import React from 'react';
import {Button, Form, Input,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const AddRole = (props) => {
    const [form] = Form.useForm();

    let fromState = {
        name_ru: props.rolesDir.newRoleNameRu,
        name_kz: props.rolesDir.newRoleNameKz};

    console.log(fromState);

    form.setFieldsValue(fromState);

    const addRole = (values) => {
        console.log('Received values of form: ', values);
        props.addRole();
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;
        props.updateRoleNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;
        props.updateRoleNameKz(name_kz);
    };

    return (
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={addRole}
                form={form}
            >
                <Form.Item
                    name={'name_ru'}
                    label={'Наименование роли (ru)'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите наименование роли на русском языке!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={'Введите наименование роли пользователя на русском языке!'} onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={'Наименование роли (kz)'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите наименование роли пользователя на казахском языке!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={'Введите наименование роли пользователя на казахском языке!'}
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

export default AddRole;