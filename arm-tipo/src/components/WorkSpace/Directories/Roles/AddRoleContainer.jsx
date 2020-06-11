import {connect} from "react-redux";
import {postRole, updateRoleNameKz, updateRoleNameRu} from "../../../../redux/Reducers/RoleReducer";
import AddRole from "./AddRole";
import React from "react";
import {Redirect} from "react-router-dom";
import {notification, Spin} from "antd";

class AddRoleContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
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
            if (this.props.rolesDir.isPosted) {
                return <Redirect to={'/roles'}/>
            } else {
                return (
                    <AddRole {...this.props} />
                )
            }
        }
    }
}

let MapStateToProps = (state) => {
    return {
        rolesDir: state.rolesDir,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(MapStateToProps,
    {
        postRole,
        updateRoleNameRu,
        updateRoleNameKz,
    }
)(AddRoleContainer);