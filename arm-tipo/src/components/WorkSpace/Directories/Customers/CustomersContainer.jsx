import {connect} from "react-redux";
import {setCustomers, setCustomersCount, setCustomersIsFetching} from "../../../../redux/Reducers/CustomerReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {systemAPI} from "../../../../api/API";

class CustomersContainer extends React.Component {
    componentDidMount() {
        if (this.props.customers.length === 0) {

            this.props.setCustomersIsFetching(true);

            systemAPI.customers.getCustomers()
                .then(response => {
                    this.props.setCustomers(response.data);
                    this.props.setCustomersCount(response.totalCount);

                    console.log('customers: ', response.data);

                    this.props.setCustomersIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Directory
                type={DirectoriesTypes.CUSTOMERS}
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
