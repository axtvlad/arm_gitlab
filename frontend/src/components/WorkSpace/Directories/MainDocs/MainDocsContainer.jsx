import {connect} from "react-redux";
import React from "react";
import MainDocs from "./MainDocs";
import {deleteMainDocById, getMainDocs} from "../../../../redux/reducers/MainDocReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";

class MainDocsContainer extends React.Component {
    componentDidMount() {
        const {getMainDocs} = this.props;

        getMainDocs();
    }

    render() {
        const {mainDocs, isFetching, isAdmin, deleteMainDocById} = this.props;

        return (
            <MainDocs
                type={DirectoriesTypes.MAIN_DOCS}
                mainDocs={mainDocs}
                isFetching={isFetching}
                isAdmin={isAdmin}
                deleteMainDocById={deleteMainDocById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mainDocs: state.mainDocsDir.mainDocs,
        isFetching: state.mainDocsDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps, {
    getMainDocs,
    deleteMainDocById
})(MainDocsContainer);