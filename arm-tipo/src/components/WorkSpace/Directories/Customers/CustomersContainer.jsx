import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {deleteCustomerById, getCustomers} from "../../../../redux/Reducers/CustomerReducer";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class CustomersContainer extends React.Component {
    componentDidMount() {
        const {getCustomers} = this.props;

        getCustomers();
    }

    render() {
        const {isAdmin, customers, isFetching, deleteCustomerById} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.CUSTOMERS}
                isAdmin={isAdmin}
                directory={customers}
                isFetching={isFetching}
                removeItemById={deleteCustomerById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customersDir.customers,
        isFetching: state.customersDir.isFetching,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps,
        {
            getCustomers,
            deleteCustomerById
        })
)(CustomersContainer);
