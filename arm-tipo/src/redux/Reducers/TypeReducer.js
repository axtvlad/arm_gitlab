const ADD_TYPE = 'add_type';
const UPDATE_TYPE_NAME_RU = 'update_type_name_ru';
const UPDATE_TYPE_NAME_KZ = 'update_type_name_kz';

let initialState = {
    types: [
        {id: 1, name_ru: 'Тип 1', name_kz: 'Тип1'},
        {id: 2, name_ru: 'Тип 2', name_kz: 'Тип2'}
    ],
    newTypeNameRu: '',
    newTypeNameKz: '',
};

const TypeReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TYPE:
            return {
                ...state,
                newTypeNameRu: '',
                newTypeNameKz: '',
                types: [...state.types, {
                    id: 3,
                    name_ru: state.newTypeNameRu,
                    name_kz: state.newTypeNameKz,
                }]
            };
        case UPDATE_TYPE_NAME_RU:
            return {
                ...state,
                newTypeNameRu: action.newNameRu
            };
        case UPDATE_TYPE_NAME_KZ:
            return {
                ...state,
                newTypeNameKz: action.newNameKz
            };
        default:
            return state;
    }
};

export const addTypeCreator = () => ({
    type: ADD_TYPE
});

export const updateTypeNameRuCreator = (newNameRu) => ({
    type: UPDATE_TYPE_NAME_RU,
    newNameRu
});

export const updateTypeNameKzCreator = (newNameKz) => ({
    type: UPDATE_TYPE_NAME_KZ,
    newNameKz
});

export default TypeReducer;