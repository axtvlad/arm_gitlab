const ADD_CITY = 'add_city';
const UPDATE_CITY_NAME_RU = 'update_city_name_ru';
const UPDATE_CITY_NAME_KZ = 'update_city_name_kz';
const SET_CITIES = 'set_cities';

let initialState = {
    cities: [],
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
                    id: 3,
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
        case SET_CITIES:
            return {
                ...state,
                cities: [...state.cities, ...action.cities]
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

export const setCitiesCreator = (cities) => ({
    type: SET_CITIES,
    cities
});

export default CityReducer;