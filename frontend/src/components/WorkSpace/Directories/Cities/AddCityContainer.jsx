import {connect} from "react-redux";
import * as React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import AddDirectoryItemForm from "../../../common/Forms/AddDirectoryItemForm";
import {postDirectoryRecord} from "../../../../redux/reducers/DirectoriesReducer";

class AddCityContainer extends React.Component {
    render() {
        const {postDirectoryRecord} = this.props;

        return <AddDirectoryItemForm onSubmit={postDirectoryRecord} redirectTo={'/cities'}/>
    }
}

export default compose(
    isAdminRedirect,
    connect(null, {
        postDirectoryRecord
    })
)(AddCityContainer);