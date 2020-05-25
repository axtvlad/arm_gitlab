import {connect} from "react-redux";
import {setRoles, setRolesCount, setRolesIsFetching} from "../../../../redux/Reducers/RoleReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {systemAPI} from "../../../../api/API";

class RolesContainer extends React.Component {
    componentDidMount() {
        if (this.props.roles.length === 0) {

            this.props.setRolesIsFetching(true);

            systemAPI.roles.getRoles()
                .then(response => {
                    this.props.setRoles(response.data);
                    this.props.setRolesCount(response.totalCount);

                    console.log('roles: ', response.data);

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