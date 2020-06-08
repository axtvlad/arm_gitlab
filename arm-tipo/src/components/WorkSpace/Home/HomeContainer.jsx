import React from 'react'
import Home from "./Home";
import {connect} from "react-redux";
import {getUsers} from "../../../redux/Reducers/UserReducer";
import {getMainDocs} from "../../../redux/Reducers/MainDocReducer";
import {Spin} from "antd";
import {getOtherDocs} from "../../../redux/Reducers/OtherDocReducer";

class HomeContainer extends React.Component {
    componentDidMount() {
        !this.props.usersCount && this.props.getUsers();
        !this.props.mainDocsDir.mainDocsCount && this.props.getMainDocs();
        !this.props.otherDocsDir.otherDocsCount && this.props.getOtherDocs();
    }

    render() {
        if (
            !this.props.mainDocsDir.mainDocs.length &&
            !this.props.otherDocsDir.otherDocs.length
        ) {
            return <Spin/>
        } else {
            let totalCount = this.props.mainDocsDir.mainDocsCount + this.props.otherDocsDir.otherDocsCount;
            let mainDocs = this.props.mainDocsDir.mainDocs;
            let lastMainDoc = mainDocs[mainDocs.length - 1];

            if (!lastMainDoc) {
                return <Spin/>
            } else {
                return (
                    <Home
                        usersCount={this.props.usersCount}
                        lastAddedMainDoc={lastMainDoc}
                        totalCount={totalCount}
                        isFetching={this.props.isFetching}
                    />
                )
            }
        }
    }
}

let mapStateToProps = (state) => {
    return {
        usersCount: state.usersDir.usersCount,
        isFetching: state.usersDir.isFetching,
        mainDocsDir: state.mainDocsDir,
        otherDocsDir: state.otherDocsDir,
    }
};

export default connect(mapStateToProps,
    {
        getUsers,
        getMainDocs,
        getOtherDocs
    }
)(HomeContainer);