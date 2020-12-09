import {restAPI} from "../../api/API";

const SET_MAIN_DOCS = 'set_main_docs';
const SET_MAIN_DOCS_COUNT = 'set_main_docs_count';
const SET_MAIN_DOCS_IS_FETCHING = 'set_main_docs_is_fetching';
const SET_CURRENT_MAIN_DOC = 'set_current_main_doc';
const SET_IS_POSTED = 'set_is_posted';

const initialState = {
    mainDocs: [],
    mainDocsCount: 0,
    isFetching: false,
    isPosted: false,
    currentMainDoc: {},
};

export const MainDocReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAIN_DOCS:
            return {
                ...state,
                mainDocs: action.mainDocs
            };
        case SET_MAIN_DOCS_COUNT:
            return {
                ...state,
                mainDocsCount: action.mainDocsCount
            };
        case SET_MAIN_DOCS_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CURRENT_MAIN_DOC:
            return {
                ...state,
                currentMainDoc: action.currentMainDoc
            };
        case SET_IS_POSTED:
            return {
                ...state,
                isPosted: action.isPosted
            };
        default:
            return state;
    }
};

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
});

export const setMainDocs = (mainDocs) => ({
    type: SET_MAIN_DOCS,
    mainDocs
});

export const setMainDocsCount = (mainDocsCount) => ({
    type: SET_MAIN_DOCS_COUNT,
    mainDocsCount
});

export const setMainDocsIsFetching = (isFetching) => ({
    type: SET_MAIN_DOCS_IS_FETCHING,
    isFetching
});

export const setCurrentMainDoc = (currentMainDoc) => ({
    type: SET_CURRENT_MAIN_DOC,
    currentMainDoc
});

export const getMainDocs = () => async (dispatch) => {
    dispatch(setMainDocsIsFetching(true));

    const response = await restAPI.mainDocs.getMainDocs();

    dispatch(setMainDocsCount(response.totalCount));
    dispatch(setMainDocs(response.data));
    dispatch(setMainDocsIsFetching(false));
};

export const getMainDocById = (id) => async (dispatch) => {
    dispatch(setMainDocsIsFetching(true));

    const response = await restAPI.mainDocs.getMainDocById(id)

    dispatch(setCurrentMainDoc(response.data));
    dispatch(setMainDocsIsFetching(false));
};

export const postMainDoc = (newMainDoc) => async (dispatch) => {
    await restAPI.mainDocs.postMainDoc(newMainDoc);

    dispatch(getMainDocs())
};

export const deleteMainDocById = (id) => async (dispatch) => {
    await restAPI.mainDocs.deleteMainDocById(id)

    dispatch(getMainDocs())
};