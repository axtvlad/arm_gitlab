import {connect} from "react-redux";
import React from "react";
import Users from "./Users";
import {getUsers} from "../../../../redux/Reducers/UserReducer";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers();
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

export default connect(mapStateToProps,
    {
        getUsers
    }
)(UsersContainer);