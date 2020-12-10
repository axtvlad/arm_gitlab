import {restAPI} from "../../api/API";

const SET_DEPARTMENTS = 'set_departments';
const SET_DEPARTMENTS_COUNT = 'set_departments_count';
const SET_DEPARTMENTS_IS_FETCHING = 'set_departments_is_fetching';
const SET_CURRENT_DEPARTMENT = 'set_current_department';

const initialState = {
    departments: [],
    departmentsCount: 0,
    isFetching: false,
    currentDepartment: null,
};

export const DepartmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEPARTMENTS:
            return {
                ...state,
                departments: action.departments
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

const setDepartments = (departments) => ({
    type: SET_DEPARTMENTS,
    departments
});

const setDepartmentsCount = (departmentsCount) => ({
    type: SET_DEPARTMENTS_COUNT,
    departmentsCount
});

const setDepartmentsIsFetching = (isFetching) => ({
    type: SET_DEPARTMENTS_IS_FETCHING,
    isFetching
});

const setCurrentDepartment = (currentDepartment) => ({
    type: SET_CURRENT_DEPARTMENT,
    currentDepartment
});

export const getDepartments = () => async (dispatch) => {
    dispatch(setDepartmentsIsFetching(true));

    const response = await restAPI.departments.getDepartments()

    dispatch(setDepartmentsCount(response.totalCount));
    dispatch(setDepartments(response.data));
    dispatch(setDepartmentsIsFetching(false));
};

export const getDepartmentById = (id) => async (dispatch) => {
    const res = await restAPI.departments.getDepartmentById(id);

    dispatch(setCurrentDepartment(res.data));
};

export const postDepartment = (formData) => async (dispatch) => {
    await restAPI.departments.postDepartment(formData)

    dispatch(getDepartments())
};

export const deleteDepartmentById = (id) => async (dispatch) => {
    await restAPI.departments.deleteDepartmentById(id)

    dispatch(getDepartments())
};

export const updateDepartment = (id, data) => async (dispatch) => {
    await restAPI.departments.updateDepartment(id, data)

    dispatch(getDepartmentById(id))
};