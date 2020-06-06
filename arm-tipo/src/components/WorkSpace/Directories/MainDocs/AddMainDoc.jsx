import React from 'react';
import {Button, DatePicker, Form, Input, notification, Select,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";

const AddMainDoc = (props) => {

    const {Option} = Select;
    const {RangePicker} = DatePicker;
    const {t} = useTranslation();

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

    const [form] = Form.useForm();

    let fromState = {
        num: props.mainDocsDir.newMainDocNum,
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
        tags: props.mainDocsDir.newMainDocTags,
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

    const saveDoc = (values) => {
        props.updateMainDocPubDate();

        console.log('Received values of form: ', values);

        props.postMainDoc(fromState);

        successfulAdd(fromState);
    };

    const changeNum = () => {
        const num = form.getFieldValue().num;

        props.updateMainDocNum(num);
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;

        props.updateMainDocNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;

        props.updateMainDocNameKz(name_kz);
    };

    const changeDepartmentId = (department_id) => {
        props.updateMainDocDepartmentId(department_id);
    };

    const changeStatusId = (status_id) => {
        props.updateMainDocStatusId(status_id);
    };

    const changeTags = () => {
        const tags = form.getFieldValue().tags;

        props.updateMainDocTags(tags.toString().replace(/[ ,!@#$%^&*()-_+±|/]/g, "-"));
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

        const begin_date = yyyy1 + '-' + mm1 + '-' + dd1;
        const finish_date = yyyy2 + '-' + mm2 + '-' + dd2;

        console.log('begin_date: ' + begin_date);
        console.log('finish_date: ' + finish_date);

        props.updateMainDocBeginDate(begin_date);
        props.updateMainDocFinishDate(finish_date);
    };

    const changeHeaderRu = () => {
        const header_ru = form.getFieldValue().header_ru;

        props.updateMainDocHeaderRu(header_ru);
    };

    const changeHeaderKz = () => {
        const header_kz = form.getFieldValue().header_kz;

        props.updateMainDocHeaderKz(header_kz);
    };

    const changeFileRu = () => {
        const file_ru = form.getFieldValue().file_ru;

        props.updateMainDocFileRu(file_ru);
    };

    const changeFileKz = () => {
        const file_kz = form.getFieldValue().file_kz;

        props.updateMainDocFileKz(file_kz);
    };

    const changeDescriptionRu = () => {
        const description_ru = form.getFieldValue().description_ru;

        props.updateMainDocDescriptionRu(description_ru);
    };

    const changeDescriptionKz = () => {
        const description_kz = form.getFieldValue().description_kz;

        props.updateMainDocDescriptionKz(description_kz);
    };

    const changeTextRu = () => {
        const text_ru = form.getFieldValue().text_ru;

        props.updateMainDocTextRu(text_ru);
    };

    const changeTextKz = () => {
        const text_kz = form.getFieldValue().text_kz;

        props.updateMainDocTextKz(text_kz);
    };

    const changeTypeId = () => {
        const type_id = form.getFieldValue().type_id;

        props.updateMainDocTypeId(type_id);
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
                    name={'num'}
                    label={t('number')}
                    rules={[{
                        required: true,
                        message: t('enterDocNumber') + '!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterDocNumber')} onChange={changeNum}/>
                </Form.Item>

                <Form.Item
                    name={'department_id'}
                    label={t('department')}
                    hasFeedback
                    rules={[{required: true, message: 'Пожалуйста, выберите отдел!'}]}
                >
                    <Select placeholder={t('chooseDepartment')} onChange={changeDepartmentId}>
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
                    label={t('status')}
                >
                    <Select placeholder={t('chooseStatus')} onChange={changeStatusId} allowClear>
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
                    label={t('beginFinishDate')}
                    name={'begin_and_finish_date'}
                >
                    <RangePicker
                        format={'YYYY-MM-DD'}
                        onChange={changeBeginAndFinishDate}
                        placeholder={["Вступил в силу", "Утратил силу"]}
                    />
                </Form.Item>

                <Form.Item
                    name={'name_ru'}
                    label={t('docNameRu')}
                    rules={[{
                        required: true,
                        message: t('enterDocNameRu')
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterDocNameRu')} onChange={changeNameRu}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('docNameKz')}
                >
                    <Input placeholder={t('enterDocNameKz')} onChange={changeNameKz}/>
                </Form.Item>

                <Form.Item
                    name={'type_id'}
                    label={t('type')}
                    rules={[{
                        required: true,
                        message: t('enterType') + '!'
                    }]}
                    hasFeedback
                >
                    <Select placeholder={t('enterType')} onChange={changeTypeId}>
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
                    label={t('headerRu')}
                    hasFeedback
                    rules={[{
                        required: true,
                        message: t('enterHeaderRu') + '!'
                    }]}
                >
                    <Input onChange={changeHeaderRu}/>
                </Form.Item>

                <Form.Item
                    name={'header_kz'}
                    label={t('headerKz')}
                >
                    <Input onChange={changeHeaderKz}/>
                </Form.Item>

                <Form.Item
                    name={'tags'}
                    label={'Тэги документа'}
                >
                    <Input.TextArea onChange={changeTags} maxLength={5000}/>
                </Form.Item>

                <Form.Item
                    name={'file_ru'}
                    label={t('attachFileRu')}
                    // valuePropName="fileList"
                    // getValueFromEvent={normFile}
                    rules={[{required: true, message: 'Пожалуйста, выберите файл (ru)!'}]}
                >
                    <Input placeholder={t('enterDocNameRu')} onChange={changeFileRu}/>

                    {/*<Upload name="logo" action="/upload.do" listType="picture" onChange={changeFileRu}>*/}
                    {/*    <Button>*/}
                    {/*        <UploadOutlined/> {t('chooseFile')}*/}
                    {/*    </Button>*/}
                    {/*</Upload>*/}
                </Form.Item>

                <Form.Item
                    name={'file_kz'}
                    label={t('attachFileKz')}
                    // valuePropName="fileList"
                    // getValueFromEvent={normFile}
                >
                    <Input placeholder={t('enterDocNameKz')} onChange={changeFileKz}/>

                    {/*<Upload name="logo" action="/upload.do" listType="picture" onChange={changeFileKz}>*/}
                    {/*    <Button>*/}
                    {/*        <UploadOutlined/> {t('chooseFile')}*/}
                    {/*    </Button>*/}
                    {/*</Upload>*/}
                </Form.Item>

                <Form.Item
                    name={'description_ru'}
                    label={t('descriptionRu')}
                >
                    <Input.TextArea
                        placeholder={t('enterDescriptionRu')}
                        onChange={changeDescriptionRu}/>
                </Form.Item>

                <Form.Item
                    name={'description_kz'}
                    label={t('descriptionKz')}
                >
                    <Input.TextArea
                        placeholder={t('enterDescriptionKz')}
                        onChange={changeDescriptionKz}/>
                </Form.Item>

                <Form.Item
                    name={'text_ru'}
                    label={t('decisionFieldRu')}
                >
                    <Input onChange={changeTextRu}/>
                </Form.Item>

                <Form.Item
                    name={'text_kz'}
                    label={t('decisionFieldKz')}
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
                        {t('saveInBase')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddMainDoc;