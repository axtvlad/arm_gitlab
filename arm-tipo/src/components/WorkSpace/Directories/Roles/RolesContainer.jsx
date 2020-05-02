import {connect} from "react-redux";
import {setRolesCountCreator, setRolesCreator, setRolesIsFetchingCreator} from "../../../../redux/Reducers/RoleReducer";
import React from "react";
import * as axios from "axios";
import Roles from "./Roles";
import {BASE_URL} from "../../../../env";

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

            this.props.setRolesIsFetching(true);

            axios
                .get(BASE_URL + '/roles', config)
                .then(response => {
                    this.props.setRoles(response.data.data);
                    this.props.setRolesCount(response.data.totalCount);

                    console.log('roles: ', response.data.data);

                    this.props.setRolesIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Roles
                roles={this.props.roles}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        roles: state.rolesDir.roles,
        isFetching: state.rolesDir.isFetching
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setRoles: (roles) => {
            dispatch(setRolesCreator(roles))
        },
        setRolesCount: (rolesCount) => {
            dispatch(setRolesCountCreator(rolesCount))
        },
        setRolesIsFetching: (isFetching) => {
            dispatch(setRolesIsFetchingCreator(isFetching))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RolesContainer);