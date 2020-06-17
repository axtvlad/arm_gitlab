import React from 'react';
import {Button, Form, Input, Radio, Select} from 'antd';
import {useTranslation} from "react-i18next";
import MainDocs from "../Directories/MainDocs/MainDocs";
import {DirectoriesTypes} from "../../common/utils/DirectoriesTypes";
import {SearchMode} from "../../common/utils/constants";

const SearchPage = (props) => {
    const {t} = useTranslation();

    const [form] = Form.useForm();

    let fromState = {
        tags: props.searchDir.tags,
        results: props.searchDir.results,
        searchMode: props.searchDir.searchMode,
        num: props.searchDir.num,
    };

    console.log('fromState', fromState);

    form.setFieldsValue(fromState);

    const search = () => {
        switch (fromState.searchMode) {
            case SearchMode.NUM:
                return props.getSearchResult(fromState.searchMode, fromState.num);
            case SearchMode.TAGS:
                return props.getSearchResult(fromState.searchMode, fromState.tags);
            default:
                return props.getSearchResult(fromState.searchMode, fromState.tags);
        }
    };

    const changeTags = (value) => {
        props.updateSearchTags(value);
    }

    const clear = () => {
        props.clearSearchResults();
        props.clearTags();
        props.clearNum();
        form.resetFields();
    }

    const changeSearchMode = (value) => {
        props.setSearchMode(value.target.value);
    };

    const changeNum = (value) => {
        props.updateSearchNum(value.target.value);
    };

    return (
        <div>
            <div style={{padding: 24, marginTop: 20, background: '#fff', minHeight: 200}}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={search}
                >
                    <Form.Item
                        name={'searchMode'}
                        label={t('searchMode')}
                    >
                        <Radio.Group onChange={changeSearchMode}>
                            <Radio.Button value={SearchMode.TAGS}>{t('searchByTags')}</Radio.Button>
                            <Radio.Button value={SearchMode.NUM}>{t('searchByDocNum')}</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    {props.searchDir.searchMode === SearchMode.TAGS &&
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
                    </Form.Item>}
                    {props.searchDir.searchMode === SearchMode.NUM &&
                    <Form.Item
                        name={'num'}
                        label={t('number')}
                        rules={[{
                            required: true,
                            message: t('enterDocNumber') + '!',
                        }]}
                    >
                        <Input placeholder={t('enterDocNumber')} onChange={changeNum}/>
                    </Form.Item>}
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