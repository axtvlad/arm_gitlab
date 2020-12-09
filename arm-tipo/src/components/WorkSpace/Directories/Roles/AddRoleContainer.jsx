import {connect} from "react-redux";
import {postRole} from "../../../../redux/Reducers/RoleReducer";
import React from "react";
import {compose} from "redux";
import AddDirectoryItemForm from "../../../common/Forms/AddDirectoryItemForm";

class AddRoleContainer extends React.Component {
    render() {
        const {postRole} = this.props;

        return <AddDirectoryItemForm onSubmit={postRole} redirectTo={'/roles'}/>
    }
}

export default compose(
    connect(null, {
        postRole
    })
)(AddRoleContainer);