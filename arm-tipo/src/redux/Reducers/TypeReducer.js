import {restAPI} from "../../api/API";

const ADD_TYPE = 'add_type';
const REMOVE_TYPE = 'remove_type';
const UPDATE_TYPE_NAME_RU = 'update_type_name_ru';
const UPDATE_TYPE_NAME_KZ = 'update_type_name_kz';
const SET_TYPES = 'set_types';
const SET_TYPES_COUNT = 'set_types_count';
const SET_TYPES_IS_FETCHING = 'set_types_is_fetching';
const SET_CURRENT_TYPE = 'set_type';

let initialState = {
    types: [],
    newTypeNameRu: '',
    newTypeNameKz: '',
    typesCount: 0,
    isFetching: false,
    currentType: null,
};

const TypeReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TYPE:
            return {
                ...state,
                newTypeNameRu: '',
                newTypeNameKz: '',
                types: [...state.types, {
                    id: action.id,
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
        case SET_TYPES_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CURRENT_TYPE:
            return {
                ...state,
                currentType: action.currentType
            };
        default:
            return state;
    }
};

export const addType = (id) => ({
    type: ADD_TYPE,
    id
});

export const removeType = (id) => ({
    type: REMOVE_TYPE,
    id
});

export const updateTypeNameRu = (newNameRu) => ({
    type: UPDATE_TYPE_NAME_RU,
    newNameRu
});

export const updateTypeNameKz = (newNameKz) => ({
    type: UPDATE_TYPE_NAME_KZ,
    newNameKz
});

export const setTypes = (types) => ({
    type: SET_TYPES,
    types
});

export const setTypesCount = (typesCount) => ({
    type: SET_TYPES_COUNT,
    typesCount
});

export const setTypesIsFetching = (isFetching) => ({
    type: SET_TYPES_IS_FETCHING,
    isFetching
});

export const setCurrentType = (currentType) => ({
    type: SET_CURRENT_TYPE,
    currentType
});

export const getTypes = () => (dispatch) => {

    dispatch(setTypesIsFetching(true));

    restAPI.types.getTypes()
        .then(response => {
            dispatch(setTypesCount(response.totalCount));
            dispatch(setTypes(response.data));

            console.info('types: ', response.data);

            dispatch(setTypesIsFetching(false));
        });
};

export const getTypeById = (id) => (dispatch) => {

    dispatch(setTypesIsFetching(true));

    restAPI.types.getTypeById(id)
        .then(response => {
            dispatch(setCurrentType(response.data));

            console.info('type: ', response.data);

            dispatch(setTypesIsFetching(false));
        });
};

export const deleteTypeById = (id) => (dispatch) => {

    dispatch(setTypesIsFetching(true));

    restAPI.types.deleteTypeById(id)
        .then(response => {
            console.info('deleted type: ', response.data);

            dispatch(setTypesIsFetching(false));
        });
};

export const postType = (newType) => (dispatch) => {

    dispatch(setTypesIsFetching(true));

    restAPI.types.postType(newType)
        .then(response => {
            console.info('posted type: ', response.data);

            dispatch(addType(response.data.id));

            dispatch(setTypesIsFetching(false));
        });
};

export default TypeReducer;