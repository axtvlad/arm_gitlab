import {templatesAPI} from "../../api/templatesAPI";

const SET_TEMPLATES_IS_FETCHING = 'set_templates_is_fetching';
const SET_TEMPLATES = 'set_templates';
const SET_TEMPLATES_COUNT = 'set_templates_count';
const SET_CURRENT_TEMPLATE = 'set_current_template';

const initialState = {
    templates: [],
    isFetching: false,
    templatesCount: 0,
    currentTemplate: null,
};

export const TemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEMPLATES:
            return {
                ...state,
                templates: action.templates
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
        default:
            return state;
    }
};

const setTemplates = (templates) => ({
    type: SET_TEMPLATES,
    templates
});

const setTemplatesIsFetching = (isFetching) => ({
    type: SET_TEMPLATES_IS_FETCHING,
    isFetching
});

const setTemplatesCount = (templatesCount) => ({
    type: SET_TEMPLATES_COUNT,
    templatesCount
});

const setCurrentTemplate = (currentTemplate) => ({
    type: SET_CURRENT_TEMPLATE,
    currentTemplate
});

export const getTemplates = () => async (dispatch) => {
    dispatch(setTemplatesIsFetching(true));

    const response = await templatesAPI.getTemplates()

    dispatch(setTemplatesCount(response.totalCount));
    dispatch(setTemplates(response.data));
    dispatch(setTemplatesIsFetching(false));
};

export const getTemplateById = (id) => async (dispatch) => {
    const res = await templatesAPI.getTemplateById(id)

    dispatch(setCurrentTemplate(res.data));
};

export const postTemplate = (formData) => async (dispatch) => {
    await templatesAPI.postTemplate(formData)

    dispatch(getTemplates())
};

export const deleteTemplateById = (id) => async (dispatch) => {
    await templatesAPI.deleteTemplateById(id)

    dispatch(getTemplates())
};

export const updateTemplate = (id, data) => async (dispatch) => {
    await templatesAPI.updateTemplate(id, data)

    dispatch(getTemplateById(id))
};