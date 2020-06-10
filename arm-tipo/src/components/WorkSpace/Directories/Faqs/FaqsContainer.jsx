import {connect} from "react-redux";
import React from "react";
import Faqs from "./Faqs";
import {deleteFaqById, getFaqs} from "../../../../redux/Reducers/FaqReducer";
import {notification, Spin} from "antd";

class FaqsContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.faqs.length && this.props.getFaqs();
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
                <Faqs
                    faqs={this.props.faqs}
                    isFetching={this.props.isFetching}
                    isAdmin={this.props.isAdmin}
                    removeFaqById={this.props.deleteFaqById}
                />
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        faqs: state.faqsDir.faqs,
        isFetching: state.faqsDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getFaqs,
        deleteFaqById
    }
)(FaqsContainer);
