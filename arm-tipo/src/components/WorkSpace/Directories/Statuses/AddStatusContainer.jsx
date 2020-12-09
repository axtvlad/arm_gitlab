import {connect} from "react-redux";
import {postStatus} from "../../../../redux/Reducers/StatusReducer";
import React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import AddDirectoryItemForm from "../../../common/Forms/AddDirectoryItemForm";

class AddStatusContainer extends React.Component {
    render() {
        const {postStatus} = this.props;

        return <AddDirectoryItemForm onSubmit={postStatus} redirectTo={'/statuses'}/>
    }
}


export default compose(
    isAdminRedirect,
    connect(null, {
        postStatus,
    })
)(AddStatusContainer);