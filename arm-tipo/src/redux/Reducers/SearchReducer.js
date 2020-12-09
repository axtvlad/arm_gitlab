import {restAPI} from "../../api/API";
import {SearchMode} from "../../components/common/utils/constants";

const UPDATE_SEARCH_TAGS = 'update_tags';
const SET_IS_SEARCHING = 'set_is_searching';
const SET_SEARCH_RESULTS = 'set_search_results';
const CLEAR_SEARCH_RESULTS = 'clear_search_results';
const CLEAR_TAGS = 'clear_tags';
const UPDATE_SEARCH_NUM = 'update_search_num';
const SET_SEARCH_MODE = 'set_search_mode';
const CLEAR_NUM = 'clear_num';

const initialState = {
    results: [],
    tags: [],
    isSearching: false,
    num: '',
    searchMode: SearchMode.TAGS,
};

export const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_TAGS:
            return {
                ...state,
                tags: action.tags
            };
        case UPDATE_SEARCH_NUM:
            return {
                ...state,
                num: action.num
            };
        case SET_IS_SEARCHING:
            return {
                ...state,
                isSearching: action.isSearching
            };
        case SET_SEARCH_MODE:
            return {
                ...state,
                searchMode: action.searchMode
            };
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                results: action.results
            };
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                results: []
            };
        case CLEAR_NUM:
            return {
                ...state,
                num: ''
            };
        case CLEAR_TAGS:
            return {
                ...state,
                tags: []
            };
        default:
            return state;
    }
};

export const updateSearchTags = (tags) => ({
    type: UPDATE_SEARCH_TAGS,
    tags
});

export const updateSearchNum = (num) => ({
    type: UPDATE_SEARCH_NUM,
    num
});

export const setIsSearching = (isSearching) => ({
    type: SET_IS_SEARCHING,
    isSearching
});

export const setSearchMode = (searchMode) => ({
    type: SET_SEARCH_MODE,
    searchMode
});

export const setSearchResults = (results) => ({
    type: SET_SEARCH_RESULTS,
    results
});

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
});

export const clearTags = () => ({
    type: CLEAR_TAGS
});

export const clearNum = () => ({
    type: CLEAR_NUM
});

export const getSearchResult = (searchMode, data) => async (dispatch) => {
    dispatch(setIsSearching(true));

    switch (searchMode) {
        case SearchMode.NUM: {
            const res = await restAPI.mainDocs.getSearchResultsByNum(data)

            dispatch(setSearchResults(res.results));
            dispatch(setIsSearching(false));

            break
        }
        case SearchMode.TAGS: {
            const res = await restAPI.mainDocs.getSearchResultsByTags(data)

            dispatch(setSearchResults(res.results));
            dispatch(setIsSearching(false));

            break
        }
        default:
            return;
    }
};