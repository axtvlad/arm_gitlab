import {connect} from "react-redux";
import {
    setCustomersCountCreator,
    setCustomersCreator,
    setCustomersIsFetchingCreator
} from "../../../../redux/Reducers/CustomerReducer";
import React from "react";
import * as axios from "axios";
import Customers from "./Customers";
import {BASE_URL} from "../../../../env";

class CustomersContainer extends React.Component {
    componentDidMount() {
        if (this.props.customers.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setCustomersIsFetching(true);

            axios
                .get(BASE_URL + '/customers', config)
                .then(response => {
                    this.props.setCustomers(response.data.data);
                    this.props.setCustomersCount(response.data.totalCount);

                    console.log('customers: ', response.data.data);

                    this.props.setCustomersIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Customers
                customers={this.props.customers}
                isFetching={this.props.isFetching}
            />
        )
    }
}


let mapStateToProps = (state) => {
    return {
        customers: state.customersDir.customers,
        isFetching: state.customersDir.isFetching
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setCustomers: (customers) => {
            dispatch(setCustomersCreator(customers));
        },
        setCustomersCount: (customersCount) => {
            dispatch(setCustomersCountCreator(customersCount))
        },
        setCustomersIsFetching: (isFetching) => {
            dispatch(setCustomersIsFetchingCreator(isFetching))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersContainer);
