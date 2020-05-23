import {connect} from "react-redux";
import React from "react";
import {setUsers, setUsersCount, setUsersIsFetching} from "../../../../redux/Reducers/UserReducer";
import Users from "./Users";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";

class UsersContainer extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setUsersIsFetching(true);

            axios
                .get(BASE_URL + '/users?loadData=true', config)
                .then(response => {
                    this.props.setUsersCount(response.data.totalCount);
                    this.props.setUsers(response.data.data);

                    console.log('users: ', response.data.data);

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