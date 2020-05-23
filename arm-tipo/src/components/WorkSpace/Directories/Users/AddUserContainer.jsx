import {
    addUser, setUsers, setUsersCount, setUsersIsFetching,
    updateUserBirthAt,
    updateUserCityId,
    updateUserCustomerId,
    updateUserEmail,
    updateUserFirstName,
    updateUserGenderId,
    updateUserIsAdmin,
    updateUserIsBanned,
    updateUserIsPremium,
    updateUserLastName,
    updateUserLocale,
    updateUserLogin,
    updateUserPassword,
    updateUserPatronymic,
    updateUserPhone,
    updateUserPhoto,
    updateUserRoleId
} from "../../../../redux/Reducers/UserReducer";
import {connect} from "react-redux";
import AddUser from "./AddUser";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import React from 'react';
import {setRoles, setRolesIsFetching} from "../../../../redux/Reducers/RoleReducer";

class AddUserContainer extends React.Component {
    componentDidMount() {
        if (this.props.usersDir.users.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setUsersIsFetching(true);

            axios
                .get(BASE_URL + '/users?loadData=true', config)
                .then(response => {
                    this.props.setUsersCount(response.data.totalCount);
                    this.props.setUsers(response.data.data);

                    console.log('users: ', response.data.data);

                    this.props.setUsersIsFetching(false);
                });
        }

        if (this.props.roles.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setRolesIsFetching(true);

            axios
                .get(BASE_URL + '/roles', config)
                .then(response => {
                    this.props.setRoles(response.data.data);

                    console.log('roles: ', response.data.data);

                    this.props.setRolesIsFetching(false);
                });
        }
    }

    render() {
        return (
            <AddUser {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        usersDir: state.usersDir,
        roles: state.rolesDir.roles,
        cities: state.citiesDir.cities,
        customers: state.customersDir.customers,
        genders: state.gendersDir.genders
    }
};

export default connect(mapStateToProps,
    {
        addUser,
        updateUserFirstName,
        updateUserLastName,
        updateUserPatronymic,
        updateUserLogin,
        updateUserPassword,
        updateUserEmail,
        updateUserPhoto,
        updateUserRoleId,
        updateUserCityId,
        updateUserCustomerId,
        updateUserGenderId,
        updateUserPhone,
        updateUserLocale,
        updateUserBirthAt,
        updateUserIsAdmin,
        updateUserIsBanned,
        updateUserIsPremium,
        setUsersIsFetching,
        setRolesIsFetching,
        setUsersCount,
        setUsers,
        setRoles,
    }
)(AddUserContainer);
