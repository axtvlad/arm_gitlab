import {restAPI} from "../../api/API";

const SET_CATEGORIES = 'set_categories';
const SET_CATEGORIES_COUNT = 'set_categories_count';
const SET_CATEGORIES_IS_FETCHING = 'set_categories_is_fetching';
const SET_CURRENT_CATEGORY = 'set_current_category';
const SET_IS_POSTED = 'set_is_posted';

const initialState = {
    categories: [],
    categoriesCount: 0,
    isFetching: false,
    currentCategory: null,
    isPosted: false,
};

export const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case SET_CATEGORIES_COUNT:
            return {
                ...state,
                categoriesCount: action.categoriesCount
            };
        case SET_CATEGORIES_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
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

export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    categories
});

export const setCategoriesCount = (categoriesCount) => ({
    type: SET_CATEGORIES_COUNT,
    categoriesCount
});

export const setCategoriesIsFetching = (isFetching) => ({
    type: SET_CATEGORIES_IS_FETCHING,
    isFetching
});

export const setCurrentCategory = (currentCategory) => ({
    type: SET_CURRENT_CATEGORY,
    currentCategory
});

export const getCategories = () => async (dispatch) => {
    dispatch(setCategoriesIsFetching(true));

    const response = await restAPI.categories.getCategories()

    dispatch(setCategoriesCount(response.totalCount));
    dispatch(setCategories(response.data));
    dispatch(setCategoriesIsFetching(false));
};

export const getCategoryById = (id) => async (dispatch) => {
    const response = await restAPI.categories.getCategoryById(id)

    dispatch(setCurrentCategory(response.data));
};

export const postCategory = (formData) => async (dispatch) => {
    await restAPI.categories.postCategory(formData);

    dispatch(getCategories())
}

export const deleteCategoryById = (id) => async (dispatch) => {
    await restAPI.categories.deleteCategoryById(id)

    dispatch(getCategories())
};