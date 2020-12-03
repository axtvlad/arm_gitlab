import {
    postUser,
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
import {getRoles} from "../../../../redux/Reducers/RoleReducer";
import {getGenders} from "../../../../redux/Reducers/GenderReducer";
import {getCities} from "../../../../redux/Reducers/CityReducer";
import {getCustomers} from "../../../../redux/Reducers/CustomerReducer";
import {Redirect} from "react-router-dom";
import {notification, Spin} from "antd";

class AddUserContainer extends React.Component {
    componentDidMount() {
        const {roles, isAdmin, customers, genders, cities, getRoles, getCustomers, getGenders, getCities} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            !roles.length && getRoles();
            !customers.length && getCustomers();
            !genders.length && getGenders();
            !cities.length && getCities();
        }
    }

    error() {
        notification['error']({
            message: 'У вас нет прав!',
            description: 'У вас нет прав, чтобы просматривать данный модуль!',
            placement: 'bottomRight'
        })
    }

    render() {
        const {usersDir, isAdmin} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            if (usersDir.isPosted) {
                return <Redirect to={'/users'}/>
            } else {
                return (
                    <AddUser {...this.props}/>
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        usersDir: state.usersDir,
        roles: state.rolesDir.roles,
        cities: state.citiesDir.cities,
        customers: state.customersDir.customers,
        genders: state.gendersDir.genders,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        postUser,
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
        getRoles,
        getGenders,
        getCities,
        getCustomers
    }
)(AddUserContainer);
