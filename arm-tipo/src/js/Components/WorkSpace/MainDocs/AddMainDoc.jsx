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

const AddMainDoc = (props) => {

    const [form] = Form.useForm();

    let fromState = {
        number: props.mainDocsDir.newMainDocNumber,
        department_id: props.mainDocsDir.newMainDocDepartmentId,
        status_id: props.mainDocsDir.newMainDocStatusId,
        name_ru: props.mainDocsDir.newMainDocNameRu,
        name_kz: props.mainDocsDir.newMainDocNameKz,
        begin_date: props.mainDocsDir.newMainDocBeginDate,
        finish_date: props.mainDocsDir.newMainDocFinishDate,
        pub_date: props.mainDocsDir.newMainDocPubDate,
        header_ru: props.mainDocsDir.newMainDocHeaderRu,
        header_kz: props.mainDocsDir.newMainDocHeaderKz,
        file_ru: props.mainDocsDir.newMainDocFileRu,
        file_kz: props.mainDocsDir.newMainDocFileKz,
        description_ru: props.mainDocsDir.newMainDocDescriptionRu,
        description_kz: props.mainDocsDir.newMainDocDescriptionKz,
        type_id: props.mainDocsDir.newMainDocTypeId,
        text_ru: props.mainDocsDir.newMainDocTextRu,
        text_kz: props.mainDocsDir.newMainDocTextKz,
    };

    console.log(fromState);

    form.setFieldsValue(fromState);

    const saveDoc = (values) => {
        props.changeMainDocPubDate();
        console.log('Received values of form: ', values);
        props.addMainDoc();
    };

    const changeNumber = () => {
        const number = form.getFieldValue().number;
        props.changeMainDocNumber(number);
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;
        props.changeMainDocNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;
        props.changeMainDocNameKz(name_kz);
    };

    const changeDepartmentId = (department_id) => {
        props.changeMainDocDepartmentId(department_id);
    };

    const changeStatusId = (status_id) => {
        props.changeMainDocStatusId(status_id);
    };

    const changeBeginAndFinishDate = () => {
        const date = form.getFieldValue().begin_and_finish_date;

        let date1 = date[0]._d;
        let date2 = date[1]._d;


        let dd1 = date1.getDate();
        if (dd1 < 10) dd1 = '0' + dd1;

        let dd2 = date2.getDate();
        if (dd2 < 10) dd2 = '0' + dd1;

        let mm1 = date1.getMonth() + 1;
        if (mm1 < 10) mm1 = '0' + mm1;

        let mm2 = date2.getMonth() + 1;
        if (mm2 < 10) mm2 = '0' + mm2;

        let yyyy1 = date1.getFullYear();
        let yyyy2 = date2.getFullYear();

        const begin_date = dd1 + '-' + mm1 + '-' + yyyy1;
        const finish_date = dd2 + '-' + mm2 + '-' + yyyy2;

        console.log('begin_date: ' + begin_date);
        console.log('finish_date: ' + finish_date);

        props.changeMainDocBeginDate(begin_date);
        props.changeMainDocFinishDate(begin_date);
    };

    const changeHeaderRu = () => {
        const header_ru = form.getFieldValue().header_ru;
        props.changeMainDocHeaderRu(header_ru);
    };

    const changeHeaderKz = () => {
        const header_kz = form.getFieldValue().header_kz;
        props.changeMainDocHeaderKz(header_kz);
    };

    const changeFileRu = () => {
        const file_ru = form.getFieldValue().file_ru;
        props.changeMainDocFileRu(file_ru);
    };

    const changeFileKz = () => {
        const file_kz = form.getFieldValue().file_kz;
        props.changeMainDocFileKz(file_kz);
    };

    const changeDescriptionRu = () => {
        const description_ru = form.getFieldValue().description_ru;
        props.changeMainDocDescriptionRu(description_ru);
    };

    const changeDescriptionKz = () => {
        const description_kz = form.getFieldValue().description_kz;
        props.changeMainDocDescriptionKz(description_kz);
    };

    const changeTextRu = () => {
        const text_ru = form.getFieldValue().text_ru;
        props.changeMainDocTextRu(text_ru);
    };

    const changeTextKz = () => {
        const text_kz = form.getFieldValue().text_kz;
        props.changeMainDocTextKz(text_kz);
    };

    const changeTypeId = () => {
        const type_id = form.getFieldValue().type_id;
        props.changeMainDocTypeId(type_id);
    };

    return (
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={saveDoc}
                form={form}
            >
                <Form.Item
                    name={'number'}
                    label={'Номер'}
                    rules={[{required: true, message: 'Пожалуйста, введите номер документа!'}]}
                    hasFeedback
                >
                    <Input placeholder={'Введите номер документа!'} onChange={changeNumber}/>
                </Form.Item>

                <Form.Item
                    name={'department_id'}
                    label={'Отдел'}
                    hasFeedback
                    rules={[{required: true, message: 'Пожалуйста, выберите отдел!'}]}
                >
                    <Select placeholder={'Выберите отдел!'} onChange={changeDepartmentId}>
                        {props.departments.map(department =>
                            <Option
                                key={department.id}
                                value={department.id}
                            >
                                {department.name_ru}
                            </Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={'status_id'}
                    label={'Статус документа'}
                >
                    <Select placeholder={'Выберите статус документа'} onChange={changeStatusId} allowClear>
                        {props.statuses.map(status =>
                            <Option
                                key={status.id}
                                value={status.id}
                            >
                                {status.name_ru}
                            </Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={'Срок действия'}
                    name={'begin_and_finish_date'}
                >
                    <RangePicker format={'DD-MM-YYYY'} onChange={changeBeginAndFinishDate}/>
                </Form.Item>

                <Form.Item
                    name={'name_ru'}
                    label={'Наименование (ru)'}
                    rules={[{required: true, message: 'Пожалуйста, введите наименование документа на русском!'}]}
                    hasFeedback
                >
                    <Input placeholder={'Введите наименование документа на русском!'} onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={'Наименование (kz)'}
                >
                    <Input placeholder={'Введите наименование документа на казахском!'} onChange={changeNameKz}/>
                </Form.Item>

                <Form.Item
                    name={'type_id'}
                    label={'Тип документа'}
                    rules={[{required: true, message: 'Пожалуйста, выберите тип документа!'}]}
                    hasFeedback
                >
                    <Select placeholder={'Выберите тип документа!'} onChange={changeTypeId}>
                        {props.types.map(type =>
                            <Option
                                key={type.id}
                                value={type.id}
                            >
                                {type.name_ru}
                            </Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={'header_ru'}
                    label={'Заголовок (ru)'}
                    hasFeedback
                    rules={[{required: true, message: 'Пожалуйста, введите заголовок документа на русском!'}]}
                >
                    <Input onChange={changeHeaderRu}/>
                </Form.Item>

                <Form.Item
                    name={'header_kz'}
                    label={'Заголовок (kz)'}
                >
                    <Input onChange={changeHeaderKz}/>
                </Form.Item>

                <Form.Item
                    name={'file_ru'}
                    label={'Прикрепите файл (ru)'}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    // rules={[{required: true, message: 'Пожалуйста, выберите файл (ru)!'}]}
                >
                    <Upload name="logo" action="/upload.do" listType="picture" onChange={changeFileRu}>
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
                    <Upload name="logo" action="/upload.do" listType="picture" onChange={changeFileKz}>
                        <Button>
                            <UploadOutlined/> Выбрать
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name={'description_ru'}
                    label={'Пояснение к документу (ru)'}
                >
                    <Input.TextArea placeholder={'Рекомендации эксперта на русском'} onChange={changeDescriptionRu}/>
                </Form.Item>

                <Form.Item
                    name={'description_kz'}
                    label={'Пояснение к документу (kz)'}
                >
                    <Input.TextArea placeholder={'Рекомендации эксперта на казахском'} onChange={changeDescriptionKz}/>
                </Form.Item>

                <Form.Item
                    name={'text_ru'}
                    label={'Поле для постановления (ru)'}
                >
                    <Input onChange={changeTextRu}/>
                </Form.Item>

                <Form.Item
                    name={'text_kz'}
                    label={'Поле для постановления (kz)'}
                >
                    <Input onChange={changeTextKz}/>
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
        </div>
    );
};

export default AddMainDoc;