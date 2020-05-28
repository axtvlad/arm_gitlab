import React from 'react'
import Home from "./Home";
import {connect} from "react-redux";
import {getUsers} from "../../../redux/Reducers/UserReducer";

class HomeContainer extends React.Component {
    componentDidMount() {
        !this.props.usersCount && this.props.getUsers()
    }

    render() {
        return (
            <Home
                usersCount={this.props.usersCount}
                mainDocsCount={this.props.mainDocsCount}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        usersCount: state.usersDir.usersCount,
        isFetching: state.usersDir.isFetching,
        mainDocsCount: state.mainDocsDir.mainDocsCount
    }
};

export default connect(mapStateToProps,
    {
        getUsers
    }
)(HomeContainer);