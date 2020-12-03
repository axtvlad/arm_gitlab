import {connect} from "react-redux";
import React from "react";
import Faqs from "./Faqs";
import {deleteFaqById, getFaqs} from "../../../../redux/Reducers/FaqReducer";

class FaqsContainer extends React.Component {
    componentDidMount() {
        const {faqs, getFaqs} = this.props;

        !faqs.length && getFaqs();
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
