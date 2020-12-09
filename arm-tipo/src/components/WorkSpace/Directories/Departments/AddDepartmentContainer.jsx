import {connect} from "react-redux";
import {postDepartment} from "../../../../redux/Reducers/DepartmentReducer";
import React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import AddDirectoryItemForm from "../../../common/Forms/AddDirectoryItemForm";

class AddDepartmentContainer extends React.Component {
    render() {
        const {postDepartment} = this.props;

        return <AddDirectoryItemForm onSubmit={postDepartment} redirectTo={'/departments'}/>
    }
}

export default compose(
    isAdminRedirect,
    connect(null, {
        postDepartment,
    })
)(AddDepartmentContainer);