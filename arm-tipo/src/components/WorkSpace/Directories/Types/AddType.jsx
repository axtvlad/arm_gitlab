import React from 'react';
import {Button, Form, Input, notification,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";

const AddType = (props) => {

    const {t} = useTranslation();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const [form] = Form.useForm();

    let fromState = {
        name_ru: props.typesDir.newTypeNameRu,
        name_kz: props.typesDir.newTypeNameKz
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

    const addType = (values) => {
        console.log('Received values of form: ', values);

        props.postType(fromState);

        successfulAdd(fromState)
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;
        props.updateTypeNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;
        props.updateTypeNameKz(name_kz);
    };

    return (
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={addType}
                form={form}
            >
                <Form.Item
                    name={'name_ru'}
                    label={t('typeNameRu')}
                    rules={[{
                        required: true,
                        message: t('enterTypeNameRu') + '!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterTypeNameRu')} onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('typeNameKz')}
                    rules={[{
                        required: true,
                        message: t('enterTypeNameKz') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterTypeNameKz')}
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

export default AddType;