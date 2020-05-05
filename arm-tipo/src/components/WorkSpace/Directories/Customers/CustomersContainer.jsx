import {connect} from "react-redux";
import {setCustomers, setCustomersCount, setCustomersIsFetching} from "../../../../redux/Reducers/CustomerReducer";
import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import Directory from "../../../common/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";

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
            <Directory
                isAdmin={this.props.isAdmin}
                directory={this.props.customers}
                isFetching={this.props.isFetching}
            />
        )
    }
}


let mapStateToProps = (state) => {
    return {
        customers: state.customersDir.customers,
        isFetching: state.customersDir.isFetching,
        isAdmin: state.usersDir.isAdmin,
    }
};

export default connect(mapStateToProps,
    {
        setCustomers,
        setCustomersCount,
        setCustomersIsFetching,
        setIsAdmin
    }
)(CustomersContainer);
