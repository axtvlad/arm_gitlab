import React from "react";
import {Button, Form, Input} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";


const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const AddCity = (props) => {
    const [form] = Form.useForm();

    let fromState = {
        name_ru: props.citiesDir.newCityNameRu,
        name_kz: props.citiesDir.newCityNameKz
    };

    console.log(fromState);

    form.setFieldsValue(fromState);

    const addCity = (values) => {
        console.log('Received values of form: ', values);
        props.addCity();
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;
        props.updateCityNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;
        props.updateCityNameKz(name_kz);
    };

    return (
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={addCity}
                form={form}
            >
                <Form.Item
                    name={'name_ru'}
                    label={'Наименование (ru)'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите наименование города на русском!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={'Введите город на русском!'} onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={'Наименование (kz)'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите город на казахском!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={'Введите город на казахском!'}
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

export default AddCity;