import {restAPI} from "../../api/API";

const ADD_DEPARTMENT = 'add_department';
const UPDATE_DEPARTMENT_NAME_RU = 'update_department_name_ru';
const UPDATE_DEPARTMENT_NAME_KZ = 'update_department_name_kz';
const SET_DEPARTMENTS = 'set_departments';
const SET_DEPARTMENTS_COUNT = 'set_departments_count';
const SET_DEPARTMENTS_IS_FETCHING = 'set_departments_is_fetching';
const SET_CURRENT_DEPARTMENT = 'set_current_department';
const SET_IS_POSTED = 'set_is_posted';
const REMOVE_DEPARTMENT = 'remove_department';

let initialState = {
    departments: [],
    newDepartmentNameRu: '',
    newDepartmentNameKz: '',
    departmentsCount: 0,
    isFetching: false,
    currentDepartment: null,
    isPosted: false,
};

const DepartmentReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_DEPARTMENT:
            return {
                ...state,
                newDepartmentNameRu: '',
                newDepartmentNameKz: '',
                departments: [...state.departments, {
                    id: action.id,
                    name_ru: state.newDepartmentNameRu,
                    name_kz: state.newDepartmentNameKz,
                }]
            };
        case REMOVE_DEPARTMENT:
            return {
                ...state,
                departments: state.departments.filter(department => department.id !== action.id)
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
        case SET_IS_POSTED:
            return {
                ...state,
                isPosted: action.isPosted
            };
        default:
            return state;
    }
};

export const addDepartment = (id) => ({
    type: ADD_DEPARTMENT,
    id
});

export const removeDepartment = (id) => ({
    type: REMOVE_DEPARTMENT,
    id
});

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
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

export const getDepartments = () => (dispatch) => {

    dispatch(setDepartmentsIsFetching(true));

    restAPI.departments.getDepartments()
        .then(response => {
            dispatch(setDepartmentsCount(response.totalCount));
            dispatch(setDepartments(response.data));

            console.info('departments: ', response.data);

            dispatch(setDepartmentsIsFetching(false));
        });
};

export const getDepartmentById = (id) => (dispatch) => {

    dispatch(setDepartmentsIsFetching(true));

    restAPI.departments.getDepartmentById(id)
        .then(response => {
            dispatch(setCurrentDepartment(response.data));

            console.info('department: ', response.data);

            dispatch(setDepartmentsIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const postDepartment = (newDepartment) => (dispatch) => {

    dispatch(setDepartmentsIsFetching(true));

    restAPI.departments.postDepartment(newDepartment)
        .then(response => {
            console.info('posted department: ', response.data);

            dispatch(addDepartment(response.data.id));

            dispatch(setDepartmentsIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const deleteDepartmentById = (id) => (dispatch) => {

    dispatch(setDepartmentsIsFetching(true));

    restAPI.departments.deleteDepartmentById(id)
        .then(response => {
            console.info('deleted department: ', response.data);

            dispatch(removeDepartment(id));

            dispatch(setDepartmentsIsFetching(false));
        });
};

export default DepartmentReducer;