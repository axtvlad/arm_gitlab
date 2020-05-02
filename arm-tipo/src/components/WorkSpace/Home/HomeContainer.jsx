import React from 'react'
import Home from "./Home";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUsersCount, setUsersIsFetching} from "../../../redux/Reducers/UserReducer";
import {BASE_URL} from "../../../env";

class HomeContainer extends React.Component {
    componentDidMount() {
        if (this.props.usersCount === 0) {
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
                .get(BASE_URL + '/users', config)
                .then(response => {
                    this.props.setUsersCount(response.data.totalCount);

                    console.log('users: ', response.data.data);

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