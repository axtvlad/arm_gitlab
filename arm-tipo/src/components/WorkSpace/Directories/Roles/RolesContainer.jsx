import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {getRoles} from "../../../../redux/Reducers/RoleReducer";

class RolesContainer extends React.Component {
    componentDidMount() {
        !this.props.roles.length && this.props.getRoles();
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
        getRoles
    }
)(RolesContainer);