import {restAPI} from "../../api/API";

const ADD_TEMPLATE = 'add_template';
const UPDATE_TEMPLATE_NAME_RU = 'update_new_template_name_ru';
const UPDATE_TEMPLATE_NAME_KZ = 'update_new_template_name_kz';
const UPDATE_FILE_NAME_RU = 'update_new_file_name_ru';
const UPDATE_FILE_NAME_KZ = 'update_new_file_name_ru';
const UPDATE_CATEGORY_ID = 'update_category_id';
const SET_TEMPLATES_IS_FETCHING = 'set_templates_is_fetching';
const SET_TEMPLATES = 'set_templates';
const SET_TEMPLATES_COUNT = 'set_templates_count';
const SET_CURRENT_TEMPLATE = 'set_current_template';
const SET_IS_POSTED = 'set_is_posted';
const REMOVE_TEMPLATE = 'remove_template';

let initialState = {
    templates: [
        {
            id: 1,
            name_ru: 'Шаблон приказа на фирменном бланке Политехнического колледжа',
            name_kz: 'Политехникалық колледждің фирмалық бланкісіндегі бұйрық үлгісі',
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
    category_id: null,
    currentTemplate: null,
    isPosted: false,
};

const TemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEMPLATE:
            return {
                ...state,
                newTemplateNameRu: '',
                newTemplateNameKz: '',
                templates: [...state.templates, {
                    id: action.id,
                    name_ru: state.newFileNameRu,
                    name_kz: state.newFileNameKz,
                    fileName_ru: state.newFileNameRu,
                    fileName_kz: state.newFileNameKz,
                    category_id: state.category_id
                }]
            };
        case REMOVE_TEMPLATE:
            return {
                ...state,
                templates: state.templates.filter(template => template.id !== action.id)
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
        case SET_CURRENT_TEMPLATE:
            return {
                ...state,
                currentTemplate: action.currentTemplate
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

export const addTemplate = (id) => ({
    type: ADD_TEMPLATE,
    id
});

export const removeTemplate = (id) => ({
    type: REMOVE_TEMPLATE,
    id
});

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
});

export const updateTemplateNameRu = (newNameRu) => ({
    type: UPDATE_TEMPLATE_NAME_RU,
    newNameRu
});

export const updateTemplateNameKz = (newNameKz) => ({
    type: UPDATE_TEMPLATE_NAME_KZ,
    newNameKz
});

export const updateTemplateFileNameRu = (newFileNameRu) => ({
    type: UPDATE_FILE_NAME_RU,
    newFileNameRu
});

export const updateTemplateFileNameKz = (newFileNameKz) => ({
    type: UPDATE_FILE_NAME_KZ,
    newFileNameKz
});

export const updateTemplateCategoryId = (category_id) => ({
    type: UPDATE_CATEGORY_ID,
    category_id
});

export const setTemplates = (templates) => ({
    type: SET_TEMPLATES,
    templates
});

export const setTemplatesIsFetching = (isFetching) => ({
    type: SET_TEMPLATES_IS_FETCHING,
    isFetching
});

export const setTemplatesCount = (templatesCount) => ({
    type: SET_TEMPLATES_COUNT,
    templatesCount
});

export const setCurrentTemplate = (currentTemplate) => ({
    type: SET_CURRENT_TEMPLATE,
    currentTemplate
});

export const getTemplates = () => (dispatch) => {

    dispatch(setTemplatesIsFetching(true));

    restAPI.templates.getTemplates()
        .then(response => {
            dispatch(setTemplatesCount(response.totalCount));
            dispatch(setTemplates(response.data));

            console.info('templates: ', response.data);

            dispatch(setTemplatesIsFetching(false));
        });
};

export const getTemplateById = (id) => (dispatch) => {

    dispatch(setTemplatesIsFetching(true));

    restAPI.templates.getTemplateById(id)
        .then(response => {
            dispatch(setCurrentTemplate(response.data));

            console.info('template: ', response.data);

            dispatch(setTemplatesIsFetching(false));
        });
};

export const postTemplate = (newTemplate) => (dispatch) => {

    dispatch(setTemplatesIsFetching(true));

    restAPI.templates.postTemplate(newTemplate)
        .then(response => {
            console.info('posted template: ', response.data);

            dispatch(addTemplate(response.data.id));

            dispatch(setTemplatesIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const deleteTemplateById = (id) => (dispatch) => {

    dispatch(setTemplatesIsFetching(true));

    restAPI.templates.deleteTemplateById(id)
        .then(response => {
            console.info('deleted template: ', response.data);

            dispatch(removeTemplate(id));

            dispatch(setTemplatesIsFetching(false));
        });
};

export default TemplateReducer;