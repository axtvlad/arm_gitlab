import {instance} from "./api";
import {NewFaqType} from "../types/types";

export const faqsAPI = {
    getFaqs() {
        return instance
            .get('faqs')
            .then(response => response.data)
    },
    getFaqById(id: number) {
        return instance
            .get(`faqs/${id}`)
            .then(response => response.data)
    },
    deleteFaqById(id: number) {
        return instance
            .delete(`faqs/${id}`)
            .then(response => response.data)
    },
    postFaq(newFaq: NewFaqType) {
        return instance
            .post('faqs', newFaq)
            .then(response => response.data)
    },
    updateFaq(id: number, data: NewFaqType) {
        return instance
            .put(`faqs/${id}`, data)
            .then(response => response.data)
    },
}
