import {postType} from "../../../../redux/Reducers/TypeReducer";
import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import AddDirectoryItemForm from "../../../common/Forms/AddDirectoryItemForm";

class AddTypeContainer extends React.Component {
    render() {
        const {postType} = this.props;

        return <AddDirectoryItemForm onSubmit={postType} redirectTo={'/types'}/>
    }
}

export default compose(
    isAdminRedirect,
    connect(null, {
        postType,
    })
)(AddTypeContainer);
