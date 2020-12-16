import {APIResponseType, instance} from "./api";
import {MainDocType, NewMainDocType} from "../types/types";

export const mainDocsAPI = {
    getMainDocs() {
        return instance
            .get<APIResponseType<MainDocType>>('mainDocs')
            .then(response => response.data)
    },
    getMainDocById(id: number) {
        return instance
            .get<APIResponseType<MainDocType>>('mainDocs/' + id)
            .then(response => response.data)
    },
    deleteMainDocById(id: number) {
        return instance
            .delete<APIResponseType<MainDocType>>('mainDocs/' + id)
            .then(response => response.data)
    },
    postMainDoc(newMainDoc: NewMainDocType) {
        return instance
            .post<APIResponseType<MainDocType>>('mainDocs', newMainDoc)
            .then(response => response.data)
    },
    getSearchResultsByTags(tags: []) {
        return instance
            .post('mainDocs/searchByTags', {tags: tags})
            .then(response => response.data)
    },
    getSearchResultsByNum(num: string) {
        return instance
            .post('mainDocs/searchByNum', {num: num})
            .then(response => response.data)
    },
    updateMainDoc(id: number, data: NewMainDocType) {
        return instance
            .put<APIResponseType<MainDocType>>(`mainDocs/${id}`, data)
            .then(response => response.data)
    },
}
