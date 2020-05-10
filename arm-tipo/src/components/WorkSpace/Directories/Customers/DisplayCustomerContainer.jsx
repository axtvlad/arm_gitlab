import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setCurrentCustomer, setCustomersIsFetching} from "../../../../redux/Reducers/CustomerReducer";
import DisplayCustomer from "./DisplayCustomer";

class DisplayCustomerContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        const user = "Admin"
        const pass = "admin"

        const authorizationBasic = window.btoa(user + ':' + pass)

        const config = {
            'headers': {
                "Authorization": "Basic " + authorizationBasic
            }
        }

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
            <DisplayCustomer {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentCustomer: state.customersDir.currentCustomer,
        isFetching: state.customersDir.isFetching
    }
};

let CustomerContainerUrl = withRouter(DisplayCustomerContainer)

export default connect(mapStateToProps, {
    setCurrentCustomer,
    setCustomersIsFetching
})
(CustomerContainerUrl)