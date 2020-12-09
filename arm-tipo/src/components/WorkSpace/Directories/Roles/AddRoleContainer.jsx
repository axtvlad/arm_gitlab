import {connect} from "react-redux";
import {postRole} from "../../../../redux/Reducers/RoleReducer";
import AddRole from "./AddRole";
import React from "react";
import {compose} from "redux";

class AddRoleContainer extends React.Component {
    render() {
        const {postRole} = this.props;

        return (
            <AddRole postRole={postRole}/>
        )
    }
}

export default compose(
    connect(null, {
        postRole
    })
)(AddRoleContainer);