import {restAPI} from "../../api/API";

const SET_IS_POSTED = 'set_is_posted';
const SET_TYPES = 'set_types';
const SET_TYPES_COUNT = 'set_types_count';
const SET_TYPES_IS_FETCHING = 'set_types_is_fetching';
const SET_CURRENT_TYPE = 'set_type';

const initialState = {
    types: [],
    typesCount: 0,
    isFetching: false,
    currentType: null,
    isPosted: false,
};

export const TypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TYPES:
            return {
                ...state,
                types: action.typesArr
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
        case SET_IS_POSTED:
            return {
                ...state,
                isPosted: action.isPosted,
            };
        default:
            return state;
    }
};

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
});

export const setTypes = (typesArr) => ({
    type: SET_TYPES,
    typesArr
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

export const getTypes = () => async (dispatch) => {
    dispatch(setTypesIsFetching(true));

    const response = await restAPI.types.getTypes()

    dispatch(setTypesCount(response.totalCount));
    dispatch(setTypes(response.data));
    dispatch(setTypesIsFetching(false));
};

export const getTypeById = (id) => async (dispatch) => {
    const res = restAPI.types.getTypeById(id)

    dispatch(setCurrentType(res.data));
};

export const deleteTypeById = (id) => async (dispatch) => {
    await restAPI.types.deleteTypeById(id)

    dispatch(getTypes())
};

export const postType = (newType) => async (dispatch) => {
    await restAPI.types.postType(newType)

    dispatch(getTypes())
};