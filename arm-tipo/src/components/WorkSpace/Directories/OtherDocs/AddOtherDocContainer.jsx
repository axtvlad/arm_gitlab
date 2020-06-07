import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import AddOtherDoc from "./AddOtherDoc";
import {
    postOtherDoc,
    updateOtherDocFileKz,
    updateOtherDocFileRu,
    updateOtherDocNameKz,
    updateOtherDocNameRu
} from "../../../../redux/Reducers/OtherDocReducer";

class AddOtherDocContainer extends React.Component {
    componentDidMount() {
    }

    render() {
        if (this.props.otherDocsDir.isPosted) {
            return <Redirect to={'/otherDocs'}/>
        }

        return (
            <AddOtherDoc {...this.props} />
        )
    }
}
let mapStateToProps = (state) => {
    return {
        otherDocsDir: state.otherDocsDir
    }
};

export default connect(mapStateToProps,
    {
        postOtherDoc,
        updateOtherDocNameRu,
        updateOtherDocNameKz,
        updateOtherDocFileRu,
        updateOtherDocFileKz,
    }
)(AddOtherDocContainer)