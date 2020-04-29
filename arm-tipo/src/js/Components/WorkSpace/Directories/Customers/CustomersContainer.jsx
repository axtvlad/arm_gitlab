import {connect} from "react-redux";
import Customers from "./Customers";

let mapStateToProps = (state) => {
    return {
        customers: state.customersDir.customers
    }
};

const CustomersContainer = connect(mapStateToProps, null)(Customers);

export default CustomersContainer;