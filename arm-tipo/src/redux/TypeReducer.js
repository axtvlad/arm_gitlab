const ADD_TYPE = 'add_type';
const UPDATE_TYPE_NAME_RU = 'update_type_name_ru';
const UPDATE_TYPE_NAME_KZ = 'update_type_name_kz';

const TypeReducer = (state, action) => {
    switch (action.type) {
        case ADD_TYPE: {
            let newType = {
                id: 3,
                name_ru: state.newTypeNameRu,
                name_kz: state.newTypeNameKz,
            };
            state.types.push(newType);
            state.newTypeNameRu = '';
            state.newTypeNameKz = '';
            return state;
        }
        case UPDATE_TYPE_NAME_RU: {
            state.newTypeNameRu = action.newName;
            return state;
        }
        case UPDATE_TYPE_NAME_KZ: {
            state.newTypeNameKz = action.newName;
            return state;
        }
        default: {
            return state;
        }
    }
};

export const addTypeCreator = () => ({
    type: ADD_TYPE
});

export const updateTypeNameRuCreator = (newName) => ({
    type: UPDATE_TYPE_NAME_RU,
    newName
});

export const updateTypeNameKzCreator = (newName) => ({
    type: UPDATE_TYPE_NAME_KZ,
    newName
});

export default TypeReducer;