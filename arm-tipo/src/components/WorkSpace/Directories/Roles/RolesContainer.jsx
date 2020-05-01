import {connect} from "react-redux";
import {setRolesCountCreator, setRolesCreator} from "../../../../redux/Reducers/RoleReducer";
import React from "react";
import * as axios from "axios";
import Roles from "./Roles";

class RolesContainer extends React.Component {
    componentDidMount() {
        if (this.props.roles.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            axios
                .get('http://185.22.66.183:8080/rest/api/roles', config)
                .then(response => {
                    this.props.setRoles(response.data.data);
                    this.props.setRolesCount(response.data.totalCount);
                    console.log('roles: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <Roles roles={this.props.roles}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        roles: state.rolesDir.roles
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setRoles: (roles) => {
            dispatch(setRolesCreator(roles))
        },
        setRolesCount: (rolesCount) => {
            dispatch(setRolesCountCreator(rolesCount))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RolesContainer);