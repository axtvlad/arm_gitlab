import {restAPI} from "../../api/API";

const ADD_DEPARTMENT = 'add_department';
const UPDATE_DEPARTMENT_NAME_RU = 'update_department_name_ru';
const UPDATE_DEPARTMENT_NAME_KZ = 'update_department_name_kz';
const SET_DEPARTMENTS = 'set_departments';
const SET_DEPARTMENTS_COUNT = 'set_departments_count';
const SET_DEPARTMENTS_IS_FETCHING = 'set_departments_is_fetching';
const SET_CURRENT_DEPARTMENT = 'set_current_department';

let initialState = {
    departments: [],
    newDepartmentNameRu: '',
    newDepartmentNameKz: '',
    departmentsCount: 0,
    isFetching: false,
    currentDepartment: null,
};

const DepartmentReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_DEPARTMENT:
            return {
                ...state,
                newDepartmentNameRu: '',
                newDepartmentNameKz: '',
                departments: [...state.departments, {
                    id: 4,
                    name_ru: state.newDepartmentNameRu,
                    name_kz: state.newDepartmentNameKz,
                }]
            };
        case UPDATE_DEPARTMENT_NAME_RU:
            return {
                ...state,
                newDepartmentNameRu: action.newNameRu
            };
        case UPDATE_DEPARTMENT_NAME_KZ:
            return {
                ...state,
                newDepartmentNameKz: action.newNameKz
            };
        case SET_DEPARTMENTS:
            return {
                ...state,
                departments: [...state.departments, ...action.departments]
            };
        case SET_DEPARTMENTS_COUNT:
            return {
                ...state,
                departmentsCount: action.departmentsCount
            };
        case SET_DEPARTMENTS_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CURRENT_DEPARTMENT:
            return {
                ...state,
                currentDepartment: action.currentDepartment
            };
        default:
            return state;
    }
};

export const addDepartment = () => ({
    type: ADD_DEPARTMENT
});

export const updateDepartmentNameRu = (newNameRu) => ({
    type: UPDATE_DEPARTMENT_NAME_RU,
    newNameRu
});

export const updateDepartmentNameKz = (newNameKz) => ({
    type: UPDATE_DEPARTMENT_NAME_KZ,
    newNameKz
});

export const setDepartments = (departments) => ({
    type: SET_DEPARTMENTS,
    departments
});

export const setDepartmentsCount = (departmentsCount) => ({
    type: SET_DEPARTMENTS_COUNT,
    departmentsCount
});

export const setDepartmentsIsFetching = (isFetching) => ({
    type: SET_DEPARTMENTS_IS_FETCHING,
    isFetching
});

export const setCurrentDepartment = (currentDepartment) => ({
    type: SET_CURRENT_DEPARTMENT,
    currentDepartment
});

export const getDepartments = () => {
    return (dispatch) => {

        dispatch(setDepartmentsIsFetching(true));

        restAPI.departments.getDepartments()
            .then(response => {
                dispatch(setDepartmentsCount(response.totalCount));
                dispatch(setDepartments(response.data));

                console.info('departments: ', response.data);

                dispatch(setDepartmentsIsFetching(false));
            });
    }
};

export default DepartmentReducer;