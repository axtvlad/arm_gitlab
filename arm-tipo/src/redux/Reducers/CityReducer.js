const ADD_CITY = 'add_city';
const UPDATE_CITY_NAME_RU = 'update_city_name_ru';
const UPDATE_CITY_NAME_KZ = 'update_city_name_kz';

let initialState = {
    cities: [
        {id: 1, name_ru: 'Нур-Султан', name_kz: 'Нур-Султан'},
        {id: 2, name_ru: 'Алматы', name_kz: 'Алматы'}
    ],
    newCityNameRu: '',
    newCityNameKz: '',
};

const CityReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_CITY:
            return {
                ...state,
                newCityNameRu: '',
                newCityNameKz: '',
                cities: [...state.cities, {
                    id: 2,
                    name_ru: state.newCityNameRu,
                    name_kz: state.newCityNameKz,
                }]
            };
        case UPDATE_CITY_NAME_RU:
            return {
                ...state,
                newCityNameRu: action.newNameRu
            };
        case UPDATE_CITY_NAME_KZ:
            return {
                ...state,
                newCityNameKz: action.newNameKz
            };
        default:
            return state;
    }
};


export const addCityCreator = () => ({
    type: ADD_CITY
});

export const updateCityNameRuCreator = (newNameRu) => ({
    type: UPDATE_CITY_NAME_RU,
    newNameRu
});

export const updateCityNameKzCreator = (newNameKz) => ({
    type: UPDATE_CITY_NAME_KZ,
    newNameKz
});

export default CityReducer;