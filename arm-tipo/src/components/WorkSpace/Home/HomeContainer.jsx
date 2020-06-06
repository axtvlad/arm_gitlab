import React from 'react'
import Home from "./Home";
import {connect} from "react-redux";
import {getUsers} from "../../../redux/Reducers/UserReducer";
import {getMainDocs} from "../../../redux/Reducers/MainDocReducer";
import {Spin} from "antd";

class HomeContainer extends React.Component {
    componentDidMount() {
        !this.props.usersCount && this.props.getUsers();
        !this.props.mainDocsDir.mainDocsCount && this.props.getMainDocs();
    }

    render() {
        if (!this.props.mainDocsDir.mainDocs.length) {
            return <Spin/>
        } else {
            return (
                <Home
                    usersCount={this.props.usersCount}
                    lastAddedMainDoc={this.props.mainDocsDir.mainDocs[this.props.mainDocsDir.mainDocs.length - 1]}
                    mainDocsCount={this.props.mainDocsDir.mainDocsCount}
                    isFetching={this.props.isFetching}
                />
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        usersCount: state.usersDir.usersCount,
        isFetching: state.usersDir.isFetching,
        mainDocsDir: state.mainDocsDir
    }
};

export default connect(mapStateToProps,
    {
        getUsers,
        getMainDocs
    }
)(HomeContainer);