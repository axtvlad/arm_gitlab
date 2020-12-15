import React from 'react';
import {Button, Form, Input, Radio, Select} from 'antd';
import {useTranslation} from "react-i18next";
import MainDocs from "../Directories/MainDocs/MainDocs";
import {DirectoriesTypes} from "../../common/utils/DirectoriesTypes";
import {SearchMode} from "../../common/utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {
    clearNum,
    clearSearchResults,
    clearTags,
    getSearchResult,
    setSearchMode,
    updateSearchNum,
    updateSearchTags
} from "../../../redux/reducers/SearchReducer";
import {
    selectSearchIsSearching,
    selectSearchMode,
    selectSearchNum,
    selectSearchResults,
    selectSearchTags
} from "../../../redux/selectors/SearchSelector";

export const SearchPage = (props) => {
    const {t} = useTranslation();
    const [form] = Form.useForm();

    const searchMode = useSelector(selectSearchMode)
    const results = useSelector(selectSearchResults)
    const num = useSelector(selectSearchNum)
    const tags = useSelector(selectSearchTags)
    const isSearching = useSelector(selectSearchIsSearching)

    const dispatch = useDispatch()

    const search = () => {
        switch (searchMode) {
            case SearchMode.NUM:
                return dispatch(getSearchResult(searchMode, num))
            case SearchMode.TAGS:
                return dispatch(getSearchResult(searchMode, tags))
            default:
                return dispatch(getSearchResult(searchMode, tags))
        }
    };

    const changeTags = (value) => {
        dispatch(updateSearchTags(value))
    };

    const clear = () => {
        dispatch(clearSearchResults())
        dispatch(clearTags())
        dispatch(clearNum())
        form.resetFields()
    };

    const changeSearchMode = (value) => {
        dispatch(setSearchMode(value.target.value))
    };

    const changeNum = (value) => {
        dispatch(updateSearchNum(value.target.value))
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
                    {searchMode === SearchMode.TAGS &&
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
                    {searchMode === SearchMode.NUM &&
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
                    {/*<Form.Item
                        name={'types'}
                        label={t('whereToSearch')}
                    >
                        <Radio.Group defaultValue="a">
                            <Radio value="a">{t('mainDocs')}</Radio>
                            <Radio value="b">{t('otherDocs')}</Radio>
                            <Radio value="c">{t('Templates')}</Radio>
                        </Radio.Group>
                    </Form.Item>*/}
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
            {results.length ?
                <MainDocs
                    mainDocs={results}
                    isFetching={isSearching}
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