import {restAPI} from "../../api/API";

const ADD_CATEGORY = 'add_category';
const UPDATE_CATEGORY_NAME_RU = 'update_category_name_ru';
const UPDATE_CATEGORY_NAME_KZ = 'update_category_name_kz';
const SET_CATEGORIES = 'set_categories';
const SET_CATEGORIES_COUNT = 'set_categories_count';
const SET_CATEGORIES_IS_FETCHING = 'set_categories_is_fetching';
const SET_CURRENT_CATEGORY = 'set_current_category';

let initialState = {
    categories: [],
    newCategoryNameRu: '',
    newCategoryNameKz: '',
    categoriesCount: 0,
    isFetching: false,
    currentCategory: null
};

const CategoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_CATEGORY:
            return {
                ...state,
                newCategoryNameRu: '',
                newCategoryNameKz: '',
                categories: [...state.categories, {
                    id: 2,
                    name_ru: state.newCategoryNameRu,
                    name_kz: state.newCategoryNameKz,
                }]
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
        default:
            return state;
    }
};


export const addCategory = () => ({
    type: ADD_CATEGORY
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

export const getCategories = () => {
    return (dispatch) => {

        dispatch(setCategoriesIsFetching(true));

        restAPI.categories.getCategories()
            .then(response => {
                dispatch(setCategoriesCount(response.totalCount));
                dispatch(setCategories(response.data));

                console.info('categories: ', response.data);

                dispatch(setCategoriesIsFetching(false));
            });
    }
};

export default CategoryReducer;