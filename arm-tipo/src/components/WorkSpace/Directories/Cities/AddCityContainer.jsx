import {connect} from "react-redux";
import {postCity} from "../../../../redux/Reducers/CityReducer";
import * as React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import AddDirectoryItemForm from "../../../common/Forms/AddDirectoryItemForm";

class AddCityContainer extends React.Component {
    render() {
        const {postCity} = this.props;

        return <AddDirectoryItemForm onSubmit={postCity} redirectTo={'/cities'}/>
    }
}

export default compose(
    isAdminRedirect,
    connect(null, {
        postCity
    })
)(AddCityContainer);