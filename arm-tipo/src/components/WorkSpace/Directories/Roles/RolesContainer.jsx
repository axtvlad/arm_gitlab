import {connect} from "react-redux";
import {setRoles, setRolesCount, setRolesIsFetching} from "../../../../redux/Reducers/RoleReducer";
import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import Directory from "../../../common/commonComponents/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";

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
            <Directory
                type={DirectoriesTypes.ROLES}
                isAdmin={this.props.isAdmin}
                directory={this.props.roles}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        roles: state.rolesDir.roles,
        isFetching: state.rolesDir.isFetching,
        isAdmin: state.usersDir.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        setRoles,
        setRolesCount,
        setRolesIsFetching,
        setIsAdmin
    }
)(RolesContainer);