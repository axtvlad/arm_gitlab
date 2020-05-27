import {connect} from "react-redux";
import React from "react";
import Faqs from "./Faqs";
import {getFaqs} from "../../../../redux/Reducers/FaqReducer";

class FaqsContainer extends React.Component {
    componentDidMount() {
        this.props.getFaqs();
    }

    render() {
        return (
            <Faqs
                faqs={this.props.faqs}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        faqs: state.faqsDir.faqs,
        isFetching: state.faqsDir.isFetching
    }
};

export default connect(mapStateToProps,
    {
        getFaqs
    }
)(FaqsContainer);
