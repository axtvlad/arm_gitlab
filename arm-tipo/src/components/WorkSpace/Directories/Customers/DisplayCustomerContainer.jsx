import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setCurrentCustomer, setCustomersIsFetching} from "../../../../redux/Reducers/CustomerReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";

class DisplayCustomerContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        const user = "Admin";
        const pass = "admin";

        const authorizationBasic = window.btoa(user + ':' + pass);

        const config = {
            'headers': {
                "Authorization": "Basic " + authorizationBasic
            }
        };

        this.props.setCustomersIsFetching(true);

        axios
            .get(BASE_URL + '/customers/' + id, config)
            .then(response => {
                this.props.setCurrentCustomer(response.data.data);

                console.log('customer: ', response.data.data);

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