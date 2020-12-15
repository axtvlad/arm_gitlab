import {instance} from "./api";
import {NewTemplateType} from "../../types/types";

export const templatesAPI = {
    getTemplates() {
        return instance
            .get('templates')
            .then(response => response.data)
    },
    getTemplateById(id: number) {
        return instance
            .get('templates/' + id)
            .then(response => response.data)
    },
    deleteTemplateById(id: number) {
        return instance
            .delete('templates/' + id)
            .then(response => response.data)
    },
    postTemplate(newTemplate: NewTemplateType) {
        return instance
            .post('templates', newTemplate)
            .then(response => response.data)
    },
    updateTemplate(id: number, data: NewTemplateType) {
        return instance
            .put(`templates/${id}`, data)
            .then(response => response.data)
    },
}