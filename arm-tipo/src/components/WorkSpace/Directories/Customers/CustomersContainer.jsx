import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {deleteCustomerById, getCustomers} from "../../../../redux/Reducers/CustomerReducer";
import {notification, Spin} from "antd";

class CustomersContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, customers, getCustomers} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            !customers.length && getCustomers();
        }
    }

    error() {
        notification['error']({
            message: 'У вас нет прав!',
            description: 'У вас нет прав, чтобы просматривать данный модуль!',
            placement: 'bottomRight'
        })
    }

    render() {
        const {isAdmin, customers, isFetching, deleteCustomerById} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
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
}

const mapStateToProps = (state) => {
    return {
        customers: state.customersDir.customers,
        isFetching: state.customersDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin,
    }
};

export default connect(mapStateToProps,
    {
        getCustomers,
        deleteCustomerById
    }
)(CustomersContainer);
