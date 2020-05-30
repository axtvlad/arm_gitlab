import {connect} from "react-redux";
import {postCustomer, updateCustomerNameKz, updateCustomerNameRu} from "../../../../redux/Reducers/CustomerReducer";
import * as React from "react";
import AddCustomer from "./AddCustomer";
import {Redirect} from "react-router-dom";

class AddCustomerContainer extends React.Component {
    render() {
        if (this.props.customersDir.isPosted) {
            return <Redirect to={'/customers'}/>
        }

        return (
            <AddCustomer {...this.props}/>
        )
    }
}

let MapStateToProps = (state) => {
    return {
        customersDir: state.customersDir
    }
};

export default connect(MapStateToProps,
    {
        postCustomer,
        updateCustomerNameRu,
        updateCustomerNameKz,
    }
)(AddCustomerContainer);
