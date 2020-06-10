import {connect} from "react-redux";
import React from "react";
import MainDocs from "./MainDocs";
import {deleteMainDocById, getMainDocs} from "../../../../redux/Reducers/MainDocReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {Redirect} from "react-router-dom";

class MainDocsContainer extends React.Component {
    componentDidMount() {
        !this.props.mainDocs.length && this.props.getMainDocs();
    }

    render() {
        if (!this.props.isAdmin) {
            return <Redirect to={'/auth'}/>
        } else {
            return (
                <MainDocs
                    type={DirectoriesTypes.MAIN_DOCS}
                    mainDocs={this.props.mainDocs}
                    isFetching={this.props.isFetching}
                    deleteMainDocById={this.props.deleteMainDocById}
                />
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        mainDocs: state.mainDocsDir.mainDocs,
        isFetching: state.mainDocsDir.isFetching,
        isAuth: state.authDir.isAuth
    }
};

export default connect(mapStateToProps,
    {
        getMainDocs,
        deleteMainDocById
    }
)(MainDocsContainer);