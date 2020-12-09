import {connect} from "react-redux";
import {postCustomer} from "../../../../redux/Reducers/CustomerReducer";
import * as React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import AddDirectoryItemForm from "../../../common/Forms/AddDirectoryItemForm";

class AddCustomerContainer extends React.Component {
    render() {
        const {postCustomer} = this.props;

        return <AddDirectoryItemForm onSubmit={postCustomer} redirectTo={'/customers'}/>
    }
}


export default compose(
    isAdminRedirect,
    connect(null,
        {
            postCustomer,
        })
)(AddCustomerContainer);
