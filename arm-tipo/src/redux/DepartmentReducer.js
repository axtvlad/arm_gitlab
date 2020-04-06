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
        case ADD_DEPARTMENT: {
            let newDepartment = {
                id: 4,
                name_ru: state.newDepartmentNameRu,
                name_kz: state.newDepartmentNameKz,
            };
            state.departments.push(newDepartment);
            state.newDepartmentNameRu = '';
            state.newDepartmentNameKz = '';
            return state;
        }
        case UPDATE_DEPARTMENT_NAME_RU: {
            state.newDepartmentNameRu = action.newName;
            return state;
        }
        case UPDATE_DEPARTMENT_NAME_KZ: {
            state.newDepartmentNameKz = action.newName;
            return state;
        }
        default: {
            return state;
        }
    }
};


export const addDepartmentCreator = () => ({
    type: ADD_DEPARTMENT
});

export const updateDepartmentNameRuCreator = (newName) => ({
    type: UPDATE_DEPARTMENT_NAME_RU,
    newName
});

export const updateDepartmentNameKzCreator = (newName) => ({
    type: UPDATE_DEPARTMENT_NAME_KZ,
    newName
});

export default DepartmentReducer;