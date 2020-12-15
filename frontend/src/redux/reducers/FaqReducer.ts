import {faqsAPI} from "../../api/faqsAPI";
import {NewFaqType} from "../../../types/types";
import {BaseThunkType, InferActionsTypes} from "../redux-store";

const initial = {
    faqs: null as null | any,
    faqsCount: null as null | any,
    isFetching: false,
    currentFaq: null as null | any
};


type InitialType = typeof initial
type ThunkType = BaseThunkType<ActionTypes> // | FormAction> from redux-forms. Если ограничиваем только нашими actions
type ActionTypes = InferActionsTypes<typeof faqActions>


export const FaqReducer = (state = initial, action: ActionTypes): InitialType => {
    switch (action.type) {
        case 'ARM/FAQ/SET_FAQS':
            return {
                ...state,
                // @ts-ignore
                faqs: action.faqs
            };
        case 'ARM/FAQ/SET_FAQS_COUNT':
            return {
                ...state,
                // @ts-ignore
                faqsCount: action.faqsCount
            };
        case 'ARM/FAQ/SET_FAQS_IS_FETCHING':
            return {
                ...state,
                // @ts-ignore
                isFetching: action.isFetching
            };
        case 'ARM/FAQ/SET_CURRENT_FAQ':
            return {
                ...state,
                // @ts-ignore
                currentFaq: action.currentFaq
            };
        default:
            return state;
    }
};

export const faqActions = {
    setFaqs: (faqs: any) => ({
        type: 'ARM/FAQ/SET_FAQS',
        faqs
    }),
    setFaqsCount: (faqsCount: number) => ({
        type: 'ARM/FAQ/SET_FAQS_COUNT',
        faqsCount
    }),
    setFaqsIsFetching: (isFetching: boolean) => ({
        type: 'ARM/FAQ/SET_FAQS_IS_FETCHING',
        isFetching
    }),
    setCurrentFaq: (currentFaq: any) => ({
        type: 'ARM/FAQ/SET_CURRENT_FAQ',
        currentFaq
    }),
}

export const getFaqs = (): ThunkType => async (dispatch) => {
    dispatch(faqActions.setFaqsIsFetching(true));

    const res = await faqsAPI.getFaqs()

    dispatch(faqActions.setFaqsCount(res.totalCount));
    dispatch(faqActions.setFaqs(res.data));
    dispatch(faqActions.setFaqsIsFetching(false));
};

export const getFaqById = (id: number): ThunkType => async (dispatch) => {
    const res = await faqsAPI.getFaqById(id)

    dispatch(faqActions.setCurrentFaq(res.data));
};

export const postFaq = (formData: NewFaqType): ThunkType => async (dispatch) => {
    await faqsAPI.postFaq(formData)

    dispatch(getFaqs())
};

export const deleteFaqById = (id: number): ThunkType => async (dispatch) => {
    await faqsAPI.deleteFaqById(id)

    dispatch(getFaqs())
};

export const updateFaq = (id: number, data: NewFaqType): ThunkType => async (dispatch) => {
    await faqsAPI.updateFaq(id, data)

    dispatch(getFaqById(id))
};