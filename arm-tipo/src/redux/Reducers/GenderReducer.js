const SET_GENDERS_IS_FETCHING = 'set_genders_is_fetching';

let initialState = {
    genders: [
        {id: 1, name_ru: "Мужской", name_kz: "Ер"},
        {id: 2, name_ru: "Женский", name_kz: "Әйел"}],
    isFetching: false
};

const GenderReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_GENDERS_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        default:
            return state;
    }
}

export const setGendersIsFetching = (isFetching) => ({
    type: SET_GENDERS_IS_FETCHING,
    isFetching
});


export default GenderReducer;