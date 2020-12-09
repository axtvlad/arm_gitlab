import {restAPI} from "../../api/API";

const SET_TEMPLATES_IS_FETCHING = 'set_templates_is_fetching';
const SET_TEMPLATES = 'set_templates';
const SET_TEMPLATES_COUNT = 'set_templates_count';
const SET_CURRENT_TEMPLATE = 'set_current_template';
const SET_IS_POSTED = 'set_is_posted';

const initialState = {
    templates: [],
    isFetching: false,
    templatesCount: 0,
    currentTemplate: null,
    isPosted: false,
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

export const getTemplates = () => async (dispatch) => {
    dispatch(setTemplatesIsFetching(true));

    const response = await restAPI.templates.getTemplates()

    dispatch(setTemplatesCount(response.totalCount));
    dispatch(setTemplates(response.data));
    dispatch(setTemplatesIsFetching(false));
};

export const getTemplateById = (id) => async (dispatch) => {
    const res = await restAPI.templates.getTemplateById(id)

    dispatch(setCurrentTemplate(res.data));
};

export const postTemplate = (formData) => async (dispatch) => {
    await restAPI.templates.postTemplate(formData)

    dispatch(getTemplates())
};

export const deleteTemplateById = (id) => async (dispatch) => {
    await restAPI.templates.deleteTemplateById(id)

    dispatch(getTemplates())
};