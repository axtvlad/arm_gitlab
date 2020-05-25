import {connect} from "react-redux";
import React from "react";
import {setUsers, setUsersCount, setUsersIsFetching} from "../../../../redux/Reducers/UserReducer";
import Users from "./Users";
import {systemAPI} from "../../../../api/API";

class UsersContainer extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0) {

            this.props.setUsersIsFetching(true);

            systemAPI.users.getUsers()
                .then(response => {
                    this.props.setUsersCount(response.totalCount);
                    this.props.setUsers(response.data);

                    console.log('users: ', response.data);

                    this.props.setUsersIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Users
                users={this.props.users}
                isFetching={this.props.isFetching}
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

export default connect(mapStateToProps, {
        setUsers,
        setUsersCount,
        setUsersIsFetching
    }
)(UsersContainer);