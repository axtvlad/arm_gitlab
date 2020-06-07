import {restAPI} from "../../api/API";

const ADD_MAIN_DOC = 'add_main_doc';
const UPDATE_MAIN_DOC_NAME_RU = 'update_main_doc_name_ru';
const UPDATE_MAIN_DOC_NAME_KZ = 'update_main_doc_name_kz';
const UPDATE_MAIN_DOC_NUM = 'update_main_doc_num';
const UPDATE_MAIN_DOC_DEPARTMENT_ID = 'update_main_doc_department_id';
const UPDATE_MAIN_DOC_STATUS_ID = 'update_main_doc_status_id';
const UPDATE_MAIN_DOC_BEGIN_DATE = 'update_main_doc_begin_date';
const UPDATE_MAIN_DOC_FINISH_DATE = 'update_main_doc_finish_date';
const UPDATE_MAIN_DOC_PUB_DATE = 'update_main_doc_pub_date';
const UPDATE_MAIN_DOC_HEADER_RU = 'update_main_doc_header_ru';
const UPDATE_MAIN_DOC_HEADER_KZ = 'update_main_doc_header_kz';
const UPDATE_MAIN_DOC_FILE_RU = 'update_main_doc_file_ru';
const UPDATE_MAIN_DOC_FILE_KZ = 'update_main_doc_file_kz';
const UPDATE_MAIN_DOC_DESCRIPTION_RU = 'update_main_doc_description_ru';
const UPDATE_MAIN_DOC_DESCRIPTION_KZ = 'update_main_doc_description_kz';
const UPDATE_MAIN_DOC_TYPE_ID = 'update_main_doc_type_id';
const UPDATE_MAIN_DOC_TEXT_RU = 'update_main_doc_text_ru';
const UPDATE_MAIN_DOC_TEXT_KZ = 'update_main_doc_text_kz';
const UPDATE_MAIN_DOC_TAGS = 'update_main_doc_tags';
const SET_MAIN_DOCS = 'set_main_docs';
const SET_MAIN_DOCS_COUNT = 'set_main_docs_count';
const SET_MAIN_DOCS_IS_FETCHING = 'set_main_docs_is_fetching';
const SET_CURRENT_MAIN_DOC = 'set_current_main_doc';
const SET_IS_POSTED = 'set_is_posted';
const REMOVE_MAIN_DOC = 'remove_main_doc';

let initialState = {
    mainDocs: [],
    newMainDocNum: '',
    newMainDocDepartmentId: null,
    newMainDocStatusId: null,
    newMainDocNameRu: '',
    newMainDocNameKz: '',
    newMainDocBeginDate: null,
    newMainDocFinishDate: null,
    newMainDocPubDate: null,
    newMainDocHeaderRu: '',
    newMainDocHeaderKz: '',
    newMainDocFileRu: '',
    newMainDocFileKz: '',
    newMainDocDescriptionRu: '',
    newMainDocDescriptionKz: '',
    newMainDocTypeId: null,
    newMainDocTextRu: '',
    newMainDocTextKz: '',
    newMainDocTags: '',
    mainDocsCount: 0,
    isFetching: false,
    isPosted: false,
    currentMainDoc: undefined,
};

const dateNow = () => {
    let date = new Date();

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
};

const MainDocReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MAIN_DOC:
            return {
                ...state,
                newMainDocNum: '',
                newMainDocDepartmentId: null,
                newMainDocStatusId: null,
                newMainDocNameRu: '',
                newMainDocNameKz: '',
                newMainDocBeginDate: null,
                newMainDocFinishDate: null,
                newMainDocPubDate: null,
                newMainDocHeaderRu: '',
                newMainDocHeaderKz: '',
                newMainDocFileRu: '',
                newMainDocFileKz: '',
                newMainDocDescriptionRu: '',
                newMainDocDescriptionKz: '',
                newMainDocTypeId: null,
                newMainDocTextRu: '',
                newMainDocTextKz: '',
                newMainDocTags: '',
                mainDocs: [...state.mainDocs, {
                    id: action.id,
                    num: state.newMainDocNum,
                    department_id: state.newMainDocDepartmentId,
                    status_id: state.newMainDocStatusId,
                    name_ru: state.newMainDocNameRu,
                    name_kz: state.newMainDocNameKz,
                    begin_date: state.newMainDocBeginDate,
                    finish_date: state.newMainDocFinishDate,
                    pub_date: state.newMainDocPubDate,
                    header_ru: state.newMainDocHeaderRu,
                    header_kz: state.newMainDocHeaderKz,
                    file_ru: state.newMainDocFileRu,
                    file_kz: state.newMainDocFileKz,
                    description_ru: state.newMainDocDescriptionRu,
                    description_kz: state.newMainDocDescriptionKz,
                    type_id: state.newMainDocTypeId,
                    text_ru: state.newMainDocTextRu,
                    text_kz: state.newMainDocTextKz,
                    tags: state.newMainDocTags,
                }],
            };
        case REMOVE_MAIN_DOC:
            return {
                ...state,
                mainDocs: state.mainDocs.filter(mainDoc => mainDoc.id !== action.id)
            };
        case UPDATE_MAIN_DOC_NAME_RU:
            return {
                ...state,
                newMainDocNameRu: action.newNameRu
            };
        case UPDATE_MAIN_DOC_NAME_KZ:
            return {
                ...state,
                newMainDocNameKz: action.newNameKz
            };
        case UPDATE_MAIN_DOC_BEGIN_DATE:
            return {
                ...state,
                newMainDocBeginDate: action.newBeginDate
            };
        case UPDATE_MAIN_DOC_FINISH_DATE:
            return {
                ...state,
                newMainDocFinishDate: action.newFinishDate
            };
        case UPDATE_MAIN_DOC_PUB_DATE:
            let pub_date = dateNow();
            return {
                ...state,
                newMainDocPubDate: pub_date
            };
        case UPDATE_MAIN_DOC_NUM:
            return {
                ...state,
                newMainDocNum: action.newNum
            };
        case UPDATE_MAIN_DOC_DEPARTMENT_ID:
            return {
                ...state,
                newMainDocDepartmentId: action.newDepartmentId
            };
        case UPDATE_MAIN_DOC_STATUS_ID:
            return {
                ...state,
                newMainDocStatusId: action.newStatusId
            };
        case UPDATE_MAIN_DOC_HEADER_RU:
            return {
                ...state,
                newMainDocHeaderRu: action.newHeaderRu
            };
        case UPDATE_MAIN_DOC_HEADER_KZ:
            return {
                ...state,
                newMainDocHeaderKz: action.newHeaderKz
            };
        case UPDATE_MAIN_DOC_FILE_RU:
            return {
                ...state,
                newMainDocFileRu: action.newFileRu
            };
        case UPDATE_MAIN_DOC_FILE_KZ:
            return {
                ...state,
                newMainDocFileKz: action.newFileKz
            };
        case UPDATE_MAIN_DOC_DESCRIPTION_RU:
            return {
                ...state,
                newMainDocDescriptionRu: action.newDescriptionRu
            };
        case UPDATE_MAIN_DOC_DESCRIPTION_KZ:
            return {
                ...state,
                newMainDocDescriptionKz: action.newDescriptionKz
            };
        case UPDATE_MAIN_DOC_TEXT_RU:
            return {
                ...state,
                newMainDocTextRu: action.newTextRu
            };
        case UPDATE_MAIN_DOC_TEXT_KZ:
            return {
                ...state,
                newMainDocTextKz: action.newTextKz
            };
        case UPDATE_MAIN_DOC_TYPE_ID:
            return {
                ...state,
                newMainDocTypeId: action.newTypeId
            };
        case UPDATE_MAIN_DOC_TAGS:
            return {
                ...state,
                newMainDocTags: action.newTags
            };
        case SET_MAIN_DOCS:
            return {
                ...state,
                mainDocs: [...state.mainDocs, ...action.mainDocs]
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

export const addMainDoc = (id) => ({
    type: ADD_MAIN_DOC,
    id
});

export const removeMainDoc = (id) => ({
    type: REMOVE_MAIN_DOC,
    id
});

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
});

export const updateMainDocNameRu = (newNameRu) => ({
    type: UPDATE_MAIN_DOC_NAME_RU,
    newNameRu
});

