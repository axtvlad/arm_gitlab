import {restAPI} from "../../api/API";

const UPDATE_SEARCH_TAGS = 'update_tags';
const SET_IS_SEARCHING = 'set_is_searching';
const SET_SEARCH_RESULTS = 'set_search_results';
const CLEAR_SEARCH_RESULTS = 'clear_search_results';
const CLEAR_TAGS = 'clear_tags';

let initialState = {
    results: [],
    tags: [],
    isSearching: false,
};

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_TAGS:
            return {
                ...state,
                tags: action.tags
            };
        case SET_IS_SEARCHING:
            return {
                ...state,
                isSearching: action.isSearching
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

export const setIsSearching = (isSearching) => ({
    type: SET_IS_SEARCHING,
    isSearching
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

export const getSearchResult = (tags) => (dispatch) => {

    dispatch(setIsSearching(true));

    restAPI.search.getSearchResults(tags)
        .then(response => {
            dispatch(setSearchResults(response.results));

            console.info('search results: ', response);

            dispatch(setIsSearching(false));
        });
};

export default SearchReducer;