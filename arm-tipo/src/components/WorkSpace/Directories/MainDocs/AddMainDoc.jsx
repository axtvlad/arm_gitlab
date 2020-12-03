import React from 'react';
import {Button, DatePicker, Form, Input, notification, Select,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";

const AddMainDoc = (
    {
        mainDocsDir, postMainDoc, updateMainDocNum, updateMainDocNameRu, updateMainDocNameKz, updateMainDocTags,
        updateMainDocStatusId, updateMainDocDepartmentId, updateMainDocBeginDate, updateMainDocHeaderRu,
        updateMainDocFinishDate, updateMainDocHeaderKz, updateMainDocFileRu, updateMainDocFileKz, types,
        updateMainDocDescriptionRu, updateMainDocDescriptionKz, updateMainDocTextRu, updateMainDocTextKz,
        updateMainDocTypeId, departments, statuses
    }
) => {
    const {Option} = Select;
    const {RangePicker} = DatePicker;
    const {t} = useTranslation();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    /*const normFile = e => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };*/

    const [form] = Form.useForm();

    const fromState = {
        num: mainDocsDir.newMainDocNum,
        department_id: mainDocsDir.newMainDocDepartmentId,
        status_id: mainDocsDir.newMainDocStatusId,
        name_ru: mainDocsDir.newMainDocNameRu,
        name_kz: mainDocsDir.newMainDocNameKz,
        begin_date: mainDocsDir.newMainDocBeginDate,
        finish_date: mainDocsDir.newMainDocFinishDate,
        pub_date: mainDocsDir.newMainDocPubDate,
        header_ru: mainDocsDir.newMainDocHeaderRu,
        header_kz: mainDocsDir.newMainDocHeaderKz,
        file_ru: mainDocsDir.newMainDocFileRu,
        file_kz: mainDocsDir.newMainDocFileKz,
        description_ru: mainDocsDir.newMainDocDescriptionRu,
        description_kz: mainDocsDir.newMainDocDescriptionKz,
        type_id: mainDocsDir.newMainDocTypeId,
        text_ru: mainDocsDir.newMainDocTextRu,
        text_kz: mainDocsDir.newMainDocTextKz,
        tags: mainDocsDir.newMainDocTags,
    };

    console.log(fromState);

    form.setFieldsValue({
        num: mainDocsDir.newMainDocNum,
        department_id: mainDocsDir.newMainDocDepartmentId,
        status_id: mainDocsDir.newMainDocStatusId,
        name_ru: mainDocsDir.newMainDocNameRu,
        name_kz: mainDocsDir.newMainDocNameKz,
        header_ru: mainDocsDir.newMainDocHeaderRu,
        header_kz: mainDocsDir.newMainDocHeaderKz,
        file_ru: mainDocsDir.newMainDocFileRu,
        file_kz: mainDocsDir.newMainDocFileKz,
        description_ru: mainDocsDir.newMainDocDescriptionRu,
        description_kz: mainDocsDir.newMainDocDescriptionKz,
        type_id: mainDocsDir.newMainDocTypeId,
        text_ru: mainDocsDir.newMainDocTextRu,
        text_kz: mainDocsDir.newMainDocTextKz,
        tags: mainDocsDir.newMainDocTags,
    });

    const successfulAdd = (item) => {
        notification['success']({
            message: 'Сохранено!',
            description: 'Запись "' + item.name_ru + '" была успешно добавлена!',
            placement: 'bottomRight'
        });
    };

    const saveDoc = (values) => {
        console.log('Received values of form: ', values);

        postMainDoc(fromState);

        successfulAdd(fromState);
    };

    const changeNum = () => {
        const num = form.getFieldValue().num;

        updateMainDocNum(num);
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;

        updateMainDocNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;

        updateMainDocNameKz(name_kz);
    };

    const changeDepartmentId = (department_id) => {
        updateMainDocDepartmentId(department_id);
    };

    const changeStatusId = (status_id) => {
        updateMainDocStatusId(status_id);
    };

    const changeTags = () => {
        const tags = form.getFieldValue().tags;

        updateMainDocTags(tags.toString().replace(/[ ,!@#$%^&*()-_+±|/]/g, "-"));
    };

    const changeBeginAndFinishDate = (date, stringDate) => {
        console.log('begin_date: ' + stringDate[0]);
        console.log('finish_date: ' + stringDate[1]);

        updateMainDocBeginDate(stringDate[0]);
        updateMainDocFinishDate(stringDate[1]);
    };

    const changeHeaderRu = () => {
        const header_ru = form.getFieldValue().header_ru;

        updateMainDocHeaderRu(header_ru);
    };

    const changeHeaderKz = () => {
        const header_kz = form.getFieldValue().header_kz;

        updateMainDocHeaderKz(header_kz);
    };

    const changeFileRu = () => {
        const file_ru = form.getFieldValue().file_ru;

        updateMainDocFileRu(file_ru);
    };

    const changeFileKz = () => {
        const file_kz = form.getFieldValue().file_kz;

        updateMainDocFileKz(file_kz);
    };

    const changeDescriptionRu = () => {
        const description_ru = form.getFieldValue().description_ru;

        updateMainDocDescriptionRu(description_ru);
    };

    const changeDescriptionKz = () => {
        const description_kz = form.getFieldValue().description_kz;

        updateMainDocDescriptionKz(description_kz);
    };

    const changeTextRu = () => {
        const text_ru = form.getFieldValue().text_ru;

        updateMainDocTextRu(text_ru);
    };

    const changeTextKz = () => {
        const text_kz = form.getFieldValue().text_kz;

        updateMainDocTextKz(text_kz);
    };

    const changeTypeId = (type_id) => {
        updateMainDocTypeId(type_id);
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
                        message: `${t('enterDocNumber')} !`
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
                        {departments.map(department =>
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
                        {statuses.map(status =>
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
                        placeholder={[t("published"), t("finished")]}
                        allowEmpty={[false, true]}
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
                        message: `${t('enterType')} !`
                    }]}
                    hasFeedback
                >
                    <Select placeholder={t('enterType')} onChange={changeTypeId}>
                        {types.map(type =>
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
                    rules={[{required: true, message: 'Пожалуйста, введите тэги документа!'}]}
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