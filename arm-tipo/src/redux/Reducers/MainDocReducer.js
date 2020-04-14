const ADD_MAIN_DOC = 'add_main_doc',
    UPDATE_MAIN_DOC_NAME_RU = 'update_main_doc_name_ru',
    UPDATE_MAIN_DOC_NAME_KZ = 'update_main_doc_name_kz',
    UPDATE_MAIN_DOC_NUMBER = 'update_main_doc_number',
    UPDATE_MAIN_DOC_DEPARTMENT_ID = 'update_main_doc_department_id',
    UPDATE_MAIN_DOC_STATUS_ID = 'update_main_doc_status_id',
    UPDATE_MAIN_DOC_BEGIN_DATE = 'update_main_doc_begin_date',
    UPDATE_MAIN_DOC_FINISH_DATE = 'update_main_doc_finish_date',
    UPDATE_MAIN_DOC_PUB_DATE = 'update_main_doc_pub_date',
    UPDATE_MAIN_DOC_HEADER_RU = 'update_main_doc_header_ru',
    UPDATE_MAIN_DOC_HEADER_KZ = 'update_main_doc_header_kz',
    UPDATE_MAIN_DOC_FILE_RU = 'update_main_doc_file_ru',
    UPDATE_MAIN_DOC_FILE_KZ = 'update_main_doc_file_kz',
    UPDATE_MAIN_DOC_DESCRIPTION_RU = 'update_main_doc_description_ru',
    UPDATE_MAIN_DOC_DESCRIPTION_KZ = 'update_main_doc_description_kz',
    UPDATE_MAIN_DOC_TYPE_ID = 'update_main_doc_type_id',
    UPDATE_MAIN_DOC_TEXT_RU = 'update_main_doc_text_ru',
    UPDATE_MAIN_DOC_TEXT_KZ = 'update_main_doc_text_kz';

let initialState = {
    mainDocs: [
        {
            id: 1,
            number: 'BBC-991',
            department_id: 1,
            status_id: 1,
            begin_date: '2020-03-02',
            finish_date: '2030-03-02',
            pub_date: '2020-03-01',
            name_ru: 'Приказ о зачислении',
            name_kz: 'Приказ о зачислении',
            header_ru: 'Данный приказ о зачислении на очную форму обучения',
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
        case ADD_MAIN_DOC: {
            let newMainDoc = {
                id: 1,
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
            };
            state.mainDocs.push(newMainDoc);
            state.newMainDocNumber = '';
            state.newMainDocDepartmentId = null;
            state.newMainDocStatusId = null;
            state.newMainDocNameRu = '';
            state.newMainDocNameKz = '';
            state.newMainDocBeginDate = null;
            state.newMainDocFinishDate = null;
            state.newMainDocPubDate = null;
            state.newMainDocHeaderRu = '';
            state.newMainDocHeaderKz = '';
            state.newMainDocFileRu = '';
            state.newMainDocFileKz = '';
            state.newMainDocDescriptionRu = '';
            state.newMainDocDescriptionKz = '';
            state.newMainDocTypeId = null;
            state.newMainDocTextRu = '';
            state.newMainDocTextKz = '';
            return state;
        }
        case UPDATE_MAIN_DOC_NAME_RU: {
            state.newMainDocNameRu = action.newNameRu;
            return state;
        }
        case UPDATE_MAIN_DOC_NAME_KZ: {
            state.newMainDocNameKz = action.newNameKz;
            return state;
        }
        case UPDATE_MAIN_DOC_BEGIN_DATE: {
            state.newMainDocBeginDate = action.newBeginDate;
            return state;
        }
        case UPDATE_MAIN_DOC_FINISH_DATE: {
            state.newMainDocFinishDate = action.newFinishDate;
            return state;
        }
        case UPDATE_MAIN_DOC_PUB_DATE: {
            state.newMainDocPubDate = action.newPubDate;
            return state;
        }
        case UPDATE_MAIN_DOC_NUMBER: {
            state.newMainDocNumber = action.newNumber;
            return state;
        }
        case UPDATE_MAIN_DOC_DEPARTMENT_ID: {
            state.newMainDocDepartmentId = action.newDepartmentId;
            return state;
        }
        case UPDATE_MAIN_DOC_STATUS_ID: {
            state.newMainDocStatusId = action.newStatusId;
            return state;
        }
        case UPDATE_MAIN_DOC_HEADER_RU: {
            state.newMainDocHeaderRu = action.newHeaderRu;
            return state;
        }
        case UPDATE_MAIN_DOC_HEADER_KZ: {
            state.newMainDocHeaderKz = action.newHeaderKz;
            return state;
        }
        case UPDATE_MAIN_DOC_FILE_RU: {
            state.newMainDocFileRu = action.newFileRu;
            return state;
        }
        case UPDATE_MAIN_DOC_FILE_KZ: {
            state.newMainDocFileRu = action.newFileKz;
            return state;
        }
        case UPDATE_MAIN_DOC_DESCRIPTION_RU: {
            state.newMainDocDescriptionRu = action.newDescriptionRu;
            return state;
        }
        case UPDATE_MAIN_DOC_DESCRIPTION_KZ: {
            state.newMainDocDescriptionKz = action.newDescriptionKz;
            return state;
        }
        case UPDATE_MAIN_DOC_TEXT_RU: {
            state.newMainDocTextRu = action.newTextRu;
            return state;
        }
        case UPDATE_MAIN_DOC_TEXT_KZ: {
            state.newMainDocTextRu = action.newTextKz;
            return state;
        }
        case UPDATE_MAIN_DOC_TYPE_ID: {
            state.newMainDocTypeId = action.newTypeId;
            return state;
        }
        default: {
            return state;
        }
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

export const updateMainDocTextKzCreator = (newTextRu) => ({
    type: UPDATE_MAIN_DOC_TEXT_RU,
    newTextRu
});

export default MainDocReducer;