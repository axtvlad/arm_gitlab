const ADD_DEPARTMENT = 'add_department';
const UPDATE_DEPARTMENT_NAME_RU = 'update_department_name_ru';
const UPDATE_DEPARTMENT_NAME_KZ = 'update_department_name_kz';

const DepartmentReducer = (state, action) => {
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