import {Button, Form, Input, notification} from "antd";
import {useTranslation} from "react-i18next";
import React from "react";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";

const AddOtherDoc = (props) => {

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

    let fromState = {
        name_ru: props.otherDocsDir.newOtherDocNameRu,
        name_kz: props.otherDocsDir.newOtherDocNameKz,
        file_ru: props.otherDocsDir.newOtherDocFileRu,
        file_kz: props.otherDocsDir.newOtherDocFileKz,
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
        console.log('Received values of form: ', values);

        props.postOtherDoc(fromState);

        successfulAdd(fromState);
    };

    const changeNameRu = () => {
        const name_ru = form.getFieldValue().name_ru;

        props.updateOtherDocNameRu(name_ru);
    };

    const changeNameKz = () => {
        const name_kz = form.getFieldValue().name_kz;

        props.updateOtherDocNameKz(name_kz);
    };

    const changeFileRu = () => {
        const file_ru = form.getFieldValue().file_ru;

        props.updateOtherDocFileRu(file_ru);
    };

    const changeFileKz = () => {
        const file_kz = form.getFieldValue().file_kz;

        props.updateOtherDocFileKz(file_kz);
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
                    name={'file_ru'}
                    label={t('attachFileRu')}
                    // valuePropName="fileList"
                    // getValueFromEvent={normFile}
                    rules={[{required: true, message: 'Пожалуйста, выберите файл (ru)!'}]}
                >
                    <Input placeholder={t('attachFileRu')} onChange={changeFileRu}/>

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
                    <Input placeholder={t('attachFileKz')} onChange={changeFileKz}/>

                    {/*<Upload name="logo" action="/upload.do" listType="picture" onChange={changeFileKz}>*/}
                    {/*    <Button>*/}
                    {/*        <UploadOutlined/> {t('chooseFile')}*/}
                    {/*    </Button>*/}
                    {/*</Upload>*/}
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

export default AddOtherDoc;