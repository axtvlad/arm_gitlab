import {message} from "antd";
import {instance} from "./api";
import {AuthDataType} from "../types/types";

type AuthResponseType = {
    data: any
    message: string
    errorCode: number
}

export const authAPI = {
    login(authData: AuthDataType) {
        return instance
            .post<AuthResponseType>('auth/login', authData)
            .then(res => {
                console.log(res)
                return res.data
            })
            .catch(e => {
                return message.error("Неверный логин или пароль!");
            })
    },
    logout() {
        return instance
            .delete('auth/logout')
            .then(res => {
                message.success("До скорой встречи!");
            })
    },
    token() {
        return instance
            .get('auth/token')
            .then(response => {
                message.info("Токен обновлен!");
            })
    },
    me() {
        return instance
            .get('auth/me')
            .then(res => res.data)
    },
}
