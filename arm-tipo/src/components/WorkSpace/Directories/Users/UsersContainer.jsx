import {connect} from "react-redux";
import React from "react";
import {setUsers, setUsersCount, setUsersIsFetching} from "../../../../redux/Reducers/UserReducer";
import Users from "./Users";
import * as axios from "axios";

class UsersContainer extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic" + authorizationBasic
                }
            };

            this.props.setUsersIsFetching(true);

            axios
                .get('http://localhost:8080/rest/api/users', config)
                .then(response => {
                    this.props.setUsers(response.data.data);
                    this.props.setUsersCount(response.data.totalCount);

                    console.log('users: ', response.data.data);

                    this.props.setUsersIsFetching(false);
                })
                .catch(err => {
                    console.error(err);
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