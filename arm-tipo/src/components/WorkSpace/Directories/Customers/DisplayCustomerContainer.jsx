import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getCustomerById} from "../../../../redux/Reducers/CustomerReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";
import {compose} from "redux";

class DisplayCustomerContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, match, getCustomerById} = this.props;
        if (!isAdmin) {
            this.error()
        } else {
            let id = match.params.id;

            if (!id) {
                id = 1
            }

            getCustomerById(id)
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
        const {isAdmin} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            return (
                <DisplayDirectoryItem {...this.props}/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.CUSTOMERS),
        currentItem: state.customersDir.currentCustomer,
        isFetching: state.customersDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default compose(
    connect(mapStateToProps, {
        getCustomerById
    }),
    withRouter
)(DisplayCustomerContainer);