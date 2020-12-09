import React from "react";
import {connect} from "react-redux";
import AddOtherDoc from "./AddOtherDoc";
import {postOtherDoc} from "../../../../redux/Reducers/OtherDocReducer";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class AddOtherDocContainer extends React.Component {
    render() {
        const {postOtherDoc} = this.props;

        return (
            <AddOtherDoc postOtherDoc={postOtherDoc}/>
        )
    }
}


export default compose(
    isAdminRedirect,
    connect(null, {
        postOtherDoc
    })
)(AddOtherDocContainer)