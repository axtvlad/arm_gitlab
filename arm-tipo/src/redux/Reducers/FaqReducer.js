import {restAPI} from "../../api/API";

const ADD_FAQ = 'add_faq';
const UPDATE_FAQ_QUESTION_RU = 'update_faq_question_ru';
const UPDATE_FAQ_QUESTION_KZ = 'update_faq_question_kz';
const UPDATE_FAQ_ANSWER_RU = 'update_faq_answer_ru';
const UPDATE_FAQ_ANSWER_KZ = 'update_faq_answer_kz';
const SET_FAQS = 'set_faqs';
const SET_FAQS_COUNT = 'set_faqs_count';
const SET_FAQS_IS_FETCHING = 'set_faqs_is_fetching';
const SET_CURRENT_FAQ = 'set_current_faq';
const SET_IS_POSTED = 'set_is_posted';
const REMOVE_FAQ = 'remove_faq';

let initialState = {
    faqs: [
        {id: 1, question_ru: 'FAQ 1', question_kz: 'FAQ 1', answer_ru: 'Answer 1', answer_kz: 'Zhauap 1'},
        {id: 2, question_ru: 'FAQ 2', question_kz: 'FAQ 2', answer_ru: 'Answer 2', answer_kz: 'Zhauap 2'},
        {id: 3, question_ru: 'FAQ 3', question_kz: 'FAQ 3', answer_ru: 'Answer 3', answer_kz: 'Zhauap 3'},
    ],
    newFaqQuestionRu: '',
    newFaqQuestionKz: '',
    newFaqAnswerRu: '',
    newFaqAnswerKz: '',
    faqsCount: 0,
    isFetching: false,
    currentFaq: null,
    isPosted: false,
};

const FaqReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_FAQ:
            return {
                ...state,
                newFaqQuestionRu: '',
                newFaqQuestionKz: '',
                newFaqAnswerRu: '',
                newFaqAnswerKz: '',
                faqs: [...state.faqs, {
                    id: action.id,
                    question_ru: state.newFaqQuestionRu,
                    question_kz: state.newFaqQuestionKz,
                    answer_ru: state.newFaqAnswerRu,
                    answer_kz: state.newFaqAnswerKz
                }]
            };
        case REMOVE_FAQ:
            return {
                ...state,
                faqs: state.faqs.filter(faq => faq.id !== action.id)
            };
        case UPDATE_FAQ_QUESTION_RU:
            return {
                ...state,
                newFaqQuestionRu: action.newFaqQuestionRu
            };
        case UPDATE_FAQ_QUESTION_KZ:
            return {
                ...state,
                newFaqQuestionKz: action.newFaqQuestionKz
            };
        case UPDATE_FAQ_ANSWER_RU:
            return {
                ...state,
                newFaqAnswerRu: action.newFaqAnswerRu
            };
        case UPDATE_FAQ_ANSWER_KZ:
            return {
                ...state,
                newFaqAnswerKz: action.newFaqAnswerKz
            };
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
        case SET_IS_POSTED:
            return {
                ...state,
                isPosted: action.isPosted
            };
        default:
            return state;
    }
};

export const addFaq = (id) => ({
    type: ADD_FAQ,
    id
});

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
});

export const removeFaq = (id) => ({
    type: REMOVE_FAQ,
    id
});

export const updateFaqQuestionRu = (newFaqQuestionRu) => ({
    type: UPDATE_FAQ_QUESTION_RU,
    newFaqQuestionRu
});

export const updateFaqQuestionKz = (newFaqQuestionKz) => ({
    type: UPDATE_FAQ_QUESTION_KZ,
    newFaqQuestionKz
});

export const updateFaqAnswerRu = (newFaqAnswerRu) => ({
    type: UPDATE_FAQ_ANSWER_RU,
    newFaqAnswerRu
});

export const updateFaqAnswerKz = (newFaqAnswerKz) => ({
    type: UPDATE_FAQ_ANSWER_KZ,
    newFaqAnswerKz
});

export const setFaqs = (faqs) => ({
    type: SET_FAQS,
    faqs
});

export const setFaqsCount = (faqsCount) => ({
    type: SET_FAQS_COUNT,
    faqsCount
});

export const setFaqsIsFetching = (isFetching) => ({
    type: SET_FAQS_IS_FETCHING,
    isFetching
});

export const setCurrentFaq = (currentFaq) => ({
    type: SET_CURRENT_FAQ,
    currentFaq
});

export const getFaqs = () => (dispatch) => {

    dispatch(setFaqsIsFetching(true));

    restAPI.faqs.getFaqs()
        .then(response => {
            dispatch(setFaqsCount(response.totalCount));
            dispatch(setFaqs(response.data));

            console.info('faqs: ', response.data);

            dispatch(setFaqsIsFetching(false));
        });
};

export const getFaqById = (id) => (dispatch) => {

    dispatch(setFaqsIsFetching(true));

    restAPI.faqs.getFaqById(id)
        .then(response => {
            dispatch(setCurrentFaq(response.data));

            console.info('faq: ', response.data);

            dispatch(setFaqsIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const postFaq = (newFaq) => (dispatch) => {

    dispatch(setFaqsIsFetching(true));

    restAPI.faqs.postFaq(newFaq)
        .then(response => {
            console.info('posted faq: ', response.data);

            dispatch(addFaq(response.data.id));

            dispatch(setFaqsIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const deleteFaqById = (id) => (dispatch) => {

    dispatch(setFaqsIsFetching(true));

    restAPI.faqs.deleteFaqById(id)
        .then(response => {
            console.info('deleted faq: ', response.data);

            dispatch(removeFaq(id));

            dispatch(setFaqsIsFetching(false));
        });

};

export default FaqReducer;