import React from 'react';
import {Button, Form, Input, notification,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";

const AddRole = ({rolesDir, postRole, updateRoleNameRu, updateRoleNameKz}) => {
    const {t} = useTranslation();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const [form] = Form.useForm();

    const fromState = {
        name_ru: rolesDir.newRoleNameRu,
        name_kz: rolesDir.newRoleNameKz
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

    const addRole = (values) => {
        console.log('Received values of form: ', values);

        postRole(fromState);

        successfulAdd(fromState);
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;

        updateRoleNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;

        updateRoleNameKz(name_kz);
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
                    label={t('roleNameRu')}
                    rules={[{
                        required: true,
                        message: t('enterRoleNameRu') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterRoleNameRu')}
                        onChange={changeNameRu}
                    />
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('roleNameKz')}
                    rules={[{
                        required: true,
                        message: t('enterRoleNameKz') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterRoleNameKz')}
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

export default AddRole;