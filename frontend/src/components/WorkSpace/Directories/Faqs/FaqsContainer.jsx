import {connect} from "react-redux";
import React from "react";
import Faqs from "./Faqs";
import {deleteFaqById, getFaqs} from "../../../../redux/reducers/FaqReducer";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class FaqsContainer extends React.Component {
    componentDidMount() {
        const {getFaqs} = this.props;

        getFaqs();
    }

    render() {
        const {faqs, deleteFaqById, isFetching, isAdmin} = this.props;

        return (
            <Faqs
                faqs={faqs}
                isFetching={isFetching}
                isAdmin={isAdmin}
                removeFaqById={deleteFaqById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        faqs: state.faqsDir.faqs,
        isFetching: state.faqsDir.isFetching
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps,
        {
            getFaqs,
            deleteFaqById
        })
)(FaqsContainer);
