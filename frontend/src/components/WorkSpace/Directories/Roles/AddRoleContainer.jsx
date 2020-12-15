import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import AddDirectoryItemForm from "../../../common/Forms/AddDirectoryItemForm";
import {postDirectoryRecord} from "../../../../redux/reducers/DirectoriesReducer";

class AddRoleContainer extends React.Component {
    render() {
        const {postDirectoryRecord} = this.props;

        return <AddDirectoryItemForm onSubmit={postDirectoryRecord} redirectTo={'/roles'}/>
    }
}

export default compose(
    connect(null, {
        postDirectoryRecord
    })
)(AddRoleContainer);