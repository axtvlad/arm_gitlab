import {connect} from "react-redux";
import React from "react";
import Faqs from "./Faqs";
import {deleteFaqById, getFaqs} from "../../../../redux/Reducers/FaqReducer";

class FaqsContainer extends React.Component {
    componentDidMount() {
        !this.props.faqs.length && this.props.getFaqs();
    }

    render() {
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

let mapStateToProps = (state) => {
    return {
        faqs: state.faqsDir.faqs,
        isFetching: state.faqsDir.isFetching,
        isAdmin: state.usersDir.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getFaqs,
        deleteFaqById
    }
)(FaqsContainer);
