import {connect} from "react-redux";
import AddDepartment from "./AddDepartment";
import {postDepartment} from "../../../../redux/Reducers/DepartmentReducer";
import React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class AddDepartmentContainer extends React.Component {
    render() {
        const {postDepartment} = this.props;

        return (
            <AddDepartment postDepartment={postDepartment}/>
        )
    }
}

export default compose(
    isAdminRedirect,
    connect(null, {
        postDepartment,
    })
)(AddDepartmentContainer);