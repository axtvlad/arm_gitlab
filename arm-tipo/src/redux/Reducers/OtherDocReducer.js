import {restAPI} from "../../api/API";

const ADD_OTHER_DOC = 'add_other_doc';
const UPDATE_OTHER_DOC_NAME_RU = 'update_other_doc_name_ru';
const UPDATE_OTHER_DOC_NAME_KZ = 'update_other_doc_name_kz';
const UPDATE_OTHER_DOC_FILE_RU = 'update_other_doc_file_ru';
const UPDATE_OTHER_DOC_FILE_KZ = 'update_other_doc_file_kz';
const SET_OTHER_DOCS = 'set_other_docs';
const SET_OTHER_DOCS_COUNT = 'set_other_docs_count';
const SET_OTHER_DOCS_IS_FETCHING = 'set_other_docs_is_fetching';
const SET_CURRENT_OTHER_DOC = 'set_current_other_doc';
const SET_IS_POSTED = 'set_is_posted';
const REMOVE_OTHER_DOC = 'remove_other_doc';

let initialState = {
    otherDocs: [],
    newOtherDocNameRu: '',
    newOtherDocNameKz: '',
    newOtherDocFileRu: '',
    newOtherDocFileKz: '',
    otherDocsCount: 0,
    isFetching: false,
    isPosted: false,
    currentOtherDoc: undefined,
}

const OtherDocReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_OTHER_DOC:
            return {
                ...state,
                newOtherDocNameRu: '',
                newOtherDocNameKz: '',
                newOtherDocFileRu: '',
                newOtherDocFileKz: '',
                otherDocs: [...state.otherDocs, {
                    id: action.id,
                    name_ru: state.newOtherDocNameRu,
                    name_kz: state.newOtherDocNameKz,
                    file_ru: state.newOtherDocFileRu,
                    file_kz: state.newOtherDocFileKz,
                }],
            }
        case REMOVE_OTHER_DOC:
            return {
                ...state,
                otherDocs: state.otherDocs.filter(otherDoc => otherDoc.id !== action.id)
            };
        case UPDATE_OTHER_DOC_NAME_RU:
            return {
                ...state,
                newOtherDocNameRu: action.newNameRu
            };
        case UPDATE_OTHER_DOC_NAME_KZ:
            return {
                ...state,
                newOtherDocNameKz: action.newNameKz
            };
        case UPDATE_OTHER_DOC_FILE_RU:
            return {
                ...state,
                newOtherDocFileRu: action.newFileRu
            };
        case UPDATE_OTHER_DOC_FILE_KZ:
            return {
                ...state,
                newOtherDocFileKz: action.newFileKz
            };
        case SET_OTHER_DOCS:
            return {
                ...state,
                otherDocs: [...state.otherDocs, ...action.otherDocs]
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
export const addOtherDoc = (id) => ({
    type: ADD_OTHER_DOC,
    id
});

export const removeOtherDoc = (id) => ({
    type: REMOVE_OTHER_DOC,
    id
});

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
});
export const updateOtherDocNameRu = (newNameRu) => ({
    type: UPDATE_OTHER_DOC_FILE_RU,
    newNameRu
});

export const updateOtherDocNameKz = (newNameKz) => ({
    type: UPDATE_OTHER_DOC_NAME_KZ,
    newNameKz
});

export const updateOtherDocFileRu = (newFileRu) => ({
    type: UPDATE_OTHER_DOC_FILE_RU,
    newFileRu
});

export const updateOtherDocFileKz = (newFileKz) => ({
    type: UPDATE_OTHER_DOC_FILE_KZ,
    newFileKz
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

export const getOtherDocs = () => {
    return (dispatch) => {

        dispatch(setOtherDocsIsFetching(true));

        restAPI.otherDocs.getOtherDocs()
            .then(response => {
                dispatch(setOtherDocsCount(response.totalCount));
                dispatch(setOtherDocs(response.data));

                console.info('otherDocs: ', response.data);

                dispatch(setOtherDocsIsFetching(false));
            });
    }
};

export const getOtherDocById = (id) => {
    return (dispatch) => {

        dispatch(setOtherDocsIsFetching(true));

        restAPI.otherDocs.getOtherDocById(id)
            .then(response => {
                dispatch(setCurrentOtherDoc(response.data));

                console.info('otherDocs: ', response.data);

                dispatch(setOtherDocsIsFetching(false));
            });
    }
};

export const postOtherDoc = (newOtherDoc) => (dispatch) => {

    dispatch(setOtherDocsIsFetching(true));

    restAPI.otherDocs.postOtherDoc(newOtherDoc)
        .then(response => {
            console.info('posted otherDoc: ', response.data);

            dispatch(addOtherDoc(response.data.id));

            dispatch(setOtherDocsIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const deleteOtherDocById = (id) => (dispatch) => {

    dispatch(setOtherDocsIsFetching(true));

    restAPI.otherDocs.deleteOtherDocById(id)
        .then(response => {
            console.info('deleted otherDoc: ', response.data);

            dispatch(removeOtherDoc(id));

            dispatch(setOtherDocsIsFetching(false));
        });
};

export default OtherDocReducer;