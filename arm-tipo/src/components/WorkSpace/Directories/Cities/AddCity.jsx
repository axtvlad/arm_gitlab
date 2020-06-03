import React from "react";
import {Button, Form, Input, notification} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";

const AddCity = (props) => {

    const {t} = useTranslation();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const [form] = Form.useForm();

    let fromState = {
        name_ru: props.citiesDir.newCityNameRu,
        name_kz: props.citiesDir.newCityNameKz
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

    const addCity = (values) => {
        console.log('Received values of form: ', values);

        props.postCity(fromState);

        successfulAdd(fromState);
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
                    label={t('cityNameRu')}
                    rules={[{
                        required: true,
                        message: t('enterCityNameRu') + '!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterCityNameRu')} onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('cityNameKz')}
                    rules={[{
                        required: true,
                        message: t('enterCityNameKz') + '!'
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder={t('enterCityNameKz')}
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

export default AddCity;