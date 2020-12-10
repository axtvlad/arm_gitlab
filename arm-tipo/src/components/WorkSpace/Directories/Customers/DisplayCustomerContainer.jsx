import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getCustomerById} from "../../../../redux/Reducers/CustomerReducer";
import DisplayDirectory from "../../../common/commonComponents/DisplayDirectory";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class DisplayCustomerContainer extends React.Component {
    componentDidMount() {
        const {match, getCustomerById} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getCustomerById(id)
    }

    render() {
        return (
            <DisplayDirectory {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.CUSTOMERS),
        currentItem: state.customersDir.currentCustomer,
        isFetching: state.customersDir.isFetching,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getCustomerById
    }),
    withRouter
)(DisplayCustomerContainer);