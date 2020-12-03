import React from "react";
import {connect} from "react-redux";
import {deleteOtherDocById, getOtherDocs} from "../../../../redux/Reducers/OtherDocReducer";
import OtherDocs from "./OtherDocs";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";

class OtherDocsContainer extends React.Component {
    componentDidMount() {
        const {otherDocs, getOtherDocs} = this.props;

        !otherDocs.length && getOtherDocs();
    }

    render() {
        const {otherDocs, isAdmin, isFetching, deleteOtherDocById} = this.props;

        return (
            <OtherDocs
                type={DirectoriesTypes.OTHER_DOCS}
                otherDocs={otherDocs}
                isAdmin={isAdmin}
                isFetching={isFetching}
                deleteOtherDocById={deleteOtherDocById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        otherDocs: state.otherDocsDir.otherDocs,
        isFetching: state.otherDocsDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getOtherDocs,
        deleteOtherDocById
    }
)(OtherDocsContainer);