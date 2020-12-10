import {restAPI} from "../../api/API";

const SET_CATEGORIES = 'set_categories';
const SET_CATEGORIES_COUNT = 'set_categories_count';
const SET_CATEGORIES_IS_FETCHING = 'set_categories_is_fetching';
const SET_CURRENT_CATEGORY = 'set_current_category';

const initialState = {
    categories: [],
    categoriesCount: 0,
    isFetching: false,
    currentCategory: null,
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
        default:
            return state;
    }
};

const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    categories
});

const setCategoriesCount = (categoriesCount) => ({
    type: SET_CATEGORIES_COUNT,
    categoriesCount
});

const setCategoriesIsFetching = (isFetching) => ({
    type: SET_CATEGORIES_IS_FETCHING,
    isFetching
});

const setCurrentCategory = (currentCategory) => ({
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

export const updateCategory = (id, data) => async (dispatch) => {
    await restAPI.categories.updateCategory(id, data)

    dispatch(getCategoryById(id))
};