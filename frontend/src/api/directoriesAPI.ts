import {APIResponseListType, APIResponseType, instance} from "./api";
import qs from "qs";

export enum DirectoryNameEnum {
    categories = 'categories',
    cities = 'cities',
    customers = 'customers',
    departments = 'departments',
    genders = 'genders',
    roles = 'roles',
    statuses = 'statuses',
    types = 'types'
}

interface NewDirectoryInterface {
    name_ru: string
    name_kz: string
}

interface DirectoryInterface extends NewDirectoryInterface {
    id: number
}

export const directoriesAPI = {
    getDirectoryRecordsList(directoryName: DirectoryNameEnum, count: number, page: number) {
        const queryParams: string = qs.stringify({
            count,
            page
        })

        return instance
            .get<APIResponseListType<Array<DirectoryInterface>>>(`directory/${directoryName}/get/list?${queryParams}`)
            .then(response => response.data)
    },
    getDirectoryRecordById(directoryName: DirectoryNameEnum, id: number) {
        const queryParams: string = qs.stringify({
            id
        })

        return instance
            .get<APIResponseType<DirectoryInterface>>(`directory/${directoryName}/get/byId?${queryParams}`)
            .then(response => response.data)
    },
    deleteDirectoryRecordById(directoryName: DirectoryNameEnum, id: number) {
        const queryParams: string = qs.stringify({
            id
        })

        return instance
            .delete<APIResponseType<DirectoryInterface>>(`directory/${directoryName}/delete/byId?${queryParams}`)
            .then(response => response.data)
    },
    postDirectoryRecord(directoryName: DirectoryNameEnum, formData: NewDirectoryInterface) {
        return instance
            .post<APIResponseType<DirectoryInterface>>(`directory/${directoryName}/post`, formData)
            .then(response => response.data)
    },
    updateDirectoryRecordById(directoryName: DirectoryNameEnum, id: number, formData: NewDirectoryInterface) {
        const queryParams: string = qs.stringify({
            id
        })

        return instance
            .put<APIResponseType<DirectoryInterface>>(`directory${directoryName}/put/byId?${queryParams}`, formData)
            .then(response => response.data)
    },
}
