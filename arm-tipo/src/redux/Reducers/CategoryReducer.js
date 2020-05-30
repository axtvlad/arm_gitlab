import {restAPI} from "../../api/API";

const ADD_CATEGORY = 'add_category';
const UPDATE_CATEGORY_NAME_RU = 'update_category_name_ru';
const UPDATE_CATEGORY_NAME_KZ = 'update_category_name_kz';
const SET_CATEGORIES = 'set_categories';
const SET_CATEGORIES_COUNT = 'set_categories_count';
const SET_CATEGORIES_IS_FETCHING = 'set_categories_is_fetching';
const SET_CURRENT_CATEGORY = 'set_current_category';
const SET_IS_POSTED = 'set_is_posted';
const REMOVE_CATEGORY = 'remove_category';

let initialState = {
    categories: [],
    newCategoryNameRu: '',
    newCategoryNameKz: '',
    categoriesCount: 0,
    isFetching: false,
    currentCategory: null,
    isPosted: false,
};

const CategoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_CATEGORY:
            return {
                ...state,
                newCategoryNameRu: '',
                newCategoryNameKz: '',
                categories: [...state.categories, {
                    id: action.id,
                    name_ru: state.newCategoryNameRu,
                    name_kz: state.newCategoryNameKz,
                }]
            };
        case REMOVE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.id)
            };
        case UPDATE_CATEGORY_NAME_RU:
            return {
                ...state,
                newCategoryNameRu: action.newNameRu
            };
        case UPDATE_CATEGORY_NAME_KZ:
            return {
                ...state,
                newCategoryNameKz: action.newNameKz
            };
        case SET_CATEGORIES:
            return {
                ...state,
                categories: [...state.categories, ...action.categories]
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

export const addCategory = (id) => ({
    type: ADD_CATEGORY,
    id
});

export const removeCategory = (id) => ({
    type: REMOVE_CATEGORY,
    id
});

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
});

export const updateCategoryNameRu = (newNameRu) => ({
    type: UPDATE_CATEGORY_NAME_RU,
    newNameRu
});

export const updateCategoryNameKz = (newNameKz) => ({
    type: UPDATE_CATEGORY_NAME_KZ,
    newNameKz
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

export const getCategories = () => (dispatch) => {

    dispatch(setCategoriesIsFetching(true));

    restAPI.categories.getCategories()
        .then(response => {
            dispatch(setCategoriesCount(response.totalCount));
            dispatch(setCategories(response.data));

            console.info('categories: ', response.data);

            dispatch(setCategoriesIsFetching(false));
        });
};

export const getCategoryById = (id) => (dispatch) => {

    dispatch(setCategoriesIsFetching(true));

    restAPI.categories.getCategoryById(id)
        .then(response => {
            dispatch(setCurrentCategory(response.data));

            console.info('category: ', response.data);

            dispatch(setCategoriesIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const postCategory = (newCategory) => (dispatch) => {

    dispatch(setCategoriesIsFetching(true));

    restAPI.categories.postCategory(newCategory)
        .then(response => {
            console.info('posted category: ', response.data);

            dispatch(addCategory(response.data.id));

            dispatch(setCategoriesIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const deleteCategoryById = (id) => (dispatch) => {

    dispatch(setCategoriesIsFetching(true));

    restAPI.categories.deleteCategoryById(id)
        .then(response => {
            console.info('deleted category: ', response.data);

            dispatch(removeCategory(id));

            dispatch(setCategoriesIsFetching(false));
        });
};

export default CategoryReducer;