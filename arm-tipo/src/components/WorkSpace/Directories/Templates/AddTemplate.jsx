import React, {useState} from 'react';
import {Button, Form, Input, Select} from "antd";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import {useTranslation} from "react-i18next";
import {Redirect} from "react-router-dom";

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
            {isSaved && <Redirect to={'templates'}/>}
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
                        message: t('chooseCategory')
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
                        message: t('Заполните поле')
                    }]}
                    hasFeedback
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name={'name_kz'}
                    label={t('templateNameKz')}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name={'file_ru'}
                    label={t('attachFileRu')}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name={'file_kz'}
                    label={t('attachFileKz')}
                >
                    <Input/>
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
    )
};

export default AddTemplate;