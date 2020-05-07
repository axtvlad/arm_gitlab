const SET_GENDERS_IS_FETCHING = 'set_genders_is_fetching';
const SET_GENDERS = 'set_genders';

let initialState = {
    genders: [],
    isFetching: false
};

const GenderReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_GENDERS_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_GENDERS:
            return {
                ...state,
                genders: [...state.genders, ...action.genders]
            };
        default:
            return state;
    }
}

export const setGendersIsFetching = (isFetching) => ({
    type: SET_GENDERS_IS_FETCHING,
    isFetching
});

export const setGenders = (genders) => ({
    type: SET_GENDERS,
    genders
});


export default GenderReducer;