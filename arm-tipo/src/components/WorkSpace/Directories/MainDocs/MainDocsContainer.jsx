import {connect} from "react-redux";
import React from "react";
import MainDocs from "./MainDocs";
import {deleteMainDocById, getMainDocs} from "../../../../redux/Reducers/MainDocReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";

class MainDocsContainer extends React.Component {
    componentDidMount() {
        !this.props.mainDocs.length && this.props.getMainDocs();
    }

    render() {
        return (
            <MainDocs
                type={DirectoriesTypes.MAIN_DOCS}
                mainDocs={this.props.mainDocs}
                isFetching={this.props.isFetching}
                isAdmin={this.props.isAdmin}
                deleteMainDocById={this.props.deleteMainDocById}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        mainDocs: state.mainDocsDir.mainDocs,
        isFetching: state.mainDocsDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getMainDocs,
        deleteMainDocById
    }
)(MainDocsContainer);