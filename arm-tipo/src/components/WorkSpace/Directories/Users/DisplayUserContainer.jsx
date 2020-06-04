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
import {Spin} from "antd";

class DisplayUserContainer extends React.Component {
    componentDidMount() {
        !this.props.roles.length && this.props.getRoles();
        !this.props.cities.length && this.props.getCities();
        !this.props.genders.length && this.props.getGenders();
        !this.props.customers.length && this.props.getCustomers();

        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = 1
        }

        this.props.getUserById(userId);
    }

    render() {
        if (!this.props.currentUser
            || !this.props.roles.length
            || !this.props.cities.length
            || !this.props.customers.length
            || !this.props.genders.length
        ) {
            return (<Spin/>)
        } else {
            return (
                <DisplayUser {...this.props}/>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        directory: GetDirectory(DirectoriesTypes.USERS),
        currentUser: state.usersDir.currentUser,
        roles: state.rolesDir.roles,
        cities: state.citiesDir.cities,
        genders: state.gendersDir.genders,
        customers: state.customersDir.customers
    }
};

let UserContainerUrl = withRouter(DisplayUserContainer);

export default connect(mapStateToProps,
    {
        getUserById,
        getRoles,
        getCities,
        getGenders,
        getCustomers
    }
)(UserContainerUrl);