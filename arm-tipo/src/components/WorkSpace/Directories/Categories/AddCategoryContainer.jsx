import {connect} from "react-redux";
import {postCategory} from "../../../../redux/Reducers/CategoryReducer";
import * as React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import AddDirectoryItemForm from "../../../common/Forms/AddDirectoryItemForm";

class AddCategoryContainer extends React.Component {
    render() {
        const {postCategory} = this.props;

        return <AddDirectoryItemForm onSubmit={postCategory} redirectTo={'/categories'}/>
    }
}

export default compose(
    isAdminRedirect,
    connect(null, {
        postCategory,
    })
)(AddCategoryContainer)
