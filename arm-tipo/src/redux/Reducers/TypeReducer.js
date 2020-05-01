const ADD_TYPE = 'add_type';
const UPDATE_TYPE_NAME_RU = 'update_type_name_ru';
const UPDATE_TYPE_NAME_KZ = 'update_type_name_kz';
const SET_TYPES = 'set_types';
const SET_TYPES_COUNT = 'set_types_count';

let initialState = {
    types: [],
    newTypeNameRu: '',
    newTypeNameKz: '',
    typesCount: 0,
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
        case SET_TYPES:
            return {
                ...state,
                types: [...state.types, ...action.types]
            };
        case SET_TYPES_COUNT:
            return {
                ...state,
                typesCount: action.typesCount
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

export const setTypesCreator = (types) => ({
    type: SET_TYPES,
    types
});

export const setTypesCountCreator = (typesCount) => ({
    type: SET_TYPES_COUNT,
    typesCount
});

export default TypeReducer;