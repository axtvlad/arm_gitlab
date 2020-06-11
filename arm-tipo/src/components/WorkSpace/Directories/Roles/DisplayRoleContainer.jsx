import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getRoleById} from "../../../../redux/Reducers/RoleReducer";
import {notification, Spin} from "antd";

class DisplayRoleContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            let id = this.props.match.params.id;

            if (!id) {
                id = 1
            }

            this.props.getRoleById(id);
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
                <DisplayDirectoryItem {...this.props}/>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.ROLES),
        currentItem: state.rolesDir.currentRole,
        isFetching: state.rolesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

let RoleContainerUrl = withRouter(DisplayRoleContainer);

export default connect(mapStateToProps,
    {
        getRoleById
    }
)(RoleContainerUrl);