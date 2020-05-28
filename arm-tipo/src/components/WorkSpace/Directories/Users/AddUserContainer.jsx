import {
    addUser,
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

class AddUserContainer extends React.Component {
    componentDidMount() {
        if (this.props.roles.length === 0) {

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
        getRoles,
        getGenders,
        getCities,
        getCustomers
    }
)(AddUserContainer);
