import React from 'react';
import {Button, Form, Input, Radio, Select} from 'antd';
import {useTranslation} from "react-i18next";
import MainDocs from "../Directories/MainDocs/MainDocs";
import {DirectoriesTypes} from "../../common/utils/DirectoriesTypes";

const SearchPage = (props) => {
    const {t} = useTranslation();

    const [form] = Form.useForm();

    let fromState = {
        tags: props.searchDir.tags,
        results: props.searchDir.results
    };

    console.log('fromState', fromState);

    form.setFieldsValue(fromState);

    const search = () => {
        props.getSearchResult(fromState.tags);
    };

    const changeTags = (value) => {
        props.updateSearchTags(value);
    }

    const clear = () => {
        props.clearSearchResults();
        props.clearTags();
        form.resetFields();
    }

    return (
        <div>
            <div style={{padding: 24, marginTop: 20, background: '#fff', minHeight: 200}}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={search}
                >
                    {/*<Form.Item*/}
                    {/*    name={'search'}*/}
                    {/*    label={t('search')}*/}
                    {/*    rules={[{*/}
                    {/*        required: true,*/}
                    {/*        message: 'Введите заголовок для поиска!',*/}
                    {/*    }]}*/}
                    {/*>*/}
                    {/*    <Input placeholder={t('enterTitle')}/>*/}
                    {/*</Form.Item>*/}
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
                            onChange={changeTags}>
                        </Select>
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    name={'types'}*/}
                    {/*    label={t('whereToSearch')}*/}
                    {/*>*/}
                    {/*    <Radio.Group defaultValue="a">*/}
                    {/*        <Radio value="a">{t('mainDocs')}</Radio>*/}
                    {/*        <Radio value="b">{t('otherDocs')}</Radio>*/}
                    {/*        <Radio value="c">{t('Templates')}</Radio>*/}
                    {/*    </Radio.Group>*/}
                    {/*</Form.Item>*/}
                    <Button type="primary" htmlType="submit">
                        {t('search')}
                    </Button>
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={clear}
                    >
                        {t('clear')}
                    </Button>
                </Form>
            </div>
            {props.searchDir.results.length ?
                <MainDocs
                    mainDocs={props.searchDir.results}
                    isFetching={props.searchDir.isSearching}
                    type={DirectoriesTypes.MAIN_DOCS}
                /> :
                <div style={{padding: 24, marginTop: 20, background: '#fff', minHeight: 100}}>
                    <div className="search-result-list">{t('searchResult')}</div>
                </div>
            }
        </div>
    );
};

export default SearchPage;