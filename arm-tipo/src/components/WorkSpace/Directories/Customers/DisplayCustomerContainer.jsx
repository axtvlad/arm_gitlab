import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getCustomerById} from "../../../../redux/Reducers/CustomerReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {notification, Spin} from "antd";

class DisplayCustomerContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            let id = this.props.match.params.id;

            if (!id) {
                id = 1
            }

            this.props.getCustomerById(id)
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
                <DisplayDirectoryItem {...this.props}/>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.CUSTOMERS),
        currentItem: state.customersDir.currentCustomer,
        isFetching: state.customersDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

let CustomerContainerUrl = withRouter(DisplayCustomerContainer);

export default connect(mapStateToProps,
    {
        getCustomerById
    }
)(CustomerContainerUrl)