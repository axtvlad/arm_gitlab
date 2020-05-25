import React from 'react';
import {Button, Form, Input, Radio, Select} from 'antd';
import {useTranslation} from "react-i18next";

const SearchPage = (props) => {
    const {t} = useTranslation();

    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div>
            <div style={{padding: 24, marginTop: 20, background: '#fff', minHeight: 200}}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name={'search'}
                        label={t('search')}
                        rules={[{
                            required: true,
                            message: 'Введите заголовок для поиска!',
                        }]}
                    >
                        <Input placeholder={t('enterTitle')}/>
                    </Form.Item>
                    <Form.Item
                        name={'tags'}
                        label={t('tags')}
                        rules={[{
                            required: true,
                            message: 'Введите ключевые слова для поиска!',
                        }]}
                    >
                        <Select
                            mode="tags"
                            style={{width: '100%'}}
                            placeholder={t('tags')}
                            onChange={handleChange}>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={'types'}
                        label={t('whereToSearch')}
                        rules={[{
                            required: true,
                            message: 'Введите место поиска!',
                        }]}
                    >
                        <Radio.Group defaultValue="a">
                            <Radio value="a">{t('mainDocs')}</Radio>
                            <Radio value="b">{t('otherDocs')}</Radio>
                            <Radio value="c">{t('Templates')}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        {t('search')}
                    </Button>
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        {t('clear')}
                    </Button>
                </Form>
            </div>
            <div style={{padding: 24, marginTop: 20, background: '#fff', minHeight: 100}}>
                <div className="search-result-list">{t('searchResult')}</div>
            </div>
        </div>
    );
};

export default SearchPage;