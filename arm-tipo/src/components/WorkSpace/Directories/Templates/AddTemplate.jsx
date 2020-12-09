import React, {useState} from 'react';
import {Button, Form, Input, Select} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {WalletOutlined} from "@ant-design/icons";

const AddTemplate = ({postTemplate, categories}) => {
    const {t} = useTranslation();
    const {Option} = Select;
    const [isSaved, setIsSaved] = useState(false)

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    // const normFile = e => {
    //     console.log('Upload event:', e);
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e && e.fileList;
    // };

    const onSubmit = (formData) => {
        postTemplate(formData).then(() => {
            setIsSaved(true)
        })
    };

    return (
        <div className={'content'}>
            <Form
                name="add_template_form"
                {...formItemLayout}
                onFinish={onSubmit}
            >
                <Form.Item
                    name={'category_id'}
                    label={t('category')}
                    hasFeedback
                    rules={[{
                        required: true,
                        message: t('chooseCategory') + '!'
                    }]}
                >
                    <Select placeholder={t('chooseCategory')}>
                        {categories.map(category =>
                            <Option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name_ru}
                            </Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item
                    name={'name_ru'}
                    label={t('templateNameRu')}
                    rules={[{
                        required: true,
                        message: t('enterTemplateNameRu') + '!'
                    }]}
                    hasFeedback
                >
                    <Input placeholder={t('enterTemplateNameRu')}/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('templateNameKz')}
                >
                    <Input placeholder={t('enterTemplateNameKz')}/>
                </Form.Item>

                <Form.Item
                    name={'file_ru'}
                    label={t('attachFileRu')}
                >
                    <Input placeholder={t('chooseFile')}/>
                </Form.Item>

                <Form.Item
                    name={'file_kz'}
                    label={t('attachFileKz')}
                >
                    <Input placeholder={t('chooseFile')}/>
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
                    <NavLink to={'/templates'}>
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

export default AddTemplate;