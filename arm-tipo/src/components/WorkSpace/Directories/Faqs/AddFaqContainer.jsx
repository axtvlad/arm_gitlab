import {connect} from "react-redux";
import {
    postFaq,
    updateFaqAnswerKz,
    updateFaqAnswerRu,
    updateFaqQuestionKz,
    updateFaqQuestionRu
} from "../../../../redux/Reducers/FaqReducer";
import AddFaq from "./AddFaq";
import {Redirect} from "react-router-dom";
import React from "react";

class AddFaqContainer extends React.Component {
    render() {
        if (this.props.faqsDir.isPosted) {
            return <Redirect to={'/faqs'}/>
        }

        return (
            <AddFaq {...this.props}/>
        )
    }
}

let MapStateToProps = (state) => {
    return {
        faqsDir: state.faqsDir
    }
};

export default connect(MapStateToProps,
    {
        postFaq,
        updateFaqQuestionRu,
        updateFaqQuestionKz,
        updateFaqAnswerRu,
        updateFaqAnswerKz,
    }
)(AddFaqContainer);