import React from 'react';
import {Button, Form, Input, notification,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";

const AddStatus = ({statusesDir, postStatus, updateStatusNameRu, updateStatusNameKz}) => {
    const {t} = useTranslation();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const [form] = Form.useForm();

    const fromState = {
        name_ru: statusesDir.newStatusNameRu,
        name_kz: statusesDir.newStatusNameKz
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

    const addStatus = (values) => {
        console.log('Received values of form: ', values);

        postStatus(fromState);

        successfulAdd(fromState);
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;

        updateStatusNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;

        updateStatusNameKz(name_kz);
    };

    return (
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={addStatus}
                form={form}
            >
                <Form.Item
                    name={'name_ru'}
                    label={t('statusNameRu')}
                    rules={[{
                        required: true,
                        message: t('enterStatusNameRu') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterStatusNameRu')}
                        onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('statusNameKz')}
                    rules={[{
                        required: true,
                        message: t('enterStatusNameKz') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterStatusNameKz')}
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

export default AddStatus;