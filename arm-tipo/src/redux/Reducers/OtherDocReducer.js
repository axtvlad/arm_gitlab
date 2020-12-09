import {restAPI} from "../../api/API";

const SET_OTHER_DOCS = 'set_other_docs';
const SET_OTHER_DOCS_COUNT = 'set_other_docs_count';
const SET_OTHER_DOCS_IS_FETCHING = 'set_other_docs_is_fetching';
const SET_CURRENT_OTHER_DOC = 'set_current_other_doc';
const SET_IS_POSTED = 'set_is_posted';

const initialState = {
    otherDocs: [],
    otherDocsCount: 0,
    isFetching: false,
    isPosted: false,
    currentOtherDoc: undefined,
}

export const OtherDocReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OTHER_DOCS:
            return {
                ...state,
                otherDocs: action.otherDocs
            };
        case SET_OTHER_DOCS_COUNT:
            return {
                ...state,
                otherDocsCount: action.otherDocsCount
            };
        case SET_OTHER_DOCS_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CURRENT_OTHER_DOC:
            return {
                ...state,
                currentOtherDoc: action.currentOtherDoc
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

export const setOtherDocs = (otherDocs) => ({
    type: SET_OTHER_DOCS,
    otherDocs
});

export const setOtherDocsCount = (otherDocsCount) => ({
    type: SET_OTHER_DOCS_COUNT,
    otherDocsCount
});

export const setOtherDocsIsFetching = (isFetching) => ({
    type: SET_OTHER_DOCS_IS_FETCHING,
    isFetching
});

export const setCurrentOtherDoc = (currentOtherDoc) => ({
    type: SET_CURRENT_OTHER_DOC,
    currentOtherDoc
});

export const getOtherDocs = () => async (dispatch) => {
    dispatch(setOtherDocsIsFetching(true));

    const response = await restAPI.otherDocs.getOtherDocs()

    dispatch(setOtherDocsCount(response.totalCount));
    dispatch(setOtherDocs(response.data));
    dispatch(setOtherDocsIsFetching(false));
};

export const getOtherDocById = (id) => async (dispatch) => {
    const res = await restAPI.otherDocs.getOtherDocById(id)

    dispatch(setCurrentOtherDoc(res.data));
};

export const postOtherDoc = (newOtherDoc) => async (dispatch) => {
    await restAPI.otherDocs.postOtherDoc(newOtherDoc)

    dispatch(getOtherDocs())
};

export const deleteOtherDocById = (formData) => async (dispatch) => {
    await restAPI.otherDocs.deleteOtherDocById(formData.id)

    dispatch(getOtherDocs())
};