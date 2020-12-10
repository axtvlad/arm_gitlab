import {restAPI} from "../../api/API";

const SET_FAQS = 'set_faqs';
const SET_FAQS_COUNT = 'set_faqs_count';
const SET_FAQS_IS_FETCHING = 'set_faqs_is_fetching';
const SET_CURRENT_FAQ = 'set_current_faq';

const initialState = {
    faqs: [],
    faqsCount: 0,
    isFetching: false,
    currentFaq: {},
};

export const FaqReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FAQS:
            return {
                ...state,
                faqs: [...state.faqs, ...action.faqs]
            };
        case SET_FAQS_COUNT:
            return {
                ...state,
                faqsCount: action.faqsCount
            };
        case SET_FAQS_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CURRENT_FAQ:
            return {
                ...state,
                currentFaq: action.currentFaq
            };
        default:
            return state;
    }
};

const setFaqs = (faqs) => ({
    type: SET_FAQS,
    faqs
});

const setFaqsCount = (faqsCount) => ({
    type: SET_FAQS_COUNT,
    faqsCount
});

const setFaqsIsFetching = (isFetching) => ({
    type: SET_FAQS_IS_FETCHING,
    isFetching
});

const setCurrentFaq = (currentFaq) => ({
    type: SET_CURRENT_FAQ,
    currentFaq
});

export const getFaqs = () => async (dispatch) => {
    dispatch(setFaqsIsFetching(true));

    const res = await restAPI.faqs.getFaqs()

    dispatch(setFaqsCount(res.totalCount));
    dispatch(setFaqs(res.data));
    dispatch(setFaqsIsFetching(false));
};

export const getFaqById = (id) => async (dispatch) => {
    const res = await restAPI.faqs.getFaqById(id)

    dispatch(setCurrentFaq(res.data));
};

export const postFaq = (formData) => async (dispatch) => {
    await restAPI.faqs.postFaq(formData)

    dispatch(getFaqs())
};

export const deleteFaqById = (id) => async (dispatch) => {
    await restAPI.faqs.deleteFaqById(id)

    dispatch(getFaqs())
};

export const updateFaq = (id, data) => async (dispatch) => {
    await restAPI.faqs.updateFaq(id, data)

    dispatch(getFaqById(id))
};