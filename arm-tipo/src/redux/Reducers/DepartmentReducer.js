const ADD_DEPARTMENT = 'add_department';
const UPDATE_DEPARTMENT_NAME_RU = 'update_department_name_ru';
const UPDATE_DEPARTMENT_NAME_KZ = 'update_department_name_kz';

let initialState = {
    departments: [
        {id: 1, name_ru: 'Отдел 1', name_kz: 'Отдел1'},
        {id: 2, name_ru: 'Отдел 2', name_kz: 'Отдел2'},
        {id: 3, name_ru: 'Отдел 3', name_kz: 'Отдел3'},
    ],
    newDepartmentNameRu: '',
    newDepartmentNameKz: '',
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

export default DepartmentReducer;