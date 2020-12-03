import {Button, Form, Input, notification} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import React from "react";
import {useTranslation} from "react-i18next";

const AddCustomer = ({customersDir, postCustomer, updateCustomerNameRu, updateCustomerNameKz}) => {
    const {t} = useTranslation();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const [form] = Form.useForm();

    const fromState = {
        name_ru: customersDir.newCustomerNameRu,
        name_kz: customersDir.newCustomerNameKz
    };

    console.log(fromState);

    form.setFieldsValue(fromState);

    const successfulAdd = (item) => {
        notification['success']({
            message: 'Сохранено!',
            description: `Запись ${item.name_ru} была успешно добавлена!`,
            placement: 'bottomRight'
        });
    };

    const addCustomer = (values) => {
        console.log('Received values of form: ', values);

        postCustomer(fromState);

        successfulAdd(fromState)
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;

        updateCustomerNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;

        updateCustomerNameKz(name_kz);
    };

    return (
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={addCustomer}
                form={form}
            >
                <Form.Item
                    name={'name_ru'}
                    label={t('customerNameRu')}
                    rules={[{
                        required: true,
                        message: `${t('enterCustomerNameRu')} !`
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterCustomerNameRu')} onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('customerNameKz')}
                    rules={[{
                        required: true,
                        message: `${t('enterCustomerNameKz')} !`
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterCustomerNameKz')}
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

export default AddCustomer;