export const updateMainDocNameKz = (newNameKz) => ({
    type: UPDATE_MAIN_DOC_NAME_KZ,
    newNameKz
});

export const updateMainDocNum = (newNum) => ({
    type: UPDATE_MAIN_DOC_NUM,
    newNum
});

export const updateMainDocDepartmentId = (newDepartmentId) => ({
    type: UPDATE_MAIN_DOC_DEPARTMENT_ID,
    newDepartmentId
});

export const updateMainDocStatusId = (newStatusId) => ({
    type: UPDATE_MAIN_DOC_STATUS_ID,
    newStatusId
});

export const updateMainDocBeginDate = (newBeginDate) => ({
    type: UPDATE_MAIN_DOC_BEGIN_DATE,
    newBeginDate
});

export const updateMainDocFinishDate = (newFinishDate) => ({
    type: UPDATE_MAIN_DOC_FINISH_DATE,
    newFinishDate
});

export const updateMainDocPubDate = () => ({
    type: UPDATE_MAIN_DOC_PUB_DATE,
});

export const updateMainDocHeaderRu = (newHeaderRu) => ({
    type: UPDATE_MAIN_DOC_HEADER_RU,
    newHeaderRu
});

export const updateMainDocHeaderKz = (newHeaderKz) => ({
    type: UPDATE_MAIN_DOC_HEADER_KZ,
    newHeaderKz
});

export const updateMainDocFileRu = (newFileRu) => ({
    type: UPDATE_MAIN_DOC_FILE_RU,
    newFileRu
});

export const updateMainDocFileKz = (newFileKz) => ({
    type: UPDATE_MAIN_DOC_FILE_KZ,
    newFileKz
});

export const updateMainDocDescriptionRu = (newDescriptionRu) => ({
    type: UPDATE_MAIN_DOC_DESCRIPTION_RU,
    newDescriptionRu
});

export const updateMainDocDescriptionKz = (newDescriptionKz) => ({
    type: UPDATE_MAIN_DOC_DESCRIPTION_KZ,
    newDescriptionKz
});

export const updateMainDocTypeId = (newTypeId) => ({
    type: UPDATE_MAIN_DOC_TYPE_ID,
    newTypeId
});

export const updateMainDocTextRu = (newTextRu) => ({
    type: UPDATE_MAIN_DOC_TEXT_RU,
    newTextRu
});

export const updateMainDocTextKz = (newTextKz) => ({
    type: UPDATE_MAIN_DOC_TEXT_KZ,
    newTextKz
});

export const updateMainDocTags = (newTags) => ({
    type: UPDATE_MAIN_DOC_TAGS,
    newTags
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

export const getMainDocs = () => {
    return (dispatch) => {

        dispatch(setMainDocsIsFetching(true));

        restAPI.mainDocs.getMainDocs()
            .then(response => {
                dispatch(setMainDocsCount(response.totalCount));
                dispatch(setMainDocs(response.data));

                console.info('mainDocs: ', response.data);

                dispatch(setMainDocsIsFetching(false));
            });
    }
};

export const getMainDocById = (id) => {
    return (dispatch) => {

        dispatch(setMainDocsIsFetching(true));

        restAPI.mainDocs.getMainDocById(id)
            .then(response => {
                dispatch(setCurrentMainDoc(response.data));

                console.info('mainDoc: ', response.data);

                dispatch(setMainDocsIsFetching(false));
            });
    }
};

export const postMainDoc = (newMainDoc) => (dispatch) => {

    dispatch(setMainDocsIsFetching(true));

    restAPI.mainDocs.postMainDoc(newMainDoc)
        .then(response => {
            console.info('posted mainDoc: ', response.data);

            dispatch(addMainDoc(response.data.id));

            dispatch(setMainDocsIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const deleteMainDocById = (id) => (dispatch) => {

    dispatch(setMainDocsIsFetching(true));

    restAPI.mainDocs.deleteMainDocById(id)
        .then(response => {
            console.info('deleted mainDoc: ', response.data);

            dispatch(removeMainDoc(id));

            dispatch(setMainDocsIsFetching(false));
        });
};

export default MainDocReducer;