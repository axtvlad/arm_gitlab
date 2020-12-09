import {postUser} from "../../../../redux/Reducers/UserReducer";
import {connect} from "react-redux";
import AddUser from "./AddUser";
import React from 'react';
import {getRoles} from "../../../../redux/Reducers/RoleReducer";
import {getGenders} from "../../../../redux/Reducers/GenderReducer";
import {getCities} from "../../../../redux/Reducers/CityReducer";
import {getCustomers} from "../../../../redux/Reducers/CustomerReducer";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {compose} from "redux";

class AddUserContainer extends React.Component {
    componentDidMount() {
        const {getRoles, getCustomers, getGenders, getCities} = this.props;

        getRoles();
        getCustomers();
        getGenders();
        getCities();
    }


    render() {
        const {postUser, genders, roles, cities, customers} = this.props;

        return (
            <AddUser postUser={postUser} genders={genders} roles={roles} cities={cities} customers={customers}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.rolesDir.roles,
        cities: state.citiesDir.cities,
        customers: state.customersDir.customers,
        genders: state.gendersDir.genders,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        postUser,
        getRoles,
        getGenders,
        getCities,
        getCustomers
    })
)(AddUserContainer);
