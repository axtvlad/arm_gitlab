import {connect} from "react-redux";
import React from "react";
import Users from "./Users";
import {deleteUserById, getUsers} from "../../../../redux/reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {compose} from "redux";
import {selectIsAdmin} from "../../../../redux/selectors/AuthSelector";

class UsersContainer extends React.Component {
    componentDidMount() {
        const {getUsers} = this.props;

        getUsers();
    }


    render() {
        const {users, isFetching, deleteUserById} = this.props;

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

const mapStateToProps = (state) => {
    return {
        users: state.usersDir.users,
        isFetching: state.usersDir.isFetching,
        isAdmin: selectIsAdmin(state)
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps,
        {
            getUsers,
            deleteUserById
        })
)(UsersContainer);