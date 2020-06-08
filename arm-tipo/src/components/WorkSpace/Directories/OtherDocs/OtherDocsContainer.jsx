import React from "react";
import {connect} from "react-redux";
import {deleteOtherDocById, getOtherDocs} from "../../../../redux/Reducers/OtherDocReducer";
import OtherDocs from "./OtherDocs";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";

class OtherDocsContainer extends React.Component {
    componentDidMount() {
        !this.props.otherDocs.length &&  this.props.getOtherDocs();
    }
    render() {
        return (
            <OtherDocs
                type={DirectoriesTypes.OTHER_DOCS}
                otherDocs={this.props.otherDocs}
                isFetching={this.props.isFetching}
                deleteOtherDocById={this.props.deleteOtherDocById}
            />
        )
    }
}
let mapStateToProps = (state) => {
    return {
        otherDocs: state.otherDocsDir.otherDocs,
        isFetching: state.otherDocsDir.isFetching
    }
};

export default connect(mapStateToProps,
    {
        getOtherDocs,
        deleteOtherDocById
    }
)(OtherDocsContainer);