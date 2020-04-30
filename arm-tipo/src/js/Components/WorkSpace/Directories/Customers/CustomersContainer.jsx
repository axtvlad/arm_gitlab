import {connect} from "react-redux";
import Customers from "./Customers";
import {setCustomersCreator} from "../../../../../redux/Reducers/CustomerReducer";

let mapStateToProps = (state) => {
    return {
        customers: state.customersDir.customers,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setCustomers: (customers) => {
            dispatch(setCustomersCreator(customers));
        }
    }
};

const CustomersContainer = connect(mapStateToProps, mapDispatchToProps)(Customers);

export default CustomersContainer;