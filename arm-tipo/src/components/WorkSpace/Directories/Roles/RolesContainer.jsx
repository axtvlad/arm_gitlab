import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {deleteRoleById, getRoles} from "../../../../redux/Reducers/RoleReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class RolesContainer extends React.Component {
    componentDidMount() {
        const {getRoles} = this.props;

        getRoles();
    }

    render() {
        const {isAdmin, roles, deleteRoleById, isFetching} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.ROLES}
                isAdmin={isAdmin}
                directory={roles}
                isFetching={isFetching}
                removeItemById={deleteRoleById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.rolesDir.roles,
        isFetching: state.rolesDir.isFetching,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps,
        {
            getRoles,
            deleteRoleById
        })
)(RolesContainer);