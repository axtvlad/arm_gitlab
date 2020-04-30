const ADD_MAIN_DOC = 'add_main_doc';
const UPDATE_MAIN_DOC_NAME_RU = 'update_main_doc_name_ru';
const UPDATE_MAIN_DOC_NAME_KZ = 'update_main_doc_name_kz';
const UPDATE_MAIN_DOC_NUMBER = 'update_main_doc_number';
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
const SET_MAIN_DOCS = 'set_main_docs';

let initialState = {
    mainDocs: [
        {
            id: 1,
            number: 'BBC-991',
            department_id: 1,
            status_id: 2,
            begin_date: '2020-03-02',
            finish_date: '2030-03-02',
            pub_date: '01-03-2020',
            name_ru: 'Приказ о зачислении',
            name_kz: 'Приказ о зачислении',
            header_ru: 'Данный приказ о зачислении на очную форму обучения',
            header_kz: 'Данный приказ о зачислении на очную форму обучения',
            file_ru: '/src/mainDocs/fsdj8f2oh',
            file_kz: '/src/mainDocs/fsffsoh94',
            description_ru: 'Это описание документа на русском',
            description_kz: 'Это описание документа на казахском',
            type_id: 1,
            text_ru: '',
            text_kz: ''
        },
        {
            id: 2,
            number: 'saf/51',
            department_id: 2,
            status_id: 1,
            begin_date: '2020-03-02',
            finish_date: '2030-03-02',
            pub_date: '28-06-2020',
            name_ru: 'Приказ об отчислении',
            name_kz: 'Приказ об отчислении',
            header_ru: 'Данный приказ об отчислении с очной формы обучения',
            header_kz: 'Данный приказ о зачислении на очную форму обучения',
            file_ru: '/src/mainDocs/fsdj8f2oh',
            file_kz: '/src/mainDocs/fsffsoh94',
            description_ru: 'Это описание документа на русском',
            description_kz: 'Это описание документа на казахском',
            type_id: 1,
            text_ru: '',
            text_kz: ''
        },
        {
            id: 3,
            number: '52-1',
            department_id: 3,
            status_id: 3,
            begin_date: '2020-03-02',
            finish_date: '2030-03-02',
            pub_date: '05=02-2019',
            name_ru: 'Постановление о переходе на дистанционную форму обчения',
            name_kz: 'Приказ об отчислении',
            header_ru: 'Данное постановление о переходе на дистанционную форму обчения',
            header_kz: 'Данный приказ о зачислении на очную форму обучения',
            file_ru: '/src/mainDocs/fsdj8f2oh',
            file_kz: '/src/mainDocs/fsffsoh94',
            description_ru: 'Это описание документа на русском',
            description_kz: 'Это описание документа на казахском',
            type_id: 1,
            text_ru: 'Дополнительная информация на русском',
            text_kz: 'Дополнительная информация на казахском'
        },
        {
            id: 4,
            number: 'COS-10',
            department_id: 1,
            status_id: 2,
            begin_date: '2020-03-02',
            finish_date: '2030-03-02',
            pub_date: '16-03-2020',
            name_ru: 'Постановление о проведении рейдов по учебным заведениям',
            name_kz: 'Приказ об отчислении',
            header_ru: 'Данное постановление о проведении рейдов по учебным заведениям',
            header_kz: 'Данный приказ о зачислении на очную форму обучения',
            file_ru: '/src/mainDocs/fsdj8f2oh',
            file_kz: '/src/mainDocs/fsffsoh94',
            description_ru: 'Это описание документа на русском',
            description_kz: 'Это описание документа на казахском',
            type_id: 1,
            text_ru: 'Дополнительная информация на русском',
            text_kz: 'Дополнительная информация на казахском'
        },
    ],
    newMainDocNumber: '',
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
};

const MainDocReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MAIN_DOC:
            return {
                ...state,
                newMainDocNumber: '',
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
                mainDocs: [...state.mainDocs, {
                    id: 2,
                    number: state.newMainDocNumber,
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
                }],
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
            return {
                ...state,
                newMainDocPubDate: action.newPubDate
            };
        case UPDATE_MAIN_DOC_NUMBER:
            return {
                ...state,
                newMainDocNumber: action.newNumber
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
                newMainDocFileRu: action.newFileKz
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
        case SET_MAIN_DOCS:
            return {
                ...state,
                mainDocs: [...state.mainDocs, ...action.mainDocs]
            };
        default:
            return state;
    }
};


export const addMainDocCreator = () => ({
    type: ADD_MAIN_DOC
});

export const updateMainDocNameRuCreator = (newNameRu) => ({
    type: UPDATE_MAIN_DOC_NAME_RU,
    newNameRu
});

export const updateMainDocNameKzCreator = (newNameKz) => ({
    type: UPDATE_MAIN_DOC_NAME_KZ,
    newNameKz
});

export const updateMainDocNumberCreator = (newNumber) => ({
    type: UPDATE_MAIN_DOC_NUMBER,
    newNumber
});

export const updateMainDocDepartmentIdCreator = (newDepartmentId) => ({
    type: UPDATE_MAIN_DOC_DEPARTMENT_ID,
    newDepartmentId
});

export const updateMainDocStatusIdCreator = (newStatusId) => ({
    type: UPDATE_MAIN_DOC_STATUS_ID,
    newStatusId
});

export const updateMainDocBeginDateCreator = (newBeginDate) => ({
    type: UPDATE_MAIN_DOC_BEGIN_DATE,
    newBeginDate
});

export const updateMainDocFinishDateCreator = (newFinishDate) => ({
    type: UPDATE_MAIN_DOC_FINISH_DATE,
    newFinishDate
});

export const updateMainDocPubDateCreator = (newPubDate) => ({
    type: UPDATE_MAIN_DOC_PUB_DATE,
    newPubDate
});

export const updateMainDocHeaderRuCreator = (newHeaderRu) => ({
    type: UPDATE_MAIN_DOC_HEADER_RU,
    newHeaderRu
});

export const updateMainDocHeaderKzCreator = (newHeaderKz) => ({
    type: UPDATE_MAIN_DOC_HEADER_KZ,
    newHeaderKz
});

export const updateMainDocFileRuCreator = (newFileRu) => ({
    type: UPDATE_MAIN_DOC_FILE_RU,
    newFileRu
});

export const updateMainDocFileKzCreator = (newFileKz) => ({
    type: UPDATE_MAIN_DOC_FILE_KZ,
    newFileKz
});

export const updateMainDocDescriptionRuCreator = (newDescriptionRu) => ({
    type: UPDATE_MAIN_DOC_DESCRIPTION_RU,
    newDescriptionRu
});

export const updateMainDocDescriptionKzCreator = (newDescriptionKz) => ({
    type: UPDATE_MAIN_DOC_DESCRIPTION_KZ,
    newDescriptionKz
});

export const updateMainDocTypeIdCreator = (newTypeId) => ({
    type: UPDATE_MAIN_DOC_TYPE_ID,
    newTypeId
});

export const updateMainDocTextRuCreator = (newTextRu) => ({
    type: UPDATE_MAIN_DOC_TEXT_RU,
    newTextRu
});

export const updateMainDocTextKzCreator = (newTextKz) => ({
    type: UPDATE_MAIN_DOC_TEXT_KZ,
    newTextKz
});

export const setMainDocsCreator = (mainDocs) => ({
    type: SET_MAIN_DOCS,
    mainDocs
});

export default MainDocReducer;