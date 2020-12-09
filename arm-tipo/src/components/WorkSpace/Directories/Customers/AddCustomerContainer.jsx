import {connect} from "react-redux";
import {postCustomer} from "../../../../redux/Reducers/CustomerReducer";
import * as React from "react";
import AddCustomer from "./AddCustomer";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class AddCustomerContainer extends React.Component {
    render() {
        const {postCustomer} = this.props;

        return (
            <AddCustomer postCustomer={postCustomer}/>
        )
    }
}


export default compose(
    isAdminRedirect,
    connect(null,
        {
            postCustomer,
        })
)(AddCustomerContainer);
