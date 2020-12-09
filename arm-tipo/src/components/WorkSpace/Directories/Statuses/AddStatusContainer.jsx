import {connect} from "react-redux";
import AddStatus from "./AddStatus";
import {postStatus} from "../../../../redux/Reducers/StatusReducer";
import React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class AddStatusContainer extends React.Component {
    render() {
        const {postStatus} = this.props;

        return (
            <AddStatus postStatus={postStatus}/>
        )
    }
}


export default compose(
    isAdminRedirect,
    connect(null, {
        postStatus,
    })
)(AddStatusContainer);