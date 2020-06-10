import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {deleteCustomerById, getCustomers} from "../../../../redux/Reducers/CustomerReducer";
import {notification, Spin} from "antd";

class CustomersContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.customers.length && this.props.getCustomers();
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
        if (!this.props.isAdmin) {
            return <Spin/>
        } else {
            return (
                <Directory
                    type={DirectoriesTypes.CUSTOMERS}
                    isAdmin={this.props.isAdmin}
                    directory={this.props.customers}
                    isFetching={this.props.isFetching}
                    removeItemById={this.props.deleteCustomerById}
                />
            )
        }
    }
}

let mapStateToProps = (state) => {
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
