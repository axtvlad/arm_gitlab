import React from 'react';
import {Button, Form, Input, notification,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";

const AddDepartment = (props) => {

    const {t} = useTranslation();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const [form] = Form.useForm();

    let fromState = {
        name_ru: props.departmentsDir.newDepartmentNameRu,
        name_kz: props.departmentsDir.newDepartmentNameKz
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

    const addDepartment = (values) => {
        console.log('Received values of form: ', values);

        props.postDepartment(fromState);

        successfulAdd(fromState)
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
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={addDepartment}
                form={form}
            >
                <Form.Item
                    name={'name_ru'}
                    label={t('departmentNameRu')}
                    rules={[{
                        required: true,
                        message: t('enterDepartmentNameRu') + '!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterDepartmentNameRu')} onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('departmentNameKz')}
                    rules={[{
                        required: true,
                        message: t('enterDepartmentNameKz') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterDepartmentNameKz')}
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

export default AddDepartment;