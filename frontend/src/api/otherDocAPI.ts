import {instance} from "./api";
import {NewOtherDocType} from "../../types/types";

export const otherDocsAPI = {
    getOtherDocs() {
        return instance
            .get('otherDocs')
            .then(response => response.data)
    },
    getOtherDocById(id: number) {
        return instance
            .get('otherDocs/' + id)
            .then(response => response.data)
    },
    deleteOtherDocById(id: number) {
        return instance
            .delete('otherDocs/' + id)
            .then(response => response.data)
    },
    postOtherDoc(newOtherDoc: NewOtherDocType) {
        return instance
            .post('otherDocs', newOtherDoc)
            .then(response => response.data)
    },
    updateOtherDoc(id: number, data: NewOtherDocType) {
        return instance
            .put(`otherDocs/${id}`, data)
            .then(response => response.data)
    },
}