import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import AddDirectoryItemForm from "../../../common/Forms/AddDirectoryItemForm";
import {postDirectoryRecord} from "../../../../redux/reducers/DirectoriesReducer";

class AddTypeContainer extends React.Component {
    render() {
        const {postDirectoryRecord} = this.props;

        return <AddDirectoryItemForm onSubmit={postDirectoryRecord} redirectTo={'/types'}/>
    }
}

export default compose(
    isAdminRedirect,
    connect(null, {
        postDirectoryRecord,
    })
)(AddTypeContainer);
