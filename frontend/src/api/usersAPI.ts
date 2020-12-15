import {instance} from "./api"
import {NewUserType} from "../../types/types";

export const usersAPI = {
    getUsers() {
        return instance
            .get('users?loadData=true')
            .then(response => response.data);
    },
    getUserById(userId: number) {
        return instance
            .get(`users/${userId}?loadData=true`)
            .then(response => response.data);
    },
    deleteUserById(id: number) {
        return instance
            .delete(`users/${id}`)
            .then(response => response.data);
    },
    postUser(newUser: NewUserType) {
        return instance
            .post('users', newUser)
            .then(response => response.data)
    },
    updateUser(id: number, data: NewUserType) {
        return instance
            .put(`users/${id}`, data)
            .then(response => response.data)
    },
}