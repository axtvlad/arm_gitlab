import React from 'react';
import {Button, DatePicker, Form, Input, Select, Upload,} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

const {Option} = Select;
const {RangePicker} = DatePicker;

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const AddDoc = () => {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
        >
            <Form.Item
                name={'number'}
                label={'Номер'}
                rules={[{required: true, message: 'Пожалуйста, введите номер документа!'}]}
                hasFeedback
            >
                <Input placeholder={'Введите номер документа!'}/>
            </Form.Item>
            <Form.Item
                name={'department_id'}
                label={'Отдел'}
                hasFeedback
                rules={[{required: true, message: 'Пожалуйста, выберите отдел!'}]}
            >
                <Select placeholder={'Выберите отдел!'}>
                    <Option value={'МОН РК'}>МОН РК</Option>
                    <Option value={'МТиСЗ РК'}>МТиСЗ</Option>
                    <Option value={'МФ РК'}>МФ РК</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name={'status_id'}
                label={'Статус документа'}
            >
                <Select placeholder={'Выберите статус документа'} allowClear>
                    <Option value={'Активный'}>Активный</Option>
                    <Option value={'Утратил силу'}>Утратил силу</Option>
                    <Option value={'Не вступил в силу'}>Не вступил в силу</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label={'Срок действия'}
                name={'begin and finish date'}
            >
                <RangePicker format={'DD-MM-YYYY'}/>
            </Form.Item>
            <Form.Item
                name={'name_ru'}
                label={'Наименование (ru)'}
                rules={[{required: true, message: 'Пожалуйста, введите наименование документа на русском!'}]}
                hasFeedback
            >
                <Input placeholder={'Введите наименование документа на русском!'}/>
            </Form.Item>
            <Form.Item
                name={'name_kz'}
                label={'Наименование (kz)'}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={'type_id'}
                label={'Тип документа'}
                rules={[{required: true, message: 'Пожалуйста, выберите тип документа!'}]}
                hasFeedback
            >
                <Select placeholder={'Выберите тип документа!'}>
                    <Option value={'Приказ'}>Приказ</Option>
                    <Option value={'Постановление'}>Постановление</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name={'text_ru'}
                label={'Заголовок (кг)'}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={'text_kz'}
                label={'Заголовок (kz)'}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={'file_ru'}
                label={'Прикрепите файл (ru)'}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{required: true, message: 'Пожалуйста, выберите файл (ru)!'}]}
            >
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                        <UploadOutlined/> Выбрать
                    </Button>
                </Upload>
            </Form.Item>
            <Form.Item
                name={'file_kz'}
                label={'Прикрепите файл (kz)'}
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                        <UploadOutlined/> Выбрать
                    </Button>
                </Upload>
            </Form.Item>
            <Form.Item
                name={'description_ru'}
                label={'Пояснение к документу (ru)'}
                hasFeedback
            >
                <Input.TextArea/>
            </Form.Item>
            <Form.Item
                name={'description_kz'}
                label={'Пояснение к документу (kz)'}
                hasFeedback
            >
                <Input.TextArea/>
            </Form.Item>
            <Form.Item wrapperCol={{span: 12, offset: 6}}>
                <Button
                    type="danger"
                    htmlType="submit"
                    icon={<DownloadOutlined/>}
                    block
                >
                    Сохранить в базу
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddDoc;