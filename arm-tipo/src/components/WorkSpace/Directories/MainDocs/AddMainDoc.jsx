import React, {useState} from 'react';
import {Button, DatePicker, Form, Input, Select,} from 'antd';
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";
import moment from "moment";
import {NavLink} from "react-router-dom";
import {WalletOutlined} from "@ant-design/icons";

const AddMainDoc = ({postMainDoc, types, departments, statuses}) => {
    const {Option} = Select;
    const {RangePicker} = DatePicker;
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
        // todo должно выполняться на сервере (на сервер отдаем всю строку)
        formData.tags = formData.tags.toString().replace(/[ ,!@#$%^&*()-_+±|/]/g, "-")

        // todo найти альтернативное решение
        const begin_date = moment(formData.begin_and_finish_date[0]).format('YYYY-MM-DD')
        const finish_date = moment(formData.begin_and_finish_date[1]).format('YYYY-MM-DD')

        formData.begin_and_finish_date = begin_date;

        // todo зарефакторить
        const form = {
            ...formData,
            finish_date
        }

        // todo на сервер приходит begin_date = null

        postMainDoc(form).then(() => {
            setIsSaved(true)
        })
    };

    return (
        <div className={'content'}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={onSubmit}
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
                    <Input placeholder={t('enterDocNumber')}/>
                </Form.Item>

                <Form.Item
                    name={'department_id'}
                    label={t('department')}
                    hasFeedback
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, выберите отдел!'
                    }]}
                >
                    <Select placeholder={t('chooseDepartment')}>
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
                    <Select placeholder={t('chooseStatus')} allowClear>
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
                    <Input placeholder={t('enterDocNameRu')}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('docNameKz')}
                >
                    <Input placeholder={t('enterDocNameKz')}/>
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
                    <Select placeholder={t('enterType')}>
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
                    <Input/>
                </Form.Item>

                <Form.Item
                    name={'header_kz'}
                    label={t('headerKz')}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name={'tags'}
                    label={'Тэги документа'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите тэги документа!'
                    }]}
                >
                    <Input.TextArea maxLength={5000}/>
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
                    <Input placeholder={t('enterDocNameRu')}/>

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
                    <Input placeholder={t('enterDocNameKz')}/>

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
                    <Input.TextArea placeholder={t('enterDescriptionRu')}/>
                </Form.Item>

                <Form.Item
                    name={'description_kz'}
                    label={t('descriptionKz')}
                >
                    <Input.TextArea placeholder={t('enterDescriptionKz')}/>
                </Form.Item>

                <Form.Item
                    name={'text_ru'}
                    label={t('decisionFieldRu')}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name={'text_kz'}
                    label={t('decisionFieldKz')}
                >
                    <Input/>
                </Form.Item>

                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button
                        type="danger"
                        htmlType="submit"
                        icon={<DownloadOutlined/>}
                        block
                        disabled={isSaved}
                    >
                        {t('saveInBase')}
                    </Button>
                </Form.Item>

                {isSaved &&
                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <NavLink to={'/mainDocs'}>
                        <Button
                            icon={<WalletOutlined/>}
                            block
                        >
                            Вернуться к списку
                        </Button>
                    </NavLink>
                </Form.Item>
                }
            </Form>
        </div>
    )
};

export default AddMainDoc;