import {restAPI} from "../../api/API";

const SET_CITIES = 'set_cities';
const SET_CITIES_COUNT = 'set_cities_count';
const SET_CITIES_IS_FETCHING = 'set_cities_is_fetching';
const SET_CURRENT_CITY = 'set_current_city';
const SET_IS_POSTED = 'set_is_posted';

const initialState = {
    cities: [],
    citiesCount: 0,
    isFetching: false,
    currentCity: null,
    isPosted: false,
};

export const CityReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CITIES:
            return {
                ...state,
                cities: action.cities
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
        case SET_IS_POSTED:
            return {
                ...state,
                isPosted: action.isPosted
            };
        default:
            return state;
    }
};

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
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

export const getCities = () => async (dispatch) => {
    dispatch(setCitiesIsFetching(true));

    const response = await restAPI.cities.getCities()

    dispatch(setCitiesCount(response.totalCount));
    dispatch(setCities(response.data));
    dispatch(setCitiesIsFetching(false));
};

export const getCityById = (id) => async (dispatch) => {
    const response = await restAPI.cities.getCityById(id)

    dispatch(setCurrentCity(response.data));
};

export const postCity = (formData) => async (dispatch) => {
    await restAPI.cities.postCity(formData)

    dispatch(getCities())
};

export const deleteCityById = (id) => async (dispatch) => {
    await restAPI.cities.deleteCityById(id)

    dispatch(getCities())
};