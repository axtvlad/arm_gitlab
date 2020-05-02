import {connect} from "react-redux";
import {addCustomer, updateCustomerNameKz, updateCustomerNameRu} from "../../../../redux/Reducers/CustomerReducer";
import AddCustomer from "./AddCustomer";

let MapStateToProps = (state) => {
    return {
        customersDir: state.customersDir
    }
};

const AddCustomerContainer = connect(MapStateToProps,
    {
        addCustomer,
        updateCustomerNameRu,
        updateCustomerNameKz,
    }
)(AddCustomer);

export default AddCustomerContainer;