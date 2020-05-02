const ADD_CATEGORY = 'add_category';
const UPDATE_CATEGORY_NAME_RU = 'update_category_name_ru';
const UPDATE_CATEGORY_NAME_KZ = 'update_category_name_kz';
const SET_CATEGORIES = 'set_categories';
const SET_CATEGORIES_COUNT = 'set_categories_count';
const SET_CATEGORIES_IS_FETCHING = 'set_categories_is_fetching';

let initialState = {
    categories: [],
    newCategoryNameRu: '',
    newCategoryNameKz: '',
    categoriesCount: 0,
    isFetching: false,
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
        default:
            return state;
    }
};


export const addCategoryCreator = () => ({
    type: ADD_CATEGORY
});

export const updateCategoryNameRuCreator = (newNameRu) => ({
    type: UPDATE_CATEGORY_NAME_RU,
    newNameRu
});

export const updateCategoryNameKzCreator = (newNameKz) => ({
    type: UPDATE_CATEGORY_NAME_KZ,
    newNameKz
});

export const setCategoriesCreator = (categories) => ({
    type: SET_CATEGORIES,
    categories
});

export const setCategoriesCountCreator = (categoriesCount) => ({
    type: SET_CATEGORIES_COUNT,
    categoriesCount
});

export const setCategoriesIsFetchingCreator = (isFetching) => ({
    type: SET_CATEGORIES_IS_FETCHING,
    isFetching
});

export default CategoryReducer;