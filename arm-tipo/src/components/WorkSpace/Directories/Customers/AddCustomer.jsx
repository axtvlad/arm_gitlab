import {Button, Form, Input} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import React from "react";

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const AddCustomer = (props) => {
    const [form] = Form.useForm();

    let fromState = {
        name_ru: props.customersDir.newCustomerNameRu,
        name_kz: props.customersDir.newCustomerNameKz
    };

    console.log(fromState);

    form.setFieldsValue(fromState);

    const addCustomer = (values) => {
        console.log('Received values of form: ', values);
        props.addCustomer();
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;
        props.updateCustomerNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;
        props.updateCustomerNameKz(name_kz);
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
                    label={'Наименование клиента (ru)'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите наименование имя клиента на русском!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={'Введите имя клиента на русском!'} onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={'Наименование клиена (kz)'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите имя клиента на казахском!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={'Введите имя клиента на казахском!'}
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

export default AddCustomer;