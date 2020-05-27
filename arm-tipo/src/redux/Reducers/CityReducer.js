import {restAPI} from "../../api/API";

const ADD_CITY = 'add_city';
const UPDATE_CITY_NAME_RU = 'update_city_name_ru';
const UPDATE_CITY_NAME_KZ = 'update_city_name_kz';
const SET_CITIES = 'set_cities';
const SET_CITIES_COUNT = 'set_cities_count';
const SET_CITIES_IS_FETCHING = 'set_cities_is_fetching';
const SET_CURRENT_CITY = 'set_current_city';

let initialState = {
    cities: [],
    newCityNameRu: '',
    newCityNameKz: '',
    citiesCount: 0,
    isFetching: false,
    currentCity: null,
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
        case SET_CITIES_COUNT:
            return {
                ...state,
                citiesCount: action.citiesCount
            };
        case SET_CITIES_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CURRENT_CITY:
            return {
                ...state,
                currentCity: action.currentCity
            };
        default:
            return state;
    }
};


export const addCity = () => ({
    type: ADD_CITY
});

export const updateCityNameRu = (newNameRu) => ({
    type: UPDATE_CITY_NAME_RU,
    newNameRu
});

export const updateCityNameKz = (newNameKz) => ({
    type: UPDATE_CITY_NAME_KZ,
    newNameKz
});

export const setCities = (cities) => ({
    type: SET_CITIES,
    cities
});

export const setCitiesCount = (citiesCount) => ({
    type: SET_CITIES_COUNT,
    citiesCount
});

export const setCitiesIsFetching = (isFetching) => ({
    type: SET_CITIES_IS_FETCHING,
    isFetching
});

export const setCurrentCity = (currentCity) => ({
    type: SET_CURRENT_CITY,
    currentCity
});

export const getCities = () => {
    return (dispatch) => {

        dispatch(setCitiesIsFetching(true));

        restAPI.cities.getCities()
            .then(response => {
                dispatch(setCitiesCount(response.totalCount));
                dispatch(setCities(response.data));

                console.info('cities: ', response.data);

                dispatch(setCitiesIsFetching(false));
            });
    }
};

export default CityReducer;