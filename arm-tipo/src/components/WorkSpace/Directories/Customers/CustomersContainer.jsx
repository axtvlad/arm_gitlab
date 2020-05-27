import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {getCustomers} from "../../../../redux/Reducers/CustomerReducer";

class CustomersContainer extends React.Component {
    componentDidMount() {
        this.props.getCustomers();
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
        getCustomers
    }
)(CustomersContainer);
