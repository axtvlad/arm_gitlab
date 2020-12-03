import {connect} from "react-redux";
import React from "react";
import Users from "./Users";
import {deleteUserById, getUsers} from "../../../../redux/Reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";

class UsersContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, users, getUsers} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            !users.length && getUsers();
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
        const {isAdmin, users, isFetching, deleteUserById} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            return (
                <Users
                    type={DirectoriesTypes.USERS}
                    users={users}
                    isFetching={isFetching}
                    deleteUserById={deleteUserById}
                />
            )
        }
    }
}

const mapStateToProps = (state) => {
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