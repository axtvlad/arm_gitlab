import React from "react";
import DisplayOtherDoc from "./DisplayOtherDoc";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getOtherDocById} from "../../../../redux/Reducers/OtherDocReducer";
import {compose} from "redux";

class DisplayOtherDocContainer extends React.Component {
    componentDidMount() {
        const {match, getOtherDocById} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getOtherDocById(id);
    }

    render() {
        return (
            <DisplayOtherDoc {...this.props}/>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        directory: GetDirectory(DirectoriesTypes.OTHER_DOCS),
        currentOtherDoc: state.otherDocsDir.currentOtherDoc,
    }
};

export default compose(
    connect(mapStateToProps, {
        getOtherDocById
    }),
    withRouter
)(DisplayOtherDocContainer);