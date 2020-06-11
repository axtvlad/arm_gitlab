import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";
import {deleteRoleById, getRoles} from "../../../../redux/Reducers/RoleReducer";
import {connect} from "react-redux";

class RolesContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.roles.length && this.props.getRoles();
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
        if (!this.props.isAdmin) {
            return <Spin/>
        } else {
            return (
                <Directory
                    type={DirectoriesTypes.ROLES}
                    isAdmin={this.props.isAdmin}
                    directory={this.props.roles}
                    isFetching={this.props.isFetching}
                    removeItemById={this.props.deleteRoleById}
                />
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        roles: state.rolesDir.roles,
        isFetching: state.rolesDir.isFetching,
        isAdmin: state.authDir.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getRoles,
        deleteRoleById
    }
)(RolesContainer);