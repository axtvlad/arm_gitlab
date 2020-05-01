import {connect} from "react-redux";
import {
    addCustomerCreator,
    updateCustomerNameKzCreator,
    updateCustomerNameRuCreator
} from "../../../../redux/Reducers/CustomerReducer";
import AddCustomer from "./AddCustomer";

let MapStateToProps = (state) => {
    return {
        customersDir: state.customersDir
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        addCustomer: () => {
            dispatch(addCustomerCreator());
        },
        updateCustomerNameRu: (name_ru) => {
            dispatch(updateCustomerNameRuCreator(name_ru));
        },
        updateCustomerNameKz: (name_kz) => {
            dispatch(updateCustomerNameKzCreator(name_kz));
        },
    }
};

const AddCustomerContainer = connect(MapStateToProps, MapDispatchToProps)(AddCustomer);

export default AddCustomerContainer;