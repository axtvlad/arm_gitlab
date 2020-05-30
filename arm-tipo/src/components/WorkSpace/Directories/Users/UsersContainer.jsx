import {connect} from "react-redux";
import React from "react";
import Users from "./Users";
import {deleteUserById, getUsers} from "../../../../redux/Reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";

class UsersContainer extends React.Component {
    componentDidMount() {
        !this.props.users.length && this.props.getUsers();
    }

    render() {
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

let mapStateToProps = (state) => {
    return {
        users: state.usersDir.users,
        isFetching: state.usersDir.isFetching
    }
};

export default connect(mapStateToProps,
    {
        getUsers,
        deleteUserById
    }
)(UsersContainer);