import {connect} from "react-redux";
import {setFaqs, setFaqsCount, setFaqsIsFetching} from "../../../../redux/Reducers/FaqReducer";
import React from "react";
import Faqs from "./Faqs";
import {restAPI} from "../../../../api/API";

class FaqsContainer extends React.Component {
    componentDidMount() {
        if (this.props.faqs.length === 0) {

            this.props.setFaqsIsFetching(true);

            restAPI.faqs.getFaqs()
                .then(response => {
                    this.props.setFaqs(response.data);
                    this.props.setFaqsCount(response.totalCount);

                    console.log('faqs: ', response.data);

                    this.props.setFaqsIsFetching(false);
                });
        }
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
        setFaqs,
        setFaqsCount,
        setFaqsIsFetching,
    }
)(FaqsContainer);
