const ADD_TEMPLATE = 'add_template';
const UPDATE_TEMPLATE_NAME_RU = 'update_new_template_name_ru';
const UPDATE_TEMPLATE_NAME_KZ = 'update_new_template_name_kz';
const UPDATE_FILE_NAME_RU = 'update_new_file_name_ru';
const UPDATE_FILE_NAME_KZ = 'update_new_file_name_ru';
const UPDATE_CATEGORY_ID = 'update_category_id';
const SET_TEMPLATES_IS_FETCHING = 'set_templates_is_fetching';
const SET_TEMPLATES = 'set_templates';
const SET_TEMPLATES_COUNT = 'set_templates_count';

let initialState = {
    templates: [
        {
            id: 1,
            name_ru: 'Просто шаблон',
            name_kz: 'Жай шаблон',
            fileName_ru: '/src/mainDocs/fsdj8f2oh',
            fileName_kz: '/src/mainDocs/fsffsoh94',
            category_id: 1
        }
    ],
    newTemplateNameRu: '',
    newTemplateNameKz: '',
    isFetching: false,
    newFileNameRu: '',
    newFileNameKz: '',
    templatesCount: 0,
    category_id: null
}

const TemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEMPLATE:
            return {
                ...state,
                newTemplateNameRu: '',
                newTemplateNameKz: '',
                templates: [...state.templates, {
                    id: 4,
                    name_ru: state.newFileNameRu,
                    name_kz: state.newFileNameKz,
                    fileName_ru: state.newFileNameRu,
                    fileName_kz: state.newFileNameKz,
                    category_id: state.category_id
                }]
            };
        case UPDATE_TEMPLATE_NAME_RU:
            return {
                ...state,
                newTemplateNameRu: action.newNameRu
            };
        case UPDATE_TEMPLATE_NAME_KZ:
            return {
                ...state,
                newTemplateNameKz: action.newNameKz
            };
        case UPDATE_FILE_NAME_RU:
            return {
                ...state,
                newFileNameRu: action.newFileNameRu
            };
        case UPDATE_FILE_NAME_KZ:
            return {
                ...state,
                newFileNameKz: action.newFileNameKz
            };
        case UPDATE_CATEGORY_ID:
            return {
                ...state,
                category_id: action.category_id
            };
        case SET_TEMPLATES:
            return {
                ...state,
                templates: [...state.templates, ...action.templates]
            };
        case SET_TEMPLATES_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_TEMPLATES_COUNT:
            return {
                ...state,
                templatesCount: action.templatesCount
            };
        default:
            return state;
    }
}

export const addTemplate = () => ({
    type: ADD_TEMPLATE
})

export const updateTemplateNameRu = (newNameRu) => ({
    type: UPDATE_TEMPLATE_NAME_RU,
    newNameRu
})

export const updateTemplateNameKz = (newNameKz) => ({
    type: UPDATE_TEMPLATE_NAME_KZ,
    newNameKz
})

export const updateFileNameRu = (newFileNameRu)  => ({
    type: UPDATE_FILE_NAME_RU,
    newFileNameRu
})

export const updateFileNameKz =  (newFileNameKz) => ({
    type: UPDATE_FILE_NAME_KZ,
    newFileNameKz
})

export const updateCategoryID = (category_id) => ({
    type: UPDATE_CATEGORY_ID,
    category_id
})

export const setTemplates = (templates) => ({
    type: SET_TEMPLATES,
    templates
})

export const setTemplatesIsFetching = (isFetching) => ({
    type: SET_TEMPLATES_IS_FETCHING,
    isFetching
})

export const setTemplatesCount = (templatesCount) => ({
    type:SET_TEMPLATES_COUNT,
    templatesCount
})

export default TemplateReducer;