import {
    addUser,
    setUsers,
    setUsersCount,
    setUsersIsFetching,
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
import React from 'react';
import {setRoles, setRolesIsFetching} from "../../../../redux/Reducers/RoleReducer";
import {restAPI} from "../../../../api/API";

class AddUserContainer extends React.Component {
    componentDidMount() {
        if (this.props.roles.length === 0) {

            restAPI.roles.getRoles()
                .then(response => {
                    this.props.setRoles(response.data);

                    console.log('roles: ', response.data);

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
