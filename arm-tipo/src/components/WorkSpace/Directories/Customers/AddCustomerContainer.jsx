import {connect} from "react-redux";
import {postCustomer, updateCustomerNameKz, updateCustomerNameRu} from "../../../../redux/Reducers/CustomerReducer";
import * as React from "react";
import AddCustomer from "./AddCustomer";
import {Redirect} from "react-router-dom";
import {notification, Spin} from "antd";

class AddCustomerContainer extends React.Component {
    componentDidMount() {
        const {isAdmin} = this.props;

        if (!isAdmin) {
            this.error()
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
        const {isAdmin, customersDir} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            if (customersDir.isPosted) {
                return <Redirect to={'/customers'}/>
            } else {
                return (
                    <AddCustomer {...this.props}/>
                )
            }
        }
    }
}

const MapStateToProps = (state) => {
    return {
        customersDir: state.customersDir,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(MapStateToProps,
    {
        postCustomer,
        updateCustomerNameRu,
        updateCustomerNameKz,
    }
)(AddCustomerContainer);
