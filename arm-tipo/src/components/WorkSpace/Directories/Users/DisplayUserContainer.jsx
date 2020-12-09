import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import DisplayUser from "./DisplayUser";
import {getUserById} from "../../../../redux/Reducers/UserReducer";
import {getRoles} from "../../../../redux/Reducers/RoleReducer";
import {getCities} from "../../../../redux/Reducers/CityReducer";
import {getGenders} from "../../../../redux/Reducers/GenderReducer";
import {getCustomers} from "../../../../redux/Reducers/CustomerReducer";
import {compose} from "redux";

class DisplayUserContainer extends React.Component {
    componentDidMount() {
        const {match, getRoles, getCustomers, getGenders, getCities, getUserById} = this.props;

        getRoles();
        getCities();
        getGenders();
        getCustomers();

        let userId = match.params.userId;

        if (!userId) {
            userId = 1
        }

        getUserById(userId);
    }

    render() {
        return (
            <DisplayUser {...this.props}/>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        directory: GetDirectory(DirectoriesTypes.USERS),
        currentUser: state.usersDir.currentUser,
        roles: state.rolesDir.roles,
        cities: state.citiesDir.cities,
        genders: state.gendersDir.genders,
        customers: state.customersDir.customers
    }
};

export default compose(
    connect(mapStateToProps, {
        getUserById,
        getRoles,
        getCities,
        getGenders,
        getCustomers
    }),
    withRouter
)(DisplayUserContainer);