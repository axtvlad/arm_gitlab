import React from 'react'
import Home from "./Home";
import {connect} from "react-redux";
import {getUsers} from "../../../redux/Reducers/UserReducer";
import {getMainDocs} from "../../../redux/Reducers/MainDocReducer";
import {Spin} from "antd";
import {getOtherDocs} from "../../../redux/Reducers/OtherDocReducer";
import {DirectoriesTypes} from "../../common/utils/DirectoriesTypes";
import {isAuthRedirect} from "../../../hoc/isAuthRedirect";
import {compose} from "redux";

class HomeContainer extends React.Component {
    componentDidMount() {
        const {usersCount, mainDocsDir, otherDocsDir, getMainDocs, getUsers, getOtherDocs} = this.props;

        !usersCount && getUsers();
        !mainDocsDir.mainDocsCount && getMainDocs();
        !otherDocsDir.otherDocsCount && getOtherDocs();
    }

    render() {
        const {usersCount, mainDocsDir, otherDocsDir, isFetching} = this.props;

        if (
            !mainDocsDir.mainDocs?.length &&
            !otherDocsDir.otherDocs?.length
        ) {
            return <Spin/>
        } else {
            const totalCount = mainDocsDir.mainDocsCount + otherDocsDir.otherDocsCount;
            const mainDocs = mainDocsDir.mainDocs;
            const lastMainDoc = mainDocs[mainDocs.length - 1];

            if (!lastMainDoc) {
                return <Spin/>
            } else {
                return (
                    <Home
                        type={DirectoriesTypes.MAIN_DOCS}
                        usersCount={usersCount}
                        lastAddedMainDoc={lastMainDoc}
                        totalCount={totalCount}
                        isFetching={isFetching}
                    />
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        usersCount: state.usersDir.usersCount,
        isFetching: state.usersDir.isFetching,
        mainDocsDir: state.mainDocsDir,
        otherDocsDir: state.otherDocsDir,
    }
};

export default compose(
    connect(mapStateToProps,
        {
            getUsers,
            getMainDocs,
            getOtherDocs
        }),
    isAuthRedirect
)(HomeContainer);