const ADD_DEPARTMENT = 'add_department';
const UPDATE_DEPARTMENT_NAME_RU = 'update_department_name_ru';
const UPDATE_DEPARTMENT_NAME_KZ = 'update_department_name_kz';
const SET_DEPARTMENTS = 'set_departments';
const SET_DEPARTMENTS_COUNT = 'set_departments_count';
const SET_DEPARTMENTS_IS_FETCHING = 'set_departments_is_fetching';

let initialState = {
    departments: [],
    newDepartmentNameRu: '',
    newDepartmentNameKz: '',
    departmentsCount: 0,
    isFetching: false,
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
        default:
            return state;
    }
};

export const addDepartmentCreator = () => ({
    type: ADD_DEPARTMENT
});

export const updateDepartmentNameRuCreator = (newNameRu) => ({
    type: UPDATE_DEPARTMENT_NAME_RU,
    newNameRu
});

export const updateDepartmentNameKzCreator = (newNameKz) => ({
    type: UPDATE_DEPARTMENT_NAME_KZ,
    newNameKz
});

export const setDepartmentsCreator = (departments) => ({
    type: SET_DEPARTMENTS,
    departments
});

export const setDepartmentsCountCreator = (departmentsCount) => ({
    type: SET_DEPARTMENTS_COUNT,
    departmentsCount
});

export const setDepartmentsIsFetchingCreator = (isFetching) => ({
    type: SET_DEPARTMENTS_IS_FETCHING,
    isFetching
});


export default DepartmentReducer;