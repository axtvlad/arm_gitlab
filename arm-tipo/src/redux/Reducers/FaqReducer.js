const ADD_FAQ = 'add_faq';
const UPDATE_FAQ_QUESTION_RU = 'update_faq_question_ru';
const UPDATE_FAQ_QUESTION_KZ = 'update_faq_question_kz';
const UPDATE_FAQ_ANSWER_RU = 'update_faq_answer_ru';
const UPDATE_FAQ_ANSWER_KZ = 'update_faq_answer_kz';
const SET_FAQS = 'set_faqs';
const SET_FAQS_COUNT = 'set_faqs_count';
const SET_FAQS_IS_FETCHING = 'set_faqs_is_fetching';

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
                    id: 4,
                    question_ru: state.newFaqQuestionRu,
                    question_kz: state.newFaqQuestionKz,
                    answer_ru: state.newFaqAnswerRu,
                    answer_kz: state.newFaqAnswerKz
                }]
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
        default:
            return state;
    }
};

export const addFaqCreator = () => ({
    type: ADD_FAQ
});

export const updateFaqQuestionRuCreator = (newFaqQuestionRu) => ({
    type: UPDATE_FAQ_QUESTION_RU,
    newFaqQuestionRu
});

export const updateFaqQuestionKzCreator = (newFaqQuestionKz) => ({
    type: UPDATE_FAQ_QUESTION_KZ,
    newFaqQuestionKz
});

export const updateFaqAnswerRuCreator = (newFaqAnswerRu) => ({
    type: UPDATE_FAQ_ANSWER_RU,
    newFaqAnswerRu
});

export const updateFaqAnswerKzCreator = (newFaqAnswerKz) => ({
    type: UPDATE_FAQ_ANSWER_KZ,
    newFaqAnswerKz
});

export const setFaqsCreator = (faqs) => ({
    type: SET_FAQS,
    faqs
});

export const setFaqsCountCreator = (faqsCount) => ({
    type: SET_FAQS_COUNT,
    faqsCount
});

export const setFaqsIsFetchingCreator = (isFetching) => ({
    type: SET_FAQS_IS_FETCHING,
    isFetching
});


export default FaqReducer;