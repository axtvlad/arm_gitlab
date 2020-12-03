import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getRoleById} from "../../../../redux/Reducers/RoleReducer";
import {notification, Spin} from "antd";
import {compose} from "redux";

class DisplayRoleContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, match, getRoleById} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            let id = match.params.id;

            if (!id) {
                id = 1
            }

            getRoleById(id);
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
        const {isAdmin} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            return (
                <DisplayDirectoryItem {...this.props}/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.ROLES),
        currentItem: state.rolesDir.currentRole,
        isFetching: state.rolesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default compose(
    connect(mapStateToProps, {
        getRoleById
    }),
    withRouter
)(DisplayRoleContainer);