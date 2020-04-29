const ADD_CATEGORY = 'add_category';
const UPDATE_CATEGORY_NAME_RU = 'update_category_name_ru';
const UPDATE_CATEGORY_NAME_KZ = 'update_category_name_kz';

let initialState = {
    categories: [
        {id: 1, name_ru: 'Закон', name_kz: 'Заң'},
    ],
    newCategoryNameRu: '',
    newCategoryNameKz: '',
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

export default CategoryReducer;