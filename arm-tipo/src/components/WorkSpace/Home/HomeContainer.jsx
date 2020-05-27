import React from 'react'
import Home from "./Home";
import {connect} from "react-redux";
import {getUsers} from "../../../redux/Reducers/UserReducer";

class HomeContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers()
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
        getUsers
    }
)(HomeContainer);