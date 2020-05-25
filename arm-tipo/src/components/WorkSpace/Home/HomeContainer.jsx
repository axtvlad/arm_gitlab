import React from 'react'
import Home from "./Home";
import {connect} from "react-redux";
import {setUsersCount, setUsersIsFetching} from "../../../redux/Reducers/UserReducer";
import {systemAPI} from "../../../api/API";

class HomeContainer extends React.Component {
    componentDidMount() {
        if (this.props.usersCount === 0) {

            this.props.setUsersIsFetching(true);

            systemAPI.users.getUsers()
                .then(response => {
                    this.props.setUsersCount(response.totalCount);

                    console.log('usersCount: ', response.totalCount);

                    this.props.setUsersIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Home
                usersCount={this.props.usersCount}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        usersCount: state.usersDir.usersCount,
        isFetching: state.usersDir.isFetching
    }
};

export default connect(mapStateToProps,
    {
        setUsersCount,
        setUsersIsFetching
    }
)(HomeContainer);