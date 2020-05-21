import React from 'react';
import {Button, Form, Input, Radio, Select} from 'antd';
import {useTranslation} from "react-i18next";

const {Option} = Select;

const SearchPage = (props) => {
    const {t} = useTranslation();

    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    let children = [];

    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

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
                        <Input placeholder="Введите заголовок"/>
                    </Form.Item>
                    <Form.Item
                        name={'tags'}
                        label={'Ключевые слова'}
                        rules={[{
                            required: true,
                            message: 'Введите ключевые слова для поиска!',
                        }]}
                    >
                        <Select
                            mode="tags"
                            style={{width: '100%'}}
                            placeholder="Ключевые слова"
                            onChange={handleChange}>
                            {children}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={'types'}
                        label={'Выберите, где искать'}
                        rules={[{
                            required: true,
                            message: 'Введите место поиска!',
                        }]}
                    >
                        <Radio.Group defaultValue="a">
                            <Radio value="a">Основная база</Radio>
                            <Radio value="b">Прочие документы</Radio>
                            <Radio value="c">Шаблоны</Radio>
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
                <div className="search-result-list">Search Result List</div>
            </div>
        </div>
    );
};

export default SearchPage;