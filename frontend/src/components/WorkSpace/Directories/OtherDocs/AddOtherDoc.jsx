import {Button, Form, Input} from "antd";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {Redirect} from "react-router-dom";

const AddOtherDoc = ({postOtherDoc}) => {
    const {t} = useTranslation();
    const [isSaved, setIsSaved] = useState(false)

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

    const onSubmit = (formData) => {
        postOtherDoc(formData).then(() => {
            setIsSaved(true)
        })
    };

    return (
        <div className={'content'}>
            {isSaved && <Redirect to={'otherDocs'}/>}
            <Form
                name="add_other_doc_form"
                {...formItemLayout}
                onFinish={onSubmit}
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
                    <Input/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('docNameKz')}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={'file_ru'}
                    label={t('attachFileRu')}
                    // valuePropName="fileList"
                    // getValueFromEvent={normFile}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, выберите файл (ru)!'
                    }]}
                >
                    <Input/>

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
                    <Input/>

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