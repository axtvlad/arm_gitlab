import {connect} from "react-redux";
import React from "react";
import Users from "./Users";
import {deleteUserById, getUsers} from "../../../../redux/Reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";

class UsersContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.users.length && this.props.getUsers();
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
                <Users
                    type={DirectoriesTypes.USERS}
                    users={this.props.users}
                    isFetching={this.props.isFetching}
                    deleteUserById={this.props.deleteUserById}
                />
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersDir.users,
        isFetching: state.usersDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getUsers,
        deleteUserById
    }
)(UsersContainer);