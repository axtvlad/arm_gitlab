import axios from "axios";
import {BASE_URL1, PASSWORD, USER} from "../env";

const authorizationBasic = window.btoa(USER + ':' + PASSWORD);

export const instance = axios.create({
    headers: {
        "Authorization": "Basic " + authorizationBasic
    },
    baseURL: BASE_URL1,
})

export type APIResponseType<D = {}> = {
    data: D,
    message: string
    resultCode: number | string
}

export type APIResponseListType<D = {}> = {
    data: D,
    message: string
    resultCode: number | string
    totalCount: number
}