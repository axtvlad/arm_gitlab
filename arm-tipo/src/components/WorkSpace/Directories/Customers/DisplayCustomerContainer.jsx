import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setCurrentCustomer, setCustomersIsFetching} from "../../../../redux/Reducers/CustomerReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {systemAPI} from "../../../../api/API";

class DisplayCustomerContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.setCustomersIsFetching(true);

        systemAPI.customers.getCustomerById(id)
            .then(response => {
                this.props.setCurrentCustomer(response.data);

                console.log('customer: ', response.data);

                this.props.setCustomersIsFetching(false);
            });
    }

    render() {
        return (
            <DisplayDirectoryItem {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.CUSTOMERS),
        currentItem: state.customersDir.currentCustomer,
        isFetching: state.customersDir.isFetching
    }
};

let CustomerContainerUrl = withRouter(DisplayCustomerContainer)

export default connect(mapStateToProps, {
    setCurrentCustomer,
    setCustomersIsFetching
})
(CustomerContainerUrl)