import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";
import {deleteRoleById, getRoles} from "../../../../redux/Reducers/RoleReducer";
import {connect} from "react-redux";

class RolesContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, roles, getRoles} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            !roles.length && getRoles();
        }
    }

    error() {
        notification['error']({
            message: 'У вас нет прав!',
            description: 'У вас нет прав, чтобы просматривать данный модуль!',
            placement: 'bottomRight'
        })
    }

    render() {
        const {isAdmin, roles, deleteRoleById, isFetching} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
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
}

const mapStateToProps = (state) => {
    return {
        roles: state.rolesDir.roles,
        isFetching: state.rolesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getRoles,
        deleteRoleById
    }
)(RolesContainer);