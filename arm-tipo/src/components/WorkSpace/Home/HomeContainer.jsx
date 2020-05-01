import React from 'react'
import Home from "./Home";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUsersCountCreator} from "../../../redux/Reducers/UserReducer";

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

            axios
                .get('http://185.22.66.183:8080/rest/api/users', config)
                .then(response => {
                    this.props.setUsersCount(response.data.totalCount);
                    console.log('users: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <Home usersCount={this.props.usersCount}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        usersCount: state.usersDir.usersCount
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setUsersCount: (usersCount) => {
            dispatch(setUsersCountCreator(usersCount))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);