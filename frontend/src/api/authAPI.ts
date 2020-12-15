import {message} from "antd";
import {instance} from "./api";
import {AuthDataType, UserType} from "../../types/types";

type AuthResponseType = {
    data: UserType
    message: string
    errorCode: number
    auth: boolean
}

export const authAPI = {
    auth(authData: AuthDataType) {
        return instance
            .post<AuthResponseType>('auth', authData)
            .then(response => {
                if (!response.data) {
                    return message.error("Неверный логин или пароль!");
                }

                message.success("Добро пожаловать!");

                return response.data
            })
    },
}
