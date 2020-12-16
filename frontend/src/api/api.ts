import axios from "axios";
import {BASE_URL1} from "../env";

export const instance = axios.create({
    headers: {
        withCredentials: true
